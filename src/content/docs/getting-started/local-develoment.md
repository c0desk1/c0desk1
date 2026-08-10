---
slug: local-development
title: "Pengembangan Lokal"
description: "Panduan praktis untuk menyiapkan, menjalankan, dan menguji coba kode sumber Unloyd di perangkat lokal."
category: "Getting Started"
order: 5
seo:
  title: "Panduan Pengembangan Lokal"
  description: "Langkah-langkah untuk mengunduh, memasang dependensi, dan menjalankan peladen lokal situs Unloyd."
  noIndex: false
draft: false
lastUpdated: 2026-08-10T15:14:00Z
---

Jika Anda ingin mengunduh kode sumber **Unloyd**, bereksperimen dengan tampilannya, atau menguji perubahan secara langsung sebelum menerbitkannya ke ranah publik, Anda dapat menjalankan proyek ini di dalam komputer lokal Anda.

Proses penyiapannya dirancang agar ringkas dan tidak memerlukan konfigurasi peladen yang rumit.

## Persyaratan Awal

Sebelum memulai, pastikan perangkat Anda telah terpasang beberapa perangkat lunak esensial berikut:
1. **Node.js** (disarankan menggunakan versi LTS terbaru).
2. Manajer paket pilihan Anda (`npm`, `pnpm`, atau `bun`).
3. Perangkat pengendali versi **Git**.

---

## Langkah-Langkah Menjalankan Proyek

Ikuti instruksi di bawah ini untuk menyiapkan lingkungan lokal Anda:

:::steps
1.  ### Salin Repositori (Clone)
	Buka terminal atau command line di komputer Anda, lalu unduh salinan repositori kode sumber Unloyd dari GitHub:
	
	```bash
    git clone [https://github.com/username/unloyd.git](https://github.com/username/unloyd.git)
    cd unloyd
    ```

  > [!NOTE]
  > Sesuaikan tautan URL di atas dengan alamat repositori yang Anda miliki).

2. ### Pasang Dependensi
   Setelah berada di dalam direktori proyek, pasang seluruh pustaka pendukung yang dibutuhkan menggunakan manajer paket pilihan Anda:
  
   ::::tabs
   :::tab[npm]
   ```bash
   npm install
   ```
   :::
  
   :::tab[pnpm]
   ```bash
   pnpm install
   ```
   :::
  
   :::tab[bun]
   ```bash
   bun install
   ```
   :::
   ::::
  
3. ### Jalankan Peladen Lokal
   Setelah proses pemasangan pustaka selesai, nyalakan peladen pengembangan (development server) lokal dengan perintah:
  
   ::::tabs
   :::tab[npm]
   ```bash
   npm run dev
   ```
   :::
  
   :::tab[pnpm]
   ```bash
   pnpm dev
   ```
   :::
  
   :::tab[bun]
   ```bash
   bun dev
   ```
   :::
   ::::
  
   Secara default, Astro akan menjalankan peladen lokal yang dapat diakses melalui peramban web pada alamat `http://localhost:4321`.
:::

Setiap kali Anda mengubah berkas artikel di dalam folder `src/content/` atau merubah tata letak kode, peramban akan memperbarui tampilannya secara instan (Hot Module Replacement), memudahkan Anda melihat hasil eksperimen secara langsung.