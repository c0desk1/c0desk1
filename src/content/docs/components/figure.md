---
slug: "figure"
title: "Figure"
description: "Figure digunakan untuk menampilkan gambar dengan caption yang mendukung Markdown."
category: "Components"
order: 10
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T11:21:00Z
seo:
  title: "Figure — Komponen Kustom"
  description: "Figure digunakan untuk menampilkan gambar dengan caption yang mendukung Markdown."
  noIndex: true
---

Figure digunakan untuk menampilkan gambar dengan caption. Caption ditulis di dalam kurung kurawal `{...}` setelah URL gambar.

## Sintaks

Tulis gambar seperti biasa dengan `![alt](url)`, lalu tambahkan caption di dalam `{...}`:

```md
![Gambar bagus](https://placehold.co/600x400){Ini adalah caption gambar}
```

## Preview

![Gambar bagus](https://placehold.co/600x400){Ini adalah caption gambar}

## Atribut

Figure tidak memiliki atribut tambahan. Cukup tulis caption di dalam `{...}`.

## Catatan

- Caption ditulis di dalam `{...}` setelah URL gambar
- Caption tidak mendukung Markdown: bold `**text**`, italic `*text*`, dan link `[text](url)`
- Gambar akan otomatis dibungkus dengan `<figure>` jika ada caption
- Jika tidak ada caption, gambar tetap `<img>` biasa
- Caption bersifat opsional — bisa dihilangkan kapan saja
- Figure adalah komponen block, jadi harus ditulis di baris sendiri

## Lihat Juga

- [Video](/docs/video/) — Embed video dari YouTube, Vimeo, atau lokal
- [Callout](/docs/callout/) — Menyorot informasi penting
- [Steps](/docs/steps/) — Panduan langkah-demi-langkah