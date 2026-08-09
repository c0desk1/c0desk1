---
slug: "icons"
title: "Icons"
description: "Icon digunakan untuk menampilkan ikon SVG dengan berbagai ukuran."
category: "Components"
order: 12
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T02:55:00Z
seo:
  title: "Icons"
  description: "Icon digunakan untuk menampilkan ikon SVG dengan berbagai ukuran."
  noIndex: true
---

Icon digunakan untuk menampilkan ikon SVG dengan berbagai ukuran. Cocok untuk menambahkan ikon di dalam teks, tombol, atau sebagai elemen dekoratif.

## Preview

:icon[star] :icon[star]{size="lg"} :icon[star]{size="sm"}

:icon[github] :icon[twitter] :icon[youtube]

## Sintaks

Gunakan `:icon[nama]` dengan atribut ukuran:

```md
:icon[star]

:icon[star]{size="lg"}

:icon[github]{size="sm"}

Klik :icon[arrow] untuk melanjutkan.

```

## Penggunaan

### Ikon Dasar

Ikon dengan ukuran default `md`.

:icon[star] :icon[info] :icon[check]

### Ikon dengan Ukuran

Atur ukuran menggunakan atribut `size`.

| Ukuran | Preview |
|--------|------------|
| `sm` | :icon[star]{size="sm"} |
| `md` | :icon[star]{size="md"} |
| `lg` | :icon[star]{size="lg"} |

### Ikon di Dalam Teks

Ikon bisa diletakkan di dalam paragraf

## Atribut
Icon menerima properti berikut:

### `size`

**Tipe:** `"sm" | "md" | "lg"`

**Default:** `"md"`

**Wajib:** Tidak

Ukuran ikon.

| Nilai | Ukuran |
|--------|------------|
| `sm` | 0.75rem (12px) |
| `md` | 1rem (16px) |
| `lg` | 1.25rem (20px) |

### `class`

**Tipe:** `string`

**Wajib:** Tidak

Class CSS tambahan untuk kustomisasi styling.

## Catatan

- Nama ikon ditulis di dalam `[]`
- Icon menggunakan SVG mask, konsisten dengan komponen lain (filetree, button, badge, card)
- Ukuran default adalah `md` (1rem / 16px)
- Ikon bersifat inline, bisa diletakkan di dalam paragraf
- Warna ikon mengikuti `currentColor`, bisa diubah dengan CSS

## Lihat Juga

- [Card](/docs/cards/) — Kotak informasi dengan ikon

- [Badge](/docs/badge/) — Label kecil dengan warna

- [Button](/docs/button/) — Tombol dengan ikon

- [Callout](/docs/callout/) — Menyorot informasi penting
