// app/page.js

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact"; // Artık aktif!

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="flex flex-col min-h-screen">

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Section */}
      <Services />

      {/* 3. Projects Section */}
      <Projects />

      {/* 4. Contact Section (Backend Entegreli) */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 mt-16">
        <p>© {currentYear} Volkan. Tüm hakları saklıdır. Mimari: Next.js App Router (JS) & Tailwind.</p>
      </footer>
    </main>
  );
}