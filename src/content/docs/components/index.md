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

# Komponen Kustom

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

| Komponen | Sintaks | Fungsi | Halaman |
|----------|---------|--------|---------|
| Callout | `> [!NOTE]` | Menyorot informasi penting | [Callout](/docs/components/callout) |
| Steps | `:::steps` | Panduan langkah-demi-langkah | [Steps](/docs/components/steps) |
| Tabs | `::::tabs` | Konten dalam tab | [Tabs](/docs/components/tabs) |
| Filetree | `:::filetree` | Struktur folder dan file | [Filetree](/docs/components/filetree) |
| Accordion | `:::details` | Konten yang bisa dilipat | [Accordion](/docs/components/accordion) |
| Video | `::video[...]` | Embed video | [Video](/docs/components/video) |

### Inline Components (:)

Komponen yang bisa digunakan di dalam paragraf atau teks.

| Komponen | Sintaks | Fungsi | Halaman |
|----------|---------|--------|---------|
| User | `:user[...]` | Profil pengguna dengan avatar | [User](/docs/components/user) |
| Badge | `:badge[...]` | Label kecil dengan warna | [Badge](/docs/components/badge) |
| Button | `:button[...]` | Tombol dengan ikon | [Button](/docs/components/button) |

### Media Components

| Komponen | Sintaks | Fungsi | Halaman |
|----------|---------|--------|---------|
| Figure | `![alt](url){caption}` | Gambar dengan caption | [Figure](/docs/components/figure) |

## Mulai Menggunakan

Pilih salah satu komponen dari daftar di atas untuk melihat panduan lengkap, sintaks, dan contoh penggunaan.