import { defineConfig } from 'astro/config';

export default defineConfig({
  // Halaman ini HTML statis hasil mirror — jangan minify/ubah markup saat build,
  // JS Webflow/OFF+BRAND bergantung pada struktur DOM persis seperti aslinya.
  compressHTML: false,
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
