---
slug: repo-structure
title: "Struktur Repositori"
description: "Peta direktori dan penjelasan fungsi berkas utama di dalam kode sumber Unloyd."
category: "Getting Started"
order: 3
seo:
  title: "Struktur Repositori & Direktori"
  description: "Penjelasan mendalam mengenai tata letak berkas dan folder dalam kode sumber proyek Unloyd."
  noIndex: true
draft: false
lastUpdated: 2026-08-10T14:53:00Z
---

Untuk memudahkan pemahaman terhadap cara kerja proyek ini, tata letak kode sumber di dalam repositori **Unloyd** diatur secara modular dan terstruktur. Pendekatan ini memisahkan antara logika antarmuka, arsip konten, hingga konfigurasi sistem kompilasi.

Berikut adalah gambaran umum dari peta direktori utama proyek:

:::filetree
- unloyd/
	- public/            # Aset statis global (favicon, robots.txt, gambar aset)
	- src/
		- assets/        # Berkas sumber grafis dan fon lokal (Geist & GeistMono)
		- components/    # Komponen antarmuka modular (UI, Blog, dan Dokumentasi)
		- content/       # Direktori pusat penyimpanan konten berbasis berkas
			- blog/      # Arsip artikel anime, game, dan tutorial (.md/.mdx)
			- docs/      # Dokumentasi teknis sistem ini (.md/.mdx)
			- legal/     # Kebijakan privasi dan ketentuan layanan
		- layouts/       # Kerangka tata letak utama halaman web
		- lib/           # Logika pendukung, utilitas, dan plugin parser Markdown
		- pages/         # Rute aplikasi berbasis sistem berkas (File-based routing)
		- consts.ts      # Konfigurasi global metadata dan tautan situs
		- content.config.ts # Definisi skema koleksi konten menggunakan Zod
	- functions/         # Fungsi serverless Edge (Cloudflare Pages Functions)
	- astro.config.mjs   # Konfigurasi utama Astro dan integrasi modul Satteri
:::

## Penjelasan Direktori Krusial
Setiap folder dalam proyek memiliki tanggung jawab yang spesifik untuk menjaga kerapian kode:

### `src/content/`
Direktori ini menjadi pusat dari seluruh materi bacaan. Dengan memisahkan `blog`, `docs`, dan `legal` ke dalam sub-folder tersendiri, sistem **Content Collections** dapat mengelola validasi tipe data secara terisolasi tanpa saling tercampur.

### `src/lib/mdx/`
Bagian ini menampung seluruh fungsi ekstensi dan plugin kustom untuk pengurai Markdown (Satteri). Berkas-berkas di sini (seperti `satteri-callout.ts`, `satteri-tabs.ts`, dan `satteri-filetree.ts`) memproses sintaks direktif khusus menjadi elemen HTML yang bersih saat situs dikompilasi.

### `src/pages/ dan functions/`
	- `src/pages/` menangani seluruh struktur perutean halaman statis maupun dinamis (seperti halaman arsip artikel dan tampilan detail bacaan).
	- `functions/` disiapkan untuk menangani logika sisi peladen (serverless) yang berjalan langsung di jaringan Edge Cloudflare jika diperlukan di masa mendatang.

Struktur ini dirancang agar bersih, mudah dirawat, dan transparan bagi siapa saja yang ingin mempelajari atau memodifikasi kode sumber Unloyd.