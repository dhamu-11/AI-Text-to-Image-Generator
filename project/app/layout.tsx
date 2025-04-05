import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Image Generator",
  description: "Transform your prompts into stunning images using AI",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-900 shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">AI Image Generator</h2>
            <ul className="flex space-x-6 text-sm font-medium">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About the Project</Link>
              </li>

              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Page Content */}
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
