import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Split heavy libraries into their own files so they cache separately.
const vendorChunk = (id) => {
  if (!id.includes('node_modules')) return undefined
  if (id.includes('/three/')) return 'three'
  if (id.includes('/gsap/') || id.includes('/locomotive-scroll/') || id.includes('/lenis/')) return 'motion'
  if (id.includes('/@supabase/')) return 'supabase'
  return undefined
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: { output: { manualChunks: vendorChunk } },
  },
})
