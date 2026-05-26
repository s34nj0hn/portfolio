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
  title: "Sean Johnson | Platform Engineer",
  description:
    "Platform Engineer with CISSP and AWS Security Specialty. Live observability into a rebuildable Kubernetes reference cluster managed with GitOps and policy-as-code.",
  openGraph: {
    title: "Sean Johnson | Platform Engineer",
    description:
      "Live observability into a rebuildable Kubernetes reference cluster managed with GitOps and policy-as-code.",
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
      <body>
        {children}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "YOUR_BEACON_TOKEN"}'
        ></script>
      </body>
    </html>
  );
}
