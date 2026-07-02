import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hellenic Homes",
  description: "Property rentals and sales on the Greek islands",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 font-sans">
        <header className="bg-white border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-stone-800 tracking-tight">
              Hellenic Homes
            </a>
            <span className="text-sm text-stone-400">Greek Island Properties</span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 bg-white mt-12">
          <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-stone-400 text-center">
            © {new Date().getFullYear()} Hellenic Homes. Powered by WordPress.
          </div>
        </footer>
      </body>
    </html>
  );
}
