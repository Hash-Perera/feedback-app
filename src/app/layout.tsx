import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assignment Buddy | Your University Assignment Partner",
  description:
    "Assignment Buddy helps university students manage and complete their assignments with ease. Get guidance, support, and tools at assignmentbuddy.online.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    "Assignment Buddy",
    "university assignments",
    "student help",
    "assignment support",
    "assignmentbuddy.online",
  ],
  authors: [{ name: "Assignment Buddy Team" }],
  openGraph: {
    title: "Assignment Buddy | Your University Assignment Partner",
    description:
      "Get support and guidance for your university assignments with Assignment Buddy. Visit assignmentbuddy.online.",
    url: "https://assignmentbuddy.online",
    siteName: "Assignment Buddy",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://assignmentbuddy.online"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
