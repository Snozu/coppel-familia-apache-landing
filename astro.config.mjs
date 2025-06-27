// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    partytown({
      // Configuración para Google Analytics
      config: {
        forward: ["dataLayer.push", "gtag"],
      },
    }),
  ],
})