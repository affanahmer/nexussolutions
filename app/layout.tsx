import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Nexus Solutions | UK B2B Digital Growth & AI Solutions Agency",
  description:
    "Nexus Solutions drives UK business growth through cutting-edge digital marketing, custom web development, and AI-powered automation. Book a free growth call today.",
  keywords:
    "UK digital agency, B2B growth, AI solutions, web development, digital marketing, SEO, AI chatbots, AI calling agents",
  openGraph: {
    title: "Nexus Solutions | UK B2B Digital Growth & AI Solutions Agency",
    description:
      "We transform UK businesses with cutting-edge digital and AI solutions. Custom websites, digital marketing, AI automation — all under one roof.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-[var(--theme-bg)] text-[var(--theme-fg)] font-[family-name:var(--font-inter)]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
