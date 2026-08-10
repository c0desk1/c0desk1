---
slug: deployment
title: "Panduan Deployment"
description: "Langkah-langkah teknis untuk mempublikasikan dan mengelola situs Unloyd ke lingkungan produksi."
category: "Getting Started"
order: 4
seo:
  title: "Panduan Deployment & Publikasi"
  description: "Instruksi lengkap untuk melakukan deployment situs Unloyd ke infrastruktur Cloudflare Pages."
  noIndex: true
draft: false
lastUpdated: 2026-08-10T15:02Z
---

Karena **Unloyd** dibangun di atas kerangka kerja yang menghasilkan aset statis berkinerja tinggi, proses publikasinya tidak memerlukan pengelolaan peladen (*server*) yang rumit. Situs ini dirancang agar dapat di-deploy secara instan dan otomatis melalui jaringan global.

Berikut adalah panduan lengkap mengenai cara mempublikasikan proyek ini ke lingkungan produksi menggunakan **Cloudflare Pages**.

## Prasyarat Sebelum Memulai

Sebelum melanjutkan ke proses *deployment*, pastikan Anda telah menyiapkan beberapa hal berikut:
1. Akun GitHub yang aktif dengan akses ke repositori proyek Unloyd.
2. Akun Cloudflare gratis untuk mengelola infrastruktur web dan *Edge CDN*.

---

## Langkah-Langkah Deployment

Proses publikasi dilakukan dengan menghubungkan repositori kode sumber langsung ke layanan Cloudflare Pages agar setiap pembaruan kode dapat diperbarui secara otomatis (*Continuous Deployment*).

:::steps
1. ### 1. Salin atau Hubungkan Repositori
  Pastikan kode sumber proyek Unloyd telah berada di dalam repositori GitHub Anda.

2. ### Buat Aplikasi Baru di Cloudflare Pages
  * Masuk ke dalam dasbor Cloudflare Anda.
  * Pada panel navigasi sebelah kiri, pilih menu **Workers & Pages**.
  * Buka tab **Pages**, lalu klik tombol **Create application**.
  * Pilih opsi **Connect to Git** untuk memberikan izin akses Cloudflare ke akun GitHub Anda, kemudian pilih repositori Unloyd.

3. ### Konfigurasi Parameter Build
  Pada tahap pengaturan pembangunan (*build settings*), masukkan parameter yang sesuai dengan konfigurasi proyek Astro Anda:
  * **Production branch:** `main` (atau cabang utama yang Anda gunakan)
  * **Build command:** `npm run build` (atau manajer paket lain seperti `pnpm build` / `bun run build`)
  * **Build output directory:** `dist`

4. ### Selesaikan dan Publikasikan
  Klik tombol **Save and Deploy**. Cloudflare akan secara otomatis mengunduh pustaka yang diperlukan, menjalankan proses kompilasi (*build*) Astro, dan menerbitkan situs Anda ke jaringan global dalam waktu singkat.
:::

## Continuous Deployment

Setelah pengaturan selesai, Anda tidak perlu lagi melakukan *deployment* secara manual. Setiap kali Anda melakukan *push* perubahan kode (baik itu menambah artikel blog baru, memperbarui dokumentasi, atau mengubah tata letak) ke cabang utama di GitHub, Cloudflare Pages akan secara otomatis memicu proses *re-build* dan memperbarui isi situs secara langsung tanpa gangguan layanan.
