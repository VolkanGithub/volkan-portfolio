// components/Services.js
"use client";

import { motion } from "framer-motion";
import { Code, Users, Feather } from "lucide-react"; // İkonlar

const servicesData = [
  {
    title: "Sistem Mimarisi",
    description: "Ölçeklenebilir, yüksek performanslı ve maliyet etkin Next.js/Serverless mimarileri tasarlama.",
    icon: Users
  },
  {
    title: "Backend Geliştirme (Fullstack)",
    description: "API tasarımı, veritabanı yönetimi ve güvenli sunucu tarafı mantık oluşturma.",
    icon: Code
  },
  {
    title: "Kullanıcı Arayüzü (Design)",
    description: "Tailwind CSS ve Framer Motion kullanarak benzersiz, akışkan ve erişilebilir UI/UX deneyimleri.",
    icon: Feather
  },
];

// Tek bir hizmet kartı bileşeni
const ServiceCard = ({ title, description, icon: Icon, index }) => {
  return (
    <motion.div
      // 1. Fade-in Up Animasyonu (Ekrana Girişte)
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }} // Görünürlüğün %40'ına girince tetikle
      transition={{ duration: 0.6, delay: index * 0.15 }} // Gecikmeli giriş

      // 2. Hover Animasyonu (Yaylanma ve Border Parlaması)
      whileHover={{ scale: 1.05 }}
      className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-default group shadow-xl hover:shadow-blue-900/30 relative overflow-hidden"
    >
      {/* Hover Parlaması için Sahte Glow Efekti (İnce bir trick) */}
      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-500 pointer-events-none" />

      <div className="w-12 h-12 bg-white/5 rounded-lg mb-6 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
        <Icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
      </div>

      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
};


export default function Services() {
  return (
    // ID ekliyoruz ki Navbar linkleri buraya kaydırabilsin
    <section id="hizmetler" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tighter"
      >
        Hizmetlerim & Yetkinliklerim
      </motion.h2>

      {/* CSS Grid Kullanımı: 3 Sütun */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}