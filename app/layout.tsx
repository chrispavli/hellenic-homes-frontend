import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hellenic Abodes",
  description: "Property rentals and sales across Greece and Cyprus",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <header className="bg-white border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.pavli.co.uk/hellenic-abodes-logo.png?v=1" alt="Hellenic Abodes" className="h-14 md:h-20 w-auto" />
            </Link>
            <span className="text-sm text-stone-400">Properties in Greece & Cyprus</span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 bg-white mt-12">
          <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-stone-400 text-center">
            © {new Date().getFullYear()} Hellenic Abodes. Powered by WordPress.
          </div>
        </footer>
      </body>
    </html>
  );
}
