import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image"; // Next.js'in kendi Image bileşeni
import Link from "next/link";

async function getProjects() {
  const query = `
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      description,
      image,
      tags,
      liveLink,
      githubLink
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projeler" className="w-full py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-12 border-l-4 border-blue-500 pl-4">
          Projelerim
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col"
            >
              {/* GÖRSEL ALANI */}
              {project.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  {/* DÜZELTME: Next.js Image Component */}
                  <Image
                    src={urlFor(project.image).url()}
                    alt={project.title}
                    fill // Resmi kapsayıcıya doldurur
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Performans ayarı
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {project.description}
                </p>

                {project.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-4 mt-auto">
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors font-medium"
                    >
                      Canlı Demo
                    </Link>
                  )}
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white text-sm py-2 rounded-lg transition-colors font-medium border border-white/10"
                    >
                      GitHub
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Henüz proje eklenmemiş.</p>
        )}
      </div>
    </section>
  );
}