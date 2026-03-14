import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HSDP",
  description: "Hrvatsko-slovensko društvo prijateljstva",
  openGraph: {
    title: "HSDP",
    description:
      "Pratite najnovije vijesti i događanja Hrvatsko-slovenskog društva prijateljstva",
    url: "https://hsdp-org.hr",
    siteName: "HSDP",
    /*images: [
      {
        url: "https://tvojadomena.hr/og-image.jpg",
        width: 1200,
        height: 630,
      }
    ], */
    locale: "hr_HR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
