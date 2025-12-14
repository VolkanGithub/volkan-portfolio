// components/Navbar.js

"use client"; // Bu bir Client Component'tir!

import Link from "next/link";
import { motion } from "framer-motion";
// lib klasöründen getirdiğimiz temizleyici fonksiyonumuz
// Doğru: Proje kökünden başlayan takma ad
import { cn } from "@/lib/utils";

// Linklerimizi bir obje dizisinde tutmak, gelecekte kolayca CMS'e bağlamayı sağlar.
const navItems = [
  { name: "Hizmetler", href: "#hizmetler" },
  { name: "Projeler", href: "#projeler" },
  { name: "İletişim", href: "#iletisim" },
];

export default function Navbar() {
  return (
    // 1. motion.nav: Açılışta yumuşakça yukarıdan aşağı süzülme animasyonu.
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      // cn(Sticky, Buzlu cam, Hafif siyah arka plan, İnce border)
      className={cn(
        "sticky top-0 z-50 w-full",
        "backdrop-blur-md bg-black/50",
        "border-b border-white/5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo/İsim */}
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-blue-400 transition-colors">
          VOLKAN<span className="text-blue-500">.</span>
        </Link>

        {/* Navigasyon Linkleri */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-white transition-colors relative group py-2" // py-2 link alanını genişletir
            >
              {item.name}
              {/* Alt çizgi efekti */}
              <span className="absolute -bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA Butonu */}
        {/* components/Navbar.js - Resume Butonu (Güncel ve Tasarıma Sadık) */}
        {/* components/Navbar.js - Resume Butonu (Güncel ve Tasarıma Sadık) */}
        <motion.a
          href="/resume.pdf"
          target="_blank"
          download="Volkan_Ozkan_CV"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 px-5 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all border border-white/5 cursor-pointer flex items-center justify-center text-white"
        >
          Resume İndir
        </motion.a>
      </div>
    </motion.nav>
  );
}