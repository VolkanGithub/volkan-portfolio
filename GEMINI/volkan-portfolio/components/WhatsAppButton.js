// components/WhatsAppButton.js
"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "905555555555"; // Numaranı kontrol et
  const message = "Merhaba, web sitenizi inceledim, projem için görüşmek isterim.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      // Sayfa açılınca sağdan kayarak gelir
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
      // Hover ve Tap efektleri
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // CSS Sınıfları:
      // 1. Şekil: Yuvarlak değil, "hap" şeklinde (rounded-full, px-5 py-3)
      // 2. Renk: Senin seçtiğin mor-pembe gradient
      // 3. Gölge: Temiz, mor renkli gölge (shadow-lg shadow-purple-500/30)
      // 4. Düzen: İkon ve yazıyı yan yana ortala (flex items-center gap-2)
      // 5. Glitch Önlemi: overflow-hidden eklendi.
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-3 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all overflow-hidden font-medium"
      title="WhatsApp ile İletişime Geç"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="hidden md:inline">Mesaj Gönder</span>
      {/* Mobil'de sadece ikon, PC'de yazı da görünür */}
    </motion.a>
  );
}