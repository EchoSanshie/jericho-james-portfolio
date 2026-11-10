import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const themeScript = `
(function() {
  try {
    const storedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#09090B' : '#ECE7DD');
  } catch (error) {}
})();
`;

export const metadata: Metadata = {
  title: "Jericho James | Front-end Web & Mobile Developer",
  description:
    "Portfolio of Jericho James Panganiban — front-end web and Android mobile developer crafting responsive interfaces, modern UI/UX layouts, and digital art.",
  keywords: [
    "Jericho James Panganiban",
    "front-end developer",
    "mobile developer",
    "React",
    "Next.js",
    "Android",
    "UI/UX",
    "portfolio",
  ],
  authors: [{ name: "Jericho James Panganiban" }],
  creator: "Jericho James Panganiban",
  openGraph: {
    type: "website",
    title: "Jericho James | Front-end Web & Mobile Developer",
    description:
      "Portfolio of Jericho James Panganiban — front-end web and Android mobile developer crafting responsive interfaces, modern UI/UX layouts, and digital art.",
    siteName: "Jericho James Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jericho James | Front-end Web & Mobile Developer",
    description:
      "Portfolio of Jericho James Panganiban — front-end web and Android mobile developer.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECE7DD" },
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <Script id="theme-script" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans">
        {children}
        <Footer />
      </body>
    </html>
  );
}