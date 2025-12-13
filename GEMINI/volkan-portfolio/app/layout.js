// app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
// Yeni oluşturduğumuz Navbar bileşenini içeri aktar
// Doğru: Proje kökünden başlayan takma ad
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Volkan | Creative Developer",
  description: "Modern & Unique Portfolio built with Next.js and Framer Motion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="scroll-smooth">
      {/* bg-[#0a0a0a] ve antialiased class'larını globals.css'te ayarladık
        Ama fontu burada ekliyoruz.
      */}
      <body className={`${inter.className} antialiased`}>

        {/* Navbar'ı en üste koyuyoruz ki, çocuk bileşenler (children) onun altında kalsın.
          Bu bir Server Component'tir, ancak içinde Client Component (Navbar) çağırıyoruz.
        */}
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}