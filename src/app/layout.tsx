import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Couple Space — Your little corner of the internet ❤️",
  description:
    "A private space for the two of you to talk, share memories, listen together, and stay connected. Create your own little corner of the internet.",
  keywords: [
    "couple",
    "relationship",
    "private space",
    "memories",
    "chat",
    "listen together",
  ],
  openGraph: {
    title: "Couple Space — Your little corner of the internet ❤️",
    description:
      "A private space for the two of you to talk, share memories, listen together, and stay connected.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
