import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Lock, Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})



export const metadata: Metadata = {
  title: "LinkCard - Créez et partagez vos cartes personnalisées",
  description: "LinkCard est une application web qui vous permet de créer facilement des cartes visuelles personnalisées pour n'importe quel concept, terme ou idée. Transformez vos idées en cartes claires, lisibles et partageables, sans outils complexes ni templates lourds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Initialize dark mode from localStorage

  // Handle dark mode toggle
  return (
    <html lang="en">

      <body
        className={`${inter.className} antialiased`}
      >
        <header className="sticky top-0 z-50 bg-tranparent backdrop-blur-sm border-b-2 border-[#0788ff]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo / Home Link */}
            <Link
              href="/"
              className="text-[#f0f0f0] text-3xl font-serif font-light font-blanka hover:scale-105 duration-500 tracking-wide hover:text-accent transition-colors"
            >
              LINKCARD
            </Link>


            {/* Dark Mode Toggle & Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="p-2 rounded hover:bg-secondary transition-colors"
                title="Admin"
              >
                <Lock className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>

        </header>
        {children}
      </body>
    </html>
  );
}
