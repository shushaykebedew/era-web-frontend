import { Project, SyntaxKind, TypeAliasDeclaration, InterfaceDeclaration } from "ts-morph";
import * as path from "path";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const typeFiles = {
  ui: project.createSourceFile("src/types/ui.ts", "", { overwrite: true }),
  nominees: project.createSourceFile("src/types/nominees.ts", "", { overwrite: true }),
  partners: project.createSourceFile("src/types/partners.ts", "", { overwrite: true }),
  marketing: project.createSourceFile("src/types/marketing.ts", "", { overwrite: true }),
};

// Map of Type Name -> Domain
const typeMap: Record<string, keyof typeof typeFiles> = {
  SectionHeadingProps: "ui",
  ModalProps: "ui",
  EyebrowProps: "ui",
  Sort: "ui",
  ContainerProps: "ui",
  BadgeProps: "ui",
  ButtonVariant: "ui",
  ButtonSize: "ui",
  ButtonOwnProps: "ui",
  ButtonProps: "ui",
  ServerButtonProps: "ui",
  AnimationProps: "ui",
  StaggerContainerProps: "ui",

  VoteModalProps: "nominees",
  VoteStep: "nominees",
  Filter: "nominees",
  StatusRow: "nominees",
  Tab: "nominees",
  NomineeDetailShellProps: "nominees",
  NomineeCardProps: "nominees",
  NomineesSectionProps: "nominees",
  NomineeSidebarProps: "nominees",

  TierId: "partners",
  PartnersTierCardsProps: "partners",
  TierSelectProps: "partners",
  SponsorshipFormProps: "partners",

  NewsletterCtaProps: "marketing",
  HeroProps: "marketing",
  CategoryCardProps: "marketing",
  AwardCategoriesSectionProps: "marketing",
  NomineePageProps: "marketing",
  AwardPageProps: "marketing",
  NavLink: "marketing",
};

const processedTypes = new Set<string>();

// Move Types to their destination files
for (const sourceFile of project.getSourceFiles()) {
  if (sourceFile.getFilePath().includes("src/types")) continue; // Skip existing types dir

  const types = sourceFile.getTypeAliases();
  const interfaces = sourceFile.getInterfaces();

  const handleDecl = (decl: TypeAliasDeclaration | InterfaceDeclaration) => {
    const name = decl.getName();
    if (!name) return;
    const domain = typeMap[name];
    if (!domain) return;

    if (!processedTypes.has(name)) {
      processedTypes.add(name);
      
      const targetFile = typeFiles[domain];
      const text = decl.getText();
      
      targetFile.addStatements(`export ${text.startsWith('export ') ? text.replace('export ', '') : text}`);
    }

    decl.remove();
    
    // Add import statement
    const existingImport = sourceFile.getImportDeclaration(dec => dec.getModuleSpecifierValue() === `@/types/${domain}`);
    if (existingImport) {
      if (!existingImport.getNamedImports().some(ni => ni.getName() === name)) {
        existingImport.addNamedImport(name);
      }
    } else {
      sourceFile.addImportDeclaration({
        moduleSpecifier: `@/types/${domain}`,
        namedImports: [{ name }]
      });
    }
  };

  types.forEach(handleDecl);
  interfaces.forEach(handleDecl);
}

// Add React imports where necessary
for (const [domain, file] of Object.entries(typeFiles)) {
  const text = file.getFullText();
  if (text.includes("React.") || text.includes("ReactNode") || text.includes("ElementType")) {
    file.addImportDeclaration({
      moduleSpecifier: "react",
      namedImports: ["ReactNode", "ElementType", "ComponentPropsWithoutRef"]
    });
  }
}

// Save all changes
project.saveSync();
console.log("Refactor complete.");
