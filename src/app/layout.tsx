import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CertiPath Compliance - Global Certification Services",
  description: "Ensuring your products meet global standards, every step of the way. CertiPath Compliance provides comprehensive regulatory compliance services for manufacturers worldwide.",
  icons: {
    icon: '/images/logos/Certipath Compliance_logo_b4_cropped.png',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en-US">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
