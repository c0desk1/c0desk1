---
slug: tech-stack
title: "Tech Stack"
description: "Rincian lapisan teknologi, perangkat lunak, dan arsitektur yang menopang operasional situs Unloyd."
category: "Getting Started"
order: 2
seo:
  title: "Tech Stack & Arsitektur Sistem | Unloyd Docs"
  description: "Penjelasan mendalam mengenai framework, sistem manajemen konten, dan prosesor kustom yang digunakan pada situs Unloyd."
  noIndex: true
draft: false
lastUpdated: 2026-08-10T14:40:00Z
---

Dalam membangun **Unloyd**, prinsip utama yang dipegang adalah **kesederhanaan, kecepatan, dan efisiensi**. Situs ini tidak dirancang dengan tumpukan teknologi yang berlebihan atau membebani peramban pengguna. Setiap perangkat yang dipilih memiliki peran spesifik untuk memastikan seluruh artikel, arsip modding, dan catatan teknis dapat disajikan secara instan.

Berikut adalah rincian tumpukan teknologi (*tech stack*) yang menjadi fondasi Unloyd:

## 1. Inti Kerangka Kerja (Core Framework)

Unloyd dibangun menggunakan **Astro**. Pilihan ini diambil karena arsitektur Astro menerapkan prinsip *Zero JavaScript by default*. Sebagian besar halaman dirender sepenuhnya di sisi server saat proses pembuatan situs (*Static Site Generation*). 

Dengan pendekatan ini, peramban pengunjung tidak perlu mengunduh berkas skrip yang berat hanya untuk membaca sebuah artikel atau panduan. Hasilnya adalah waktu muat halaman yang sangat cepat dan pengalaman membaca yang bersih.

---

## 2. Manajemen dan Validasi Konten

Situs ini tidak menggunakan basis data konvensional atau panel admin yang rumit. Seluruh konten—baik artikel blog maupun dokumentasi ini—dikelola melalui sistem **Astro Content Collections** dengan format file Markdown (`.md`) dan MDX (`.mdx`).

Untuk menjaga integritas data, setiap berkas divalidasi secara ketat menggunakan **Zod** saat proses kompilasi (*build time*). Sistem ini memastikan bahwa setiap atribut metadata (seperti judul, tanggal, kategori, dan pengaturan SEO) selalu lengkap dan sesuai dengan skema yang telah ditentukan, sehingga meminimalisir potensi kesalahan pada tautan maupun tata letak.

---

## 3. Pemrosesan Markdown Kustom (Satteri)

Untuk memperkaya pengalaman membaca dan penulisan dokumen, Unloyd tidak mengandalkan parser bawaan yang standar. Kami menggunakan prosesor Markdown kustom bernama **`@astrojs/markdown-satteri`** yang dipadukan dengan berbagai plugin MDAST dan HAST.

Melalui konfigurasi di dalam `astro.config.mjs`, sistem ini memungkinkan penggunaan direktif khusus secara langsung di dalam teks, seperti:
* **Callout & Catatan Khusus:** Menyoroti informasi penting menggunakan kotak penanda (`[!NOTE]`, `[!WARNING]`, dll).
* **Navigasi Tab & Accordion:** Menyusun informasi yang panjang agar lebih ringkas dan interaktif.
* **FileTree & Code Blocks:** Menampilkan struktur direktori berkas dan penyorotan kode (*syntax highlighting*) menggunakan Shiki secara akurat.

---

## 4. Antarmuka dan Pencarian Lokal

* **Tailwind CSS:** Digunakan untuk merancang antarmuka pengguna secara konsisten, responsif, dan mendukung mode gelap secara instan tanpa efek kedip pada peramban.
* **Astro Pagefind:** Menyediakan fitur pencarian instan (*instant search*) yang bekerja secara lokal di sisi klien, memungkinkan pembaca menemukan artikel atau dokumen dengan cepat tanpa memerlukan peladen pencarian eksternal.

---

## 5. Infrastruktur dan Penyebaran (Deployment)

Seluruh aset situs didistribusikan melalui jaringan global **Cloudflare Pages**. Infrastruktur *Edge CDN* ini memastikan bahwa pengunjung dari berbagai wilayah dapat mengakses halaman Unloyd dengan latensi yang sangat rendah serta perlindungan keamanan tingkat lanjut.