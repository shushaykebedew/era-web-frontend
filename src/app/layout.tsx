import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/data/site";

const inter = localFont({
  src: "../fonts/Inter-VariableFont.ttf",
  variable: "--font-inter",
});

const playfair = localFont({
  src: "../fonts/PlayfairDisplay-VariableFont.ttf",
  variable: "--font-playfair",
});
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
