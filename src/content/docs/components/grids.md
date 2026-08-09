---
slug: "grids"
title: "Grids"
description: "Grid digunakan untuk membuat layout multi-kolom yang responsif."
category: "Components"
order: 13
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T03:00:00Z
seo:
  title: "Grids"
  description: "Grid digunakan untuk membuat layout multi-kolom yang responsif."
  noIndex: true
---

Grid digunakan untuk membuat layout multi-kolom yang responsif. Cocok untuk menampilkan card, fitur, atau konten dalam beberapa kolom.

## Preview

::::grid{cols="2" gap="4"}
:::col
**Kolom 1**

Ini adalah konten kolom pertama.
:::
:::col
**Kolom 2**

Ini adalah konten kolom kedua.
:::
::::

## Sintaks

Gunakan `::::grid` dengan atribut `cols` dan `gap`, lalu `:::col` untuk setiap kolom.

```md
::::grid{cols="2" gap="4"}
:::col
Kolom 1

Konten kolom pertama.
:::

:::col
Kolom 2

Konten kolom kedua.
:::
::::
```

## Penggunaan

### Grid 2 Kolom
::::grid{cols="2" gap="4"}
:::col
Kolom 1

Ini adalah konten kolom pertama.
:::

:::col
Kolom 2

Ini adalah konten kolom kedua.
:::
::::

### Grid 3 Kolom
::::grid{cols="3" gap="4"}
:::col
Kolom 1

Konten kolom 1.
:::

:::col
Kolom 2

Konten kolom 2.
:::

:::col
Kolom 3

Konten kolom 3.
:::
::::

## Grid dengan Card di Dalamnya
Untuk menempatkan card di dalam grid, hilangkan penutup `:::` pada `:::col` agar tidak bentrok dengan nested directive.

```md
::::grid{cols="2" gap="4"}
:::col
:::card[Judul Card]{icon="info"}
Card dengan ikon dan judul.
:::

:::col
:::card[Judul Card]{icon="info"}
Card dengan ikon dan judul.
:::
::::
```
### Preview
::::grid{cols="2" gap="4"}
:::col
:::card[Judul Card]{icon="info"}
Card dengan ikon dan judul.
:::

:::col
:::card[Judul Card]{icon="info"}
Card dengan ikon dan judul.
:::
::::

## Atribut
Grid menerima properti berikut:

### `cols`
**Tipe:** `"1" | "2" | "3" | "4" | "5" | "6"`

**Default:** `"2"`

**Wajib:** Tidak

Jumlah kolom dalam grid.

| Nilai | Kolom |
| ---- | ---- |
| `1` | 1 Kolom |
| `2` | 2 Kolom |
| `3` | 3 Kolom |
| `4` | 4 Kolom |
| `5` | 5 Kolom |
| `6` | 6 Kolom |

### `gap`
**Tipe:** `"1" | "2" | "3" | "4" | "6" | "8"`

**Default:** `"4"`

**Wajib:** Tidak

Jarak antar kolom.

| Nilai | Ukuran |
| ---- | ---- |
| `1` | 0.25rem |
| `2` | 0.5rem |
| `3` | 0.75rem |
| `4` | 1rem |
| `5` | 1.5rem |
| `6` | 2rem |

### `class`
**Tipe:** string

**Wajib:** Tidak

Class CSS tambahan untuk kustomisasi styling.

## Catatan Penting
- Grid bersifat responsif: pada layar kecil (<768px), semua kolom akan menjadi satu kolom
- Setiap kolom `:::col` bisa berisi paragraf, list, gambar, card, atau komponen lain
- Grid adalah komponen block, harus ditulis di baris sendiri
- Penutup `:::col`:

    - Jika isi kolom hanya teks biasa (paragraf, list, gambar, dll), kamu bisa menutup dengan `:::`.
    - Jika isi kolom mengandung directive lain (seperti `:::card`), hilangkan penutup `:::` pada `:::col` agar tidak bentrok dengan penutup directive di dalamnya.

## Lihat Juga
- [Card](/docs/cards/) — Kotak informasi dengan ikon
- [Callout](/docs/callout/) — Menyorot informasi penting
- [Steps](/docs/steps/) — Panduan langkah-demi-langkah
