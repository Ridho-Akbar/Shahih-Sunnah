// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Scheherazade_New } from "next/font/google";
import "./globals.css";

// Konfigurasi Font Latin
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

// Konfigurasi Font Arab
const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#000000", // Warna hitam untuk status bar mobile
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {  
    default: "Shahih Sunnah — Amalan & Doa Berdasarkan Dalil Shahih",
    template: "%s | Shahih Sunnah",
  },
  description: "Kumpulan amalan, dzikir, doa, dan tata cara ibadah berdasarkan dalil-dalil shahih dari Al-Qur'an dan Sunnah sesuai pemahaman Salafush Shalih.",
  keywords: [
    "shahih sunnah", 
    "dzikir pagi petang", 
    "doa harian muslim", 
    "tata cara sholat", 
    "jadwal puasa sunnah", 
    "hadits shahih bukhari muslim",
    "manhaj salaf"
  ],
  authors: [{ name: "Ridho Akbar", url: "https://github.com/rydhoz" }],
  creator: "Ridho Akbar",
  publisher: "Shahih Sunnah",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://shahih-sunnah.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Shahih Sunnah",
    title: "Shahih Sunnah — Amalan & Doa Berdasarkan Dalil Shahih",
    description: "Panduan lengkap amalan harian, dzikir, dan doa berdasarkan dalil shahih.",
    url: "https://shahih-sunnah.vercel.app",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.png", // Pastikan Anda memiliki file ini di folder public jika ingin share link terlihat bagus
        width: 1200,
        height: 630,
        alt: "Shahih Sunnah Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahih Sunnah — Amalan & Doa Berdasarkan Dalil Shahih",
    description: "Panduan lengkap amalan harian, dzikir, dan doa berdasarkan dalil shahih.",
    creator: "@rydhoz", // Opsional: ganti dengan username twitter Anda
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
  icon: [
    { url: "/favicon.svg", type: "image/svg+xml" },
    { url: "/favicon.ico", sizes: "48x48" },
  ],
  shortcut: "/favicon.ico",
  apple: "/favicon.svg",
},
  other: {
    "json-ld": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Shahih Sunnah",
      "description": "Aplikasi kumpulan amalan dan doa berbasis dalil shahih.",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All",
    }),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="id" 
      dir="ltr" 
      className={`${inter.variable} ${scheherazade.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-200">
        <main className="flex-1 relative">
          {children}
        </main>
      </body>
    </html>
  );
}