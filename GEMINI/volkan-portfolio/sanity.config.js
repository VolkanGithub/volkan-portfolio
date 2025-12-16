import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'

// MEVCUT AYARLAR
import { structure } from './sanity/structureConfig'

// EKSİK OLAN PARÇA: Schema dosyanı buradan çağırıyoruz!
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,

  // KRİTİK DÜZELTME: Veritabanı tablolarını sisteme tanıtıyoruz
  schema: {
    types: schema.types,
  },

  plugins: [
    structureTool({
      structure: structure
    }),

    visionTool({ defaultApiVersion: apiVersion }),
  ],
})