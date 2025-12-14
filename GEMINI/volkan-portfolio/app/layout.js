import { Inter } from "next/font/google";
import "./globals.css";
// 1. ADIM: Butonu buraya çağırıyoruz
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Volkan | Fullstack Developer",
  description: "Modern web teknolojileri ile geliştirilmiş portfolyo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Sayfanın asıl içeriği burada */}
        {children}

        {/* 2. ADIM: Butonu içeriğin altına (ama ekranın üstüne) ekliyoruz */}
        <WhatsAppButton />
      </body>
    </html>
  );
}