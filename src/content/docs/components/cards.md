---
slug: "cards"
title: "Cards"
description: "Card digunakan untuk menampilkan kotak informasi dengan ikon, judul, dan konten."
category: "Components"
order: 11
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T03:00:00Z
seo:
  title: "Cards"
  description: "Card digunakan untuk menampilkan kotak informasi dengan ikon, judul, dan konten."
  noIndex: true
---

Card digunakan untuk menampilkan kotak informasi dengan ikon, judul, dan konten. Cocok untuk menampilkan ringkasan, fitur, tautan, atau konten yang ingin ditonjolkan.

## Preview

:::card[Judul Card]
Ini adalah konten di dalam card.
:::

:::card[Judul Card]{icon="info"}
Card dengan ikon dan judul.
:::

:::card{icon="star"}
Card tanpa judul, hanya ikon dan konten.
:::

:::card
Card minimalis tanpa ikon dan judul.
:::

## Sintaks

Gunakan `:::card[Judul]` dengan atribut opsional:

```md
:::card[Judul Card]
Konten di dalam card.
:::

:::card[Judul Card]{icon="info"}
Card dengan ikon dan judul.
:::

:::card[Judul Card]{href="/docs/card"}
Card yang bisa diklik.
:::

:::card{icon="star"}
Card tanpa judul.
:::

:::card
Card minimalis.
:::
```

## Penggunaan

### Card Dasar

Card paling sederhana dengan judul dan konten.

:::card[Judul Card]
Ini adalah konten di dalam card.
:::

### Card dengan Ikon
Tambahkan ikon menggunakan atribut `icon`.

:::card[Judul Card]{icon="info"}
Card dengan ikon dan judul.
:::

### Card Tanpa Judul
Card dengan ikon dan konten, tanpa judul.

:::card{icon="star"}
Card tanpa judul, hanya ikon dan konten.
:::

### Card Minimalis
Card tanpa ikon dan judul, hanya konten.

:::card
Card minimalis tanpa ikon dan judul.
:::

### Card dengan Link
Gunakan atribut `href` untuk membuat seluruh card menjadi link.

:::card[Judul Card]{href="/docs/components/card"}
Card ini bisa diklik dan mengarah ke halaman Card.
:::

## Atribut

Card menerima properti berikut:

### `icon`

**Tipe:** `string`

**Wajib:** Tidak

Nama ikon yang ditampilkan di header card.

Ikon yang tersedia: `star`, `info`, `link`, `book`, `learn`, `book-2`.

Lihat [Icons](/docs/icons/) untuk daftar ikon lengkap.

### `href`

**Tipe:** `string`

**Wajib:** Tidak

URL tujuan. Jika diberikan, seluruh card menjadi link yang bisa diklik.

### `class`

**Tipe:** `string`

**Wajib:** Tidak

Class CSS tambahan untuk kustomisasi styling.

## Variasi

| Variasi | Sintaks | Struktur |
| :--- | :--- | :--- |
| Lengkap | `:::card[Judul]{icon="star"}` | Ikon + Judul + Body |
| Tanpa Ikon | `:::card[Judul]` | Judul + Body |
| Tanpa Judul | `:::card{icon="info"} | Ikon + Body |
| Minimal | `:::card` | Body saja |

## Catatan

- Judul ditulis di dalam `[]` setelah `card`
- Jika `href` diberikan, seluruh card menjadi link yang bisa diklik
- Card bersifat block, harus ditulis di baris sendiri
- Ikon akan muncul di atas judul
- Card bisa berisi paragraf, list, code block, atau komponen lain di dalamnya
- Untuk menampilkan beberapa card bersebelahan, gunakan grid atau flexbox manual

## Lihat Juga

- [Icon](/docs/icons/) — Ikon SVG dengan berbagai ukuran
- [Badge](/docs/badge/) — Label kecil dengan warna
- [Button](/docs/button/) — Tombol dengan ikon
- [Callout](/docs/callout/) — Menyorot informasi penting
