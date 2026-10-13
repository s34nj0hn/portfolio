import type { Metadata, Viewport } from "next";
import { Overpass, Overpass_Mono } from "next/font/google";
import "./globals.css";

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
});

const overpassMono = Overpass_Mono({
  variable: "--font-overpass-mono",
  subsets: ["latin"],
});

const beaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

const description =
  "Platform engineer who does security. Ten years securing application delivery at F5, plus a GitOps-managed Kubernetes reference cluster with live public telemetry.";

export const metadata: Metadata = {
  metadataBase: new URL("https://s34nj0hn.dev"),
  title: "Sean Johnson | Platform Engineer",
  description,
  openGraph: {
    title: "Sean Johnson | Platform Engineer",
    description,
    type: "website",
    url: "https://s34nj0hn.dev",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f6f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${overpass.variable} ${overpassMono.variable}`}>
      <body>
        {children}
        {beaconToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: beaconToken })}
          ></script>
        )}
      </body>
    </html>
  );
}
