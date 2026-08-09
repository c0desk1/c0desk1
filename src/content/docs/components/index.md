---
slug: "components"
title: "Komponen Kustom"
description: "Ikhtisar semua komponen kustom berbasis Sätteri yang tersedia di website ini."
category: "Components"
order: 1
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T02:27:00Z
seo:
  title: "Komponen Kustom — Ikhtisar"
  description: "Ikhtisar semua komponen kustom berbasis Sätteri: callout, steps, tabs, filetree, accordion, user, badge, button, figure, dan video."
  noIndex: true
---

Komponen kustom adalah fitur yang memungkinkan kamu menulis konten Markdown dengan sintaks sederhana yang otomatis berubah menjadi elemen HTML yang kaya dan interaktif.

## Apa Itu Custom Directives?

Custom directives adalah ekstensi sintaks Markdown yang dimulai dengan:

- Block directives: `:::` atau `::` (di baris sendiri)
- Inline directives: `:` (di dalam paragraf)

Saat konten di-render, Sätteri akan mengubah directive tersebut menjadi komponen HTML yang sudah dilengkapi dengan styling dan fungsionalitas.

## Kelebihan

- Markdown murni — tidak perlu HTML atau JSX
- Tanpa import — tidak perlu import komponen di setiap file
- Konsisten — semua komponen memiliki tampilan yang seragam
- Cepat — diproses di build time, tidak ada JavaScript di sisi klien
- Fleksibel — bisa digunakan di file .md dan .mdx

## Daftar Komponen

### Block Components `:::` / `::`

Komponen yang berdiri sendiri di level blok.

| Komponen | Sintaks | Fungsi |
|----------|---------|--------|
| Callout | `> [!NOTE]` | Menyorot informasi penting |
| Steps | `:::steps` | Panduan langkah-demi-langkah |
| Tabs | `::::tabs` | Konten dalam tab |
| Filetree | `:::filetree` | Struktur folder dan file |
| Accordion | `:::details` | Konten yang bisa dilipat |
| Video | `::video[...]` | Embed video |

### Inline Components (:)

Komponen yang bisa digunakan di dalam paragraf atau teks.

| Komponen | Sintaks | Fungsi |
|----------|---------|--------|
| User | `:user[...]` | Profil pengguna dengan avatar |
| Badge | `:badge[...]` | Label kecil dengan warna |
| Button | `:button[...]` | Tombol dengan ikon |

### Media Components

| Komponen | Sintaks | Fungsi | Halaman |
|----------|---------|--------|---------|
| Figure | `![alt](url){caption}` | Gambar dengan caption | [Figure](/docs/components/figure) |

## Mulai Menggunakan

:::card[Callout]{icon="info" href="/docs/callout/"}
Mulai dengan Callout untuk menyorot informasi penting.
:::

:::card[Steps]{icon="info" href="/docs/steps/"}
Gunakan Steps untuk membuat panduan langkah-demi-langkah.
:::

:::card[Tabs]{icon="info" href="/docs/tabs/"}
Pelajari Tabs untuk menampilkan konten dalam tab.
:::