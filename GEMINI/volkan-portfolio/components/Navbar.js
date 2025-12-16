// components/Navbar.js
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Hizmetler", href: "#hizmetler" },
  { name: "Projeler", href: "#projeler" },
  { name: "İletişim", href: "#iletisim" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full",
        "backdrop-blur-md bg-black/50",
        "border-b border-white/5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white hover:text-blue-400 transition-colors">
          VOLKAN<span className="text-blue-500">.</span>
        </Link>

        {/* Linkler */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-white transition-colors relative group py-2"
            >
              {item.name}
              <span className="absolute -bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Resume Butonu (Orjinal Tasarım + Motion) */}
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