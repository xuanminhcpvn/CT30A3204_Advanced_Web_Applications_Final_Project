import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//for shadcn 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()], 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:1234", 
        changeOrigin: true,
      }
    },
    port: 3000
  }
})
