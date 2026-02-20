import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/design-system/fonts";
import { getProjectCategories } from "@/lib/contentful/data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projectCategories = await getProjectCategories();

  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${fontVariables} font-body antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <CustomCursor />
        <Header projectCategories={projectCategories} />
        <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
