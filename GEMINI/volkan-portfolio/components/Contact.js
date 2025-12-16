"use client";

import { useState } from "react";
import Link from "next/link"; // Next.js Link bileşeni eklendi

export default function Contact() {
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // FormSubmit Ayarları
    formData.append("_subject", "Portfolyo Sitesinden Yeni Mesaj!");
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    const data = Object.fromEntries(formData.entries());

    setStatus("submitting");

    // -------------------------------------------------------------------
    // AYAR: Buraya KENDİ E-POSTA ADRESİNİZİ yazın.
    const MY_EMAIL = "volkangithub@gmail.com";
    // -------------------------------------------------------------------

    const ENDPOINT = `https://formsubmit.co/ajax/${MY_EMAIL}`;

    if (MY_EMAIL === "volkangithub@gmail.com") {
      setTimeout(() => {
        form.reset();
        setStatus("success");
      }, 1500);
      return;
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <section id="iletisim" className="w-full py-24 bg-black text-white relative overflow-hidden">

      {/* Arka plan glow efekti */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 relative z-10">

        {/* BAŞLIK ALANI */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
            Bir sonraki projenizi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-extrabold">
              birlikte hayata geçirelim.
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            İster yeni bir fikir, ister mevcut bir sistemin modernizasyonu olsun;
            teknik uzmanlığım ile hedeflerinize ulaşmanıza yardımcı olabilirim.
          </p>
        </div>

        {/* FORM KARTI */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl mb-16">

          {status === "success" ? (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Mesajınız Alındı!</h3>
              <p className="text-gray-400">En kısa sürede size döneceğim.</p>
              <button onClick={() => setStatus(null)} className="mt-6 text-blue-500 hover:text-blue-400 text-sm font-medium underline-offset-4 hover:underline">Yeni mesaj gönder</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label htmlFor="email" className="sr-only">E-posta Adresiniz</label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-posta Adresiniz"
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Mesajınız</label>
                <textarea
                  required
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Mesajınız..."
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <button
                disabled={status === "submitting"}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-purple-900/20"
              >
                {status === "submitting" ? (
                  "Gönderiliyor..."
                ) : (
                  <>
                    Gönder
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">
                  Bir hata oluştu. E-posta adresinizi doğru yazdığınızdan emin olun.
                </p>
              )}
            </form>
          )}
        </div>

        {/* FOOTER & SOSYAL MEDYA & CV */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">

          {/* Telif Hakkı */}
          <p className="text-gray-500">© 2024 Volkan Özkan.</p>

          <div className="flex items-center gap-8">
            {/* Sosyal Medya Linkleri */}
            <div className="flex gap-6">
              <a
                href="https://linkedin.com/in/volkan-özkan160293/" // BURAYI DÜZENLE
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/VolkanGithub" // BURAYI DÜZENLE
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                GitHub
              </a>
            </div>

            {/* Ayırıcı Çizgi */}
            <div className="w-px h-4 bg-white/20 hidden md:block"></div>
          </div>

        </div>

      </div>
    </section>
  );
}