import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sean Johnson | Cloud Security Engineer",
  description:
    "Cloud Security Engineer with CISSP and AWS Security Specialty. Live observability into a production K3s cluster secured with Zero Trust architecture.",
  openGraph: {
    title: "Sean Johnson | Cloud Security Engineer",
    description:
      "Live observability into a production K3s cluster secured with Zero Trust architecture.",
    type: "website",
    url: "https://s34nj0hn.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
