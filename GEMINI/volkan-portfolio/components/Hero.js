// components/Hero.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// cn fonksiyonunu yine kullanıyoruz
import { cn } from "@/lib/utils";

// Animasyon ayarları: Süzülme ve gecikmeli giriş
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 } // Çocuk elementlerin 0.2 saniye arayla girmesini sağlar
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // Başlangıçta 30px aşağıda ve görünmez
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" } // Yumuşakça yukarı süzülme
  }
};

// Bu, CTA butonları için ortak stil ve animasyon
const CTAButton = ({ href, children, primary = false }) => (
  <motion.a
    href={href}
    variants={itemVariants}
    whileHover={{ scale: 1.05 }} // Hover efekti
    whileTap={{ scale: 0.95 }}
    className={cn(
      "px-8 py-4 font-semibold rounded-full transition-all text-base md:text-lg",
      primary
        ? "bg-white text-black hover:bg-gray-200"
        : "bg-transparent border border-white/20 text-white hover:bg-white/5"
    )}
  >
    {children}
  </motion.a>
);


export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">

      {/* İnce Mavi/Mor Glow Efekti (Deep Black temayı destekler) */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10 opacity-70" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl pt-24 pb-12"
      >

        {/* Metinler */}
        <motion.p variants={itemVariants} className="text-gray-400 mb-4 tracking-widest text-sm uppercase">
          Fullstack Developer & System Archıtect
        </motion.p>

        {/* Gradient Başlık */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight"
        >
          Merhaba, Ben{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Volkan.
          </span>
        </motion.h1>

        {/* Açıklama */}
        <motion.p variants={itemVariants} className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Modern, performans odaklı web mimarileri tasarlıyor ve hayata geçiriyorum.
        </motion.p>

        {/* CTA Butonları */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="#projeler" primary>Projelerim</CTAButton>
          <CTAButton href="#iletisim">İletişime Geç</CTAButton>
        </motion.div>
      </motion.div>
    </section>
  );
}