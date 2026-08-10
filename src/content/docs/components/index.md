---
slug: "custom-components"
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
  description: "Ikhtisar semua komponen kustom berbasis Sätteri: callout, steps, tabs, filetree, accordion, user, badge, button, figure, video, card, dan icon."
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

### Block Components (`:::` / `::`)

Komponen yang berdiri sendiri di level blok.

| Komponen | Sintaks | Fungsi | Halaman |
|----------|---------|--------|---------|
| Callout | `> [!NOTE]` | Menyorot informasi penting | [Callout](/docs/components/callout) |
| Steps | `:::steps` | Panduan langkah-demi-langkah | [Steps](/docs/components/steps) |
| Tabs | `::::tabs` | Konten dalam tab | [Tabs](/docs/components/tabs) |
| Filetree | `:::filetree` | Struktur folder dan file | [Filetree](/docs/components/filetree) |
| Accordion | `:::details` | Konten yang bisa dilipat | [Accordion](/docs/components/accordion) |
| Video | `::video[...]` | Embed video | [Video](/docs/components/video) |
| Card | `:::card` | Kotak informasi dengan ikon dan link | [Card](/docs/components/card) |

### Inline Components (`:`)

Komponen yang bisa digunakan di dalam paragraf atau teks.

| Komponen | Sintaks | Fungsi | Halaman |
|----------|---------|--------|---------|
| User | `:user[...]` | Profil pengguna dengan avatar | [User](/docs/components/user) |
| Badge | `:badge[...]` | Label kecil dengan warna | [Badge](/docs/components/badge) |
| Button | `:button[...]` | Tombol dengan ikon | [Button](/docs/components/button) |
| Icon | `:icon[...]` | Ikon SVG dengan berbagai ukuran | [Icon](/docs/components/icon) |

### Media Components

| Komponen | Sintaks | Fungsi | Halaman |
|----------|---------|--------|---------|
| Figure | `![alt](url){caption}` | Gambar dengan caption | [Figure](/docs/components/figure) |

## Mulai Menggunakan

Pilih salah satu komponen dari daftar di atas untuk mulai belajar. Berikut beberapa rekomendasi untuk memulai:

:::card[Callout]{icon="info" href="/docs/components/callout"}
Mulai dengan Callout untuk menyorot informasi penting.
:::

:::card[Steps]{icon="star" href="/docs/components/steps"}
Gunakan Steps untuk membuat panduan langkah-demi-langkah.
:::

:::card[Tabs]{icon="link" href="/docs/components/tabs"}
Pelajari Tabs untuk menampilkan konten dalam tab.
:::

:::card[Icon]{icon="sparkle" href="/docs/components/icon"}
Tambahkan ikon ke dalam konten dengan Icon.
:::

:::card[Card]{icon="star" href="/docs/components/card"}
Pelajari cara membuat Card untuk menampilkan informasi.
:::
