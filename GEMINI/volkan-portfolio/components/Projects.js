// components/Projects.js
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";

// Sahte Veri Yapısı (3 saniye sonra yüklenecek)
const dummyProjects = [
  {
    title: "Headless CMS Portalı",
    description: "Sanity CMS ile yönetilen, SEO optimizasyonlu, sunucu tarafında render edilmiş (SSR) blog platformu.",
    tech: ["Next.js", "Sanity", "Tailwind"],
    github: "#",
    live: "#"
  },
  {
    title: "E-Ticaret Mikroservis",
    description: "Sepet ve ödeme süreçlerini yöneten, Node.js ve mikroservis mimarisi kullanan backend uygulaması.",
    tech: ["Node.js", "Express", "MongoDB"],
    github: "#",
    live: "#"
  },
];

// Tek bir Skeleton Kartı
const SkeletonCard = () => (
  // animate-pulse ile yükleniyor efekti veriyoruz
  <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 animate-pulse">
    {/* Resim alanı yer tutucusu */}
    <div className="h-64 w-full bg-white/10" />

    <div className="p-6 space-y-4">
      {/* Başlık yer tutucusu */}
      <div className="h-6 w-1/2 bg-white/10 rounded" />
      {/* Açıklama yer tutucusu */}
      <div className="space-y-2 pt-2">
        <div className="h-4 w-full bg-white/5 rounded" />
        <div className="h-4 w-3/4 bg-white/5 rounded" />
      </div>
      {/* Etiketler yer tutucusu */}
      <div className="flex gap-2 pt-2">
        <div className="h-6 w-16 bg-white/5 rounded-full" />
        <div className="h-6 w-16 bg-white/5 rounded-full" />
      </div>
    </div>
  </div>
);


// Gerçek Proje Kartı (Yükleme bittikten sonra görünür)
const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    // Hover efekti
    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2)" }}
    className="bg-[#111] rounded-2xl overflow-hidden border border-white/10 transition-all duration-300"
  >
    {/* Sahte Görüntü (Sadece renk) */}
    <div className="h-64 w-full bg-blue-900/10 flex items-center justify-center">
      <h3 className="text-xl font-bold text-blue-400">{project.title}</h3>
    </div>

    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map(tech => (
          <span key={tech} className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full font-medium">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <a href={project.github} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <Github className="w-5 h-5" /> GitHub
        </a>
        <a href={project.live} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ExternalLink className="w-5 h-5" /> Canlı İzle
        </a>
      </div>
    </div>
  </motion.div>
);


export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  // componentDidMount ve componentDidUpdate yerine kullanılır (Effect Hook)
  useEffect(() => {
    // 3 saniye sonra yükleniyor durumunu bitir ve veriyi yükle
    const timer = setTimeout(() => {
      setProjects(dummyProjects);
      setLoading(false);
    }, 3000);

    // Temizleme fonksiyonu: Bileşen kaldırılırsa timer'ı durdur
    return () => clearTimeout(timer);
  }, []); // Boş dizi: Sadece bileşen ilk yüklendiğinde çalıştır.

  return (
    // ID ekliyoruz ki Navbar linkleri buraya kaydırabilsin
    <section id="projeler" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tighter"
      >
        Projelerim ({loading ? 'Yükleniyor...' : projects.length})
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          // Yükleniyorsa 2 adet Skeleton göster
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          // Yüklendiyse gerçek kartları göster
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))
        )}
      </div>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="#" className="text-blue-400 hover:text-white transition-colors text-lg font-medium border-b border-blue-400/50 pb-1">
            Tüm Projeleri Gör &rarr;
          </a>
        </motion.div>
      )}
    </section>
  );
}