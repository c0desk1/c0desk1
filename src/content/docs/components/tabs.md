---
slug: "tabs"
title: "Tabs"
description: "Tabs digunakan untuk menampilkan konten dalam tab yang bisa dipilih."
category: "Components"
order: 4
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T11:35:00Z
seo:
  title: "Tabs — Komponen Kustom"
  description: "Tabs digunakan untuk menampilkan konten dalam tab yang bisa dipilih."
  noIndex: true
---

# Tabs

Tabs digunakan untuk menampilkan konten dalam tab yang bisa dipilih. Cocok untuk menampilkan kode dalam berbagai bahasa, dokumentasi multi-versi, atau konten yang dikelompokkan.

## Sintaks

Gunakan `::::tabs` sebagai pembungkus, dan `:::tab[label]` untuk setiap tab:

```md
::::tabs
:::tab[npm]
npm install astro
:::
:::tab[pnpm]
pnpm add astro
:::
:::tab[yarn]
yarn add astro
:::
::::
```

## Preview

::::tabs
:::tab[npm]
npm install astro
:::
:::tab[pnpm]
pnpm add astro
:::
:::tab[yarn]
yarn add astro
:::
::::

## Aturan Penulisan

| Aturan | Keterangan |
| :--- | :--- |
| Pembungkus | Gunakan `::::tabs` 4 titik dua dan tutup dengan `::::` |
| Setiap tab | Gunakan `:::tab[label]` 3 titik dua |
| Label tab | Ditulis didalam `[]` setelah `tab` |
| Konten tab | Bisa berupa teks, code block, list dan komponen lainnya |

## Atribut
Tabs tidak memiliki atribut tambahan. Cukup tulis label tab di dalam `[]`.

## Catatan
Tab pertama akan aktif secara default
- Label tab bisa berupa teks biasa atau inline code
- Setiap tab bisa berisi konten yang berbeda-beda
- Tabs bisa berisi callout, code block, list, atau komponen lain di dalamnya
- Tabs bersifat interaktif: klik tab untuk berpindah
- Tabs adalah komponen block, jadi harus ditulis di baris sendiri

## Lihat Juga

- [Steps](/docs/steps/) — Panduan langkah-demi-langkah
- [Accordion](/docs/accordio/) — Konten yang bisa dilipat
- [Callout](/docs/callout/) — Menyorot informasi penting