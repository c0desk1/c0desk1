---
slug: "components"
title: "Komponen Kustom"
description: "Pengenalan tentang sistem komponen kustom berbasis Sätteri untuk memperkaya konten Markdown."
category: "Components"
order: 1
draft: false
author:
  name: Tim Unloyd
  role: Develover
  url: https://c0desk1.my.id/
  email: hello@c0deski.my.id
lastUpdated: 2026-08-09T02:27:00Z
seo:
  title: "Komponen Kustom — Pengenalan"
  description: "Pengenalan sistem komponen kustom berbasis Sätteri untuk memperkaya konten Markdown."
  noIndex: true
---

Komponen kustom adalah fitur yang memungkinkan kamu menulis konten Markdown dengan sintaks sederhana yang otomatis berubah menjadi elemen HTML yang kaya dan interaktif.

## Apa Itu Custom Directives?

Custom directives adalah ekstensi sintaks Markdown yang dimulai dengan:

- Block directives: `:::` atau `::` (di baris sendiri)
- Inline directives: `:` (di dalam paragraf)

Saat konten di-render, Sätteri akan mengubah directive tersebut menjadi komponen HTML yang sudah dilengkapi dengan styling dan fungsionalitas.

Contoh sederhana:

```md
> [!NOTE]
> Ini adalah catatan penting.
```

Akan menjadi:

> [!NOTE]
> Ini adalah catatan penting.

## Mengapa Pakai Custom Directives?

Kelebihan:
- Markdown Murni: Kamu tetap menulis Markdown, tidak perlu HTML atau JSX
- Tanpa Import: Tidak perlu import komponen di setiap file
- Konsisten: Semua komponen memiliki tampilan yang seragam
- Cepat: Diproses di build time, tidak ada JavaScript di sisi klien
- Fleksibel: Bisa digunakan di file .md dan .mdx

## Jenis Komponen

Komponen kustom di website ini terbagi menjadi tiga jenis:

### 1. Block Components (`:::` / `::`)

Komponen yang berdiri sendiri di level blok.

- Callout: `> [!NOTE]` — Menyorot informasi penting
- Steps: `:::steps` — Panduan langkah-demi-langkah
- Tabs: `::::tabs` — Konten dalam tab
- Filetree: `:::filetree` — Struktur folder dan file
- Accordion: `:::details` — Konten yang bisa dilipat
- Video: `::video[...]` — Embed video

### 2. Inline Components (`:`)

Komponen yang bisa digunakan di dalam paragraf atau teks.

- User: `:user[...]` — Profil pengguna dengan avatar
- Badge: `:badge[...]` — Label kecil dengan warna
- Button: `:button[...]` — Tombol dengan ikon

### 3. Media Components

- Figure: `![alt](url){caption}` — Gambar dengan caption

## Mulai Menggunakan

Kunjungi halaman berikutnya untuk melihat panduan lengkap setiap komponen beserta contoh penggunaannya.

[📖 Lihat Semua Komponen →](/docs/components/custom-directives)