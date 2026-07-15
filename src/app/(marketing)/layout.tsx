import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden w-full">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20 2xl:pt-28">{children}</main>
      <Footer />
    </div>
  );
}
