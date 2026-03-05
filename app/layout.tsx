import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Joshua Kibuye — Full-Stack Developer, AI & Innovation",
  description:
    "Portfolio of Joshua Kibuye — Full-stack developer building innovative digital solutions powered by AI, modern engineering, and design thinking.",
  keywords: [
    "Joshua Kibuye",
    "Full-Stack Developer",
    "AI Engineer",
    "Innovation",
    "Portfolio",
  ],
  openGraph: {
    title: "Joshua Kibuye — Full-Stack Developer, AI & Innovation",
    description:
      "Building the future through code, AI, and purposeful innovation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
