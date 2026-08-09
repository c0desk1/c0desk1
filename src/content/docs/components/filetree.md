---
slug: "filetree"
title: "Filetree"
description: "Filetree digunakan untuk menampilkan struktur folder dan file dengan ikon, highlight, dan komentar."
category: "Components"
order: 5
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T02:40:00Z
seo:
  title: "Filetree — Komponen Kustom"
  description: "Filetree digunakan untuk menampilkan struktur folder dan file dengan ikon, highlight, dan komentar."
  noIndex: true
---

Filetree digunakan untuk menampilkan struktur folder dan file dengan ikon, highlight, dan komentar. Cocok untuk dokumentasi struktur proyek, folder, atau kode.

## Sintaks

Gunakan `:::filetree` sebagai pembungkus, lalu tulis struktur folder/file sebagai list (`-`).

```md
:::filetree
- src/
  - components/
    - Header.astro
    - Footer.astro
  - pages/
    - index.astro
    - blog/
      - [...slug].astro
- package.json
- **README.md** # highlight
- ...
:::
```

## Preview

:::filetree
- src/
  - components/
    - Header.astro
    - Footer.astro
  - pages/
    - index.astro
    - blog/
      - [...slug].astro
- package.json
- **README.md** # highlight
- ...
:::

## Fitur

| Fitur | Sintaks | Contoh | Keterangan |
|-------|---------|--------|------------|
| Folder | `nama/` | `src/` | Diakhiri dengan slash (`/`) |
| File | `nama.ext` | `Header.astro` | Memiliki ekstensi |
| Highlight | `**nama**` | `**README.md**` | Menggunakan bold |
| Komentar | `# komentar` | `# highlight` | Setelah nama file |
| Komentar | `// komentar` | `// config` | Setelah nama file |
| Placeholder | `...` | `...` | Menandakan konten disembunyikan |
| Indentasi | Spasi 2 atau 4 | `  -` | Menentukan hierarki |

## Aturan Penulisan

| Aturan | Keterangan |
|--------|------------|
| Pembungkus | Gunakan `:::filetree` dan tutup dengan `:::` |
| Setiap item | Tulis sebagai list (`- nama`) |
| Folder | Akhiri dengan `/` (contoh: `src/`) |
| File | Akhiri dengan ekstensi (contoh: `index.astro`) |
| Highlight | Bungkus dengan `**` (contoh: `**README.md**`) |
| Komentar | Gunakan `#` atau `//` setelah nama |
| Indentasi | Gunakan 2 atau 4 spasi untuk menunjukkan hierarki |

## Catatan

- Filetree akan menampilkan ikon folder/file secara otomatis
- Folder yang memiliki child akan menjadi `<details>` (bisa dibuka/tutup)
- Placeholder (`...`) tidak memiliki ikon
- Highlight akan memberi warna aksen pada item
- Komentar akan tampil dengan warna muted
- Filetree adalah komponen block, jadi harus ditulis di baris sendiri

## Lihat Juga

- [Tabs](/docs/tabs/) — Konten dalam tab
- [Accordion](/docs/accordion/) — Konten yang bisa dilipat
- [Steps](/docs/steps/) — Panduan langkah-demi-langkah