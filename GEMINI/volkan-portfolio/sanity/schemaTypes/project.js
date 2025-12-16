// sanity/schemaTypes/project.js

export const project = {
  name: 'project',
  title: 'Projeler',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Proje Başlığı',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Proje Görseli',
      type: 'image',
      options: {
        hotspot: true, // Resmi kırpmak için odak noktası seçebilmeni sağlar
      },
    },
    {
      name: 'tags',
      title: 'Teknolojiler (Etiketler)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags', // Enter'a bastıkça etiket ekler
      },
    },
    {
      name: 'liveLink',
      title: 'Canlı Proje Linki',
      type: 'url',
    },
    {
      name: 'githubLink',
      title: 'GitHub Linki',
      type: 'url',
    },
  ],
}