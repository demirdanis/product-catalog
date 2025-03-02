import type { Metadata } from "next";
import RootLayoutWrapper from "./root-layout";

export const metadata: Metadata = {
  title: "Product Catalog",
  description: "This is a product catalog project with nextjs, react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
