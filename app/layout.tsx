import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hrvatsko-slovensko društvo prijateljstva",
  description:
    "Službena stranica Hrvatsko-slovensko društva prijateljstva. Pratite najnovije vijesti, projekte, suradnje i događanja koja povezuju Hrvatsku i Sloveniju.",
  openGraph: {
    title: "Hrvatsko-slovensko društvo prijateljstva",
    description:
      "Pratite najnovije vijesti i događanja Hrvatsko-slovenskog društva prijateljstva",
    url: "https://hsdp-org.hr",
    siteName: "Hrvatsko-slovensko društvo prijateljstva",
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
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
