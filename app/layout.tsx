// NextJS
import type { Metadata } from "next";

// MUI
import { CssBaseline } from "@mui/material";

// Assets
import { Geist, Geist_Mono  } from "next/font/google";

// Styles Global
import "./globals.css";

// Components
import Header from "./_components/header/Header";
import Footer from "./_components/footer/Footer";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Context CMS",
  description: "CMS for Context Crud",
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
        <Providers>
          <CssBaseline />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
