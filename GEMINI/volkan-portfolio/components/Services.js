import { cn } from "@/lib/utils";

const services = [
  {
    title: "Fullstack Geliştirme",
    description: "Modern teknolojilerle (Next.js, Node.js) uçtan uca, ölçeklenebilir web uygulamaları.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
  },
  {
    title: "Sistem Mimarisi",
    description: "Yüksek trafikli sistemler için veritabanı tasarımı, microservices ve cloud altyapısı.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    ),
  },
  {
    title: "UI/UX & Performans",
    description: "Kullanıcı deneyimini ön planda tutan, hızlı açılan ve erişilebilir arayüzler.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="w-full py-24 bg-black text-white relative overflow-hidden">
      {/* Arka plan için hafif bir gradient efekti */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Başlık Alanı */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold border-l-4 border-blue-500 pl-4 mb-4">
            Neler Yapıyorum?
          </h2>
          <p className="text-gray-400 max-w-2xl pl-5">
            Fikir aşamasından canlıya geçişe kadar, projenizin her aşamasında teknik liderlik ve geliştirme hizmeti sunuyorum.
          </p>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="mb-6 p-3 bg-blue-500/10 w-fit rounded-lg text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}