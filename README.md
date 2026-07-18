# Lando Norris — Mirror (Versi Astro)

Mirror offline dari halaman utama [landonorris.com](https://landonorris.com/) yang dikemas sebagai proyek [Astro](https://astro.build) 5. Seluruh aset (gambar, CSS, JS, animasi Rive, model 3D, tekstur WebGL) tersimpan lokal — halaman berjalan penuh tanpa koneksi internet.

> **Catatan hak cipta:** Konten situs ini (foto, desain, merek Lando Norris/McLaren) adalah milik pemiliknya masing-masing. Salinan ini hanya untuk keperluan belajar/arsip pribadi — jangan dipublikasikan ulang atau dipakai seolah-olah situs resmi.

## Menjalankan

```bash
npm install        # sekali saja
npm run dev        # server development → http://localhost:4321
npm run build      # build statis ke dist/
npm run preview    # sajikan hasil build
```

## Struktur Proyek

```
├── astro.config.mjs        # compressHTML: false (lihat "Keputusan teknis")
├── public/
│   └── assets/             # 283 aset statis
│       ├── *.css, *.js     # bundle Webflow + JS custom OFF+BRAND
│       ├── *.webp/png/svg  # gambar halaman
│       ├── rive/           # 8 file animasi Rive (.riv)
│       └── gl/             # aset WebGL: model .glb, HDRI, font MSDF,
│           │               #   decoder Draco
│           └── textures/   # tekstur 3D (helm, wajah, kaca, dll.)
└── src/
    ├── fragments/
    │   ├── head.html       # isi <head> asli (meta, CSS, script)
    │   └── body.html       # seluruh markup halaman (~197 KB)
    └── pages/
        └── index.astro     # merakit fragmen via <Fragment set:html>
```

## Keputusan Teknis

1. **Markup disimpan sebagai fragmen `?raw` + `set:html`, bukan template `.astro` biasa.**
   HTML Webflow berisi ratusan karakter `{` di inline script yang akan diparse Astro
   sebagai ekspresi template. `set:html` menyuntikkan HTML byte-per-byte apa adanya.
2. **`compressHTML: false`** — JS OFF+BRAND bergantung pada struktur DOM persis;
   minifikasi HTML berisiko merusak animasi.
3. **Atribut `integrity` (SRI) dihapus dari HTML** karena isi CSS/JS berubah saat
   URL ditulis ulang ke path lokal — hash lama akan membuat browser memblokir file.
4. **Base URL runtime di bundle JS sudah ditulis ulang** ke path lokal
   (`assets/rive/`, `assets/gl`) — dulunya menunjuk CDN `itsoffbrand.io`.

## Mengganti Foto Model

**Foto hero (wajah besar + helm 3D)** — dirender di WebGL, bukan `<img>`.
Ganti file di `public/assets/gl/textures/head/webp/` (nama & format harus sama):

- `diffuse.webp` (2048×2048) — fotonya; posisi wajah harus mirip aslinya agar helm pas
- `alpha.webp` (2048×2048) — masker potongan (putih = tampak, hitam = transparan)
- `depth.webp` (512×512) — peta kedalaman untuk parallax (opsional dibuat ulang)

**Foto biasa** — `<img>` di `src/fragments/body.html`. Timpa file di `public/assets/`
dengan nama sama (perhatikan varian `srcset`: `-p-500`, `-p-800`, full), atau edit
atribut `src`-nya langsung.

Setelah mengganti: hard refresh (`Ctrl+Shift+R`) karena browser meng-cache gambar.

## Keterbatasan

- Hanya halaman utama yang di-mirror; link navigasi ke halaman lain (store, dsb.)
  masih menunjuk ke situs aslinya.
- Script analytics/cookie (Klaviyo, iubenda, Google Analytics) sengaja dibuang.
