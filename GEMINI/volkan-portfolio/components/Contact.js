// components/Contact.js
"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { sendEmail } from "@/actions/sendEmail";
import { useState } from "react";

export default function Contact() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const clientAction = async (formData) => {
    setPending(true);
    setMessage("");

    const result = await sendEmail(formData);

    if (result?.error) {
      setMessage(`❌ ${result.error}`);
      setPending(false);
      return;
    }

    setMessage("✅ Mesajınız başarıyla alındı! En kısa sürede döneceğim.");
    setPending(false);

    // Form resetleme (DOM manipülasyonu yerine reset() kullanımı)
    const formElement = document.getElementById("contactForm");
    if (formElement) {
      formElement.reset();
    }
  };

  return (
    <section id="iletisim" className="py-24 px-6 max-w-3xl mx-auto text-center scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-[#111] to-[#0a0a0a] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Birlikte Çalışalım</h2>

        {/* DÜZELTME BURADA YAPILDI: "Merhaba" yerine &quot;Merhaba&quot; kullanıldı */}
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Bir projeniz mi var? Veya sadece &quot;Merhaba&quot; mı demek istiyorsunuz?
          Formu doldurun, doğrudan gelen kutuma düşsün.
        </p>

        <form
          id="contactForm"
          action={clientAction}
          className="space-y-4 text-left"
        >
          <div className="relative">
            <input
              name="senderEmail"
              type="email"
              required
              maxLength={500}
              placeholder="E-posta Adresiniz"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="relative">
            <textarea
              name="message"
              required
              maxLength={5000}
              rows="4"
              placeholder="Mesajınız..."
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder:text-gray-600"
            />
          </div>

          <motion.button
            type="submit"
            disabled={pending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
          >
            {pending ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              <>
                Gönder <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>

          {/* Durum Mesajı */}
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-medium mt-4 text-center ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}
            >
              {message}
            </motion.p>
          )}
        </form>
      </motion.div>
    </section>
  );
}