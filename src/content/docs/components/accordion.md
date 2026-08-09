---
slug: "accordion"
title: "Accordion"
description: "Accordion digunakan untuk konten yang bisa dilipat (expand/collapse)."
category: "Components"
order: 6
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T02:40:00Z
seo:
  title: "Accordion — Komponen Kustom"
  description: "Accordion digunakan untuk konten yang bisa dilipat (expand/collapse)."
  noIndex: true
---

Accordion digunakan untuk konten yang bisa dilipat (expand/collapse). Cocok untuk FAQ, detail teknis, atau konten panjang yang bisa disembunyikan.

## Sintaks

Gunakan `:::accordion[Judul]` untuk membuat accordion:

```md
:::accordion[Judul Accordion]
Ini adalah konten yang bisa dilipat.

Bisa berisi paragraf, list, gambar, atau komponen lain.
:::
```

## Preview

:::accordion[Judul Accordion]
Ini adalah konten yang bisa dilipat.

Bisa berisi paragraf, list, gambar, atau komponen lain.
:::

## Aturan Penulisan

| Aturan | Keterangan |
|--------|------------|
| Sintaks | `:::accordion[Judul]` dan tutup dengan `:::` |
| Judul | Ditulis di dalam `[]` setelah `details` |
| Konten | Bisa berupa paragraf, list, code block, gambar, atau komponen lain |

## Catatan

- Accordion terbuka secara default (`open` attribute)
- Judul akan menjadi teks di `<summary>`
- Konten bisa berupa apapun (paragraf, list, code block, gambar, dll)
- Accordion bersifat interaktif: klik judul untuk membuka/menutup
- Accordion adalah komponen block, jadi harus ditulis di baris sendiri

## Lihat Juga

- [Tabs](/docs/tabs/) — Konten dalam tab
- [Filetree](/docs/filetree/) — Struktur folder dan file
- [Steps](/docs/steps/) — Panduan langkah-demi-langkah