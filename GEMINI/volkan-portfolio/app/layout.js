import { Inter } from "next/font/google";
import "./globals.css";

// BİLEŞENLERİMİZİ ÇAĞIRIYORUZ
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar"; // <-- İŞTE EKSİK OLAN PARÇA!

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Volkan | Fullstack Developer",
  description: "Modern web teknolojileri ile geliştirilmiş portfolyo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>

        {/* 1. ADIM: Navbar en tepede duracak */}
        <Navbar />

        {/* 2. ADIM: Sayfanın geri kalanı (Hero, Services vs.) burada */}
        <main>
          {children}
        </main>

        {/* 3. ADIM: WhatsApp butonu en altta (ama ekranın üstünde yüzer) */}
        <WhatsAppButton />

      </body>
    </html>
  );
}