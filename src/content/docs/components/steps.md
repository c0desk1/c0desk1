---
slug: "steps"
title: "Steps"
description: "Steps digunakan untuk membuat panduan langkah-demi-langkah dengan penomoran otomatis."
category: "Components"
order: 3
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T02:35:00Z
seo:
  title: "Steps — Komponen Kustom"
  description: "Steps digunakan untuk membuat panduan langkah-demi-langkah dengan penomoran otomatis."
  noIndex: true
---

Steps digunakan untuk membuat panduan langkah-demi-langkah dengan penomoran otomatis. Cocok untuk tutorial, panduan instalasi, atau prosedur yang membutuhkan urutan jelas.

## Sintaks

Gunakan `:::steps` sebagai pembungkus. Di dalamnya, tulis ordered list (`1.`, `2.`, `3.`, dst) untuk setiap langkah.

Setiap langkah bisa berisi paragraf, list, code block, heading, atau inline code — semuanya opsional.

```md
:::steps
1.  Step 1
<!-- Beri jarak 1 line agar tidak dianggap judul --> <!-- [!code ++] -->
    isi steps

2. ## Step 2
   isi steps

3. `Step 3`
    - isi steps
    - isi steps
4.  Step 4
    isi steps
:::
```

### Variasi Penulisan

| Variasi | Contoh | Keterangan |
|---------|--------|------------|
| Teks biasa | `1. Step 1` | Judul berupa teks biasa |
| Heading | `2. ## Step 2` | Judul berupa heading (lebih besar) |
| Inline code | `3. Step 3` | Judul berupa inline code |
| Tanpa judul | `4.` | Langsung konten tanpa judul |

## Preview

:::steps
1. Step 1
  
   isi steps

2. ## Step 2
   isi steps

3. `Step 3`
    - isi steps
    - isi steps
4.  Step 4
    isi steps
:::

## Aturan Penulisan

| Aturan | Keterangan |
|--------|------------|
| Pembungkus | Gunakan `:::steps` dan tutup dengan `:::` |
| Setiap langkah | Tulis sebagai ordered list (`1.`, `2.`, `3.`, dst) |
| Judul | Opsional — bisa teks biasa, heading (`##`/`###`), atau inline code |
| Konten | Bisa berupa paragraf, list, code block, atau komponen lain |
| Indentasi | Gunakan indentasi 2 atau 4 spasi untuk konten di dalam langkah |

## Catatan

- Penomoran akan muncul secara otomatis (`1.`, `2.`, `3.`, dst)
- Judul langkah bersifat opsional — bisa diisi atau dikosongi
- Steps bisa berisi callout, code block, list, atau komponen lain di dalamnya
- Steps adalah komponen block, jadi harus ditulis di baris sendiri