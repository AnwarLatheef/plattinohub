import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Plattino Hub",
    template: "%s | Plattino Hub"
  },
  description: "Welcome to Plattino Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en" data-scroll-behavior="smooth" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
