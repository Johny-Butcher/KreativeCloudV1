import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://johny.codes";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "KreativeCloud — Self-Hosted Web Hosting Platform",
    template: "%s | KreativeCloud",
  },
  description:
    "KreativeCloud is a Dockerized self-hosted web hosting platform with one-click WordPress deployment, FTP management, MySQL databases, PHP-FPM, and Nginx — all powered by a Next.js dashboard and NestJS API.",
  keywords: [
    "self-hosted hosting platform",
    "Dockerized hosting",
    "WordPress one-click deploy",
    "FTP management",
    "MySQL hosting panel",
    "PHP hosting",
    "Nginx reverse proxy",
    "NestJS REST API",
    "Next.js dashboard",
    "Cloudflare Tunnel hosting",
    "phpMyAdmin",
    "web hosting panel",
    "open source hosting",
    "KreativeCloud",
  ],
  authors: [{ name: "Jan Zedník", url: BASE_URL }],
  creator: "Jan Zedník",
  publisher: "Jan Zedník",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "KreativeCloud",
    title: "KreativeCloud — Self-Hosted Web Hosting Platform",
    description:
      "A complete Dockerized self-hosted hosting platform with FTP management, MySQL databases, PHP support, and one-click WordPress deployment. Built with Next.js, NestJS, and Cloudflare Tunnel.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KreativeCloud — Self-Hosted Web Hosting Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KreativeCloud — Self-Hosted Web Hosting Platform",
    description:
      "Dockerized self-hosted hosting platform with WordPress, FTP, MySQL, PHP, and Nginx. Manage everything from a Next.js dashboard.",
    images: ["/og-image.png"],
    creator: "@johny_codes",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KreativeCloud",
  url: BASE_URL,
  description:
    "A complete self-hosted web hosting platform with FTP management, MySQL databases, PHP support, and one-click WordPress deployment.",
  applicationCategory: "WebApplication",
  operatingSystem: "Linux",
  author: {
    "@type": "Person",
    name: "Jan Zedník",
    url: BASE_URL,
  },
  featureList: [
    "One-click WordPress deployment",
    "FTP management with virtual users",
    "MySQL database provisioning",
    "PHP-FPM support",
    "Nginx reverse proxy",
    "phpMyAdmin integration",
    "Cloudflare Tunnel support",
    "Google OAuth authentication",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
