---
slug: "card"
title: "Card"
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
  title: "Card — Komponen Kustom"
  description: "Card digunakan untuk menampilkan kotak informasi dengan ikon, judul, dan konten."
  noIndex: true
---

# Card

Card digunakan untuk menampilkan kotak informasi dengan ikon, judul, dan konten. Cocok untuk menampilkan ringkasan, fitur, atau tautan ke halaman lain.

## Sintaks

Gunakan `:::card[Judul]` dengan atribut opsional:

```md
:::card[Judul Card]
Ini adalah konten di dalam card.
:::

:::card[Judul Card]{icon="star"}
Ini adalah konten dengan ikon.
:::

:::card[Judul Card]{href="/docs/card/"}
Card ini bisa diklik dan mengarah ke halaman Card.
:::

:::card{icon="info"}
Card tanpa judul, hanya ikon dan konten.
:::

:::card
Card tanpa ikon dan judul, hanya konten.
:::
```

## Preview

:::card[Judul Card]
Ini adalah konten di dalam card.
:::

:::card[Judul Card]{icon="star"}
Ini adalah konten dengan ikon.
:::

:::card[Judul Card]{href="/docs/card/"}
Card ini bisa diklik dan mengarah ke halaman Card.
:::

:::card{icon="info"}
Card tanpa judul, hanya ikon dan konten.
:::

:::card
Card tanpa ikon dan judul, hanya konten.
:::

## Variasi

| Variasi | Sintaks | Preview |
|---------|---------|---------|
| Lengkap | `:::card[Judul]{icon="star"}` | Ikon + Judul + Body |
| Tanpa Ikon | `:::card[Judul]` | Judul + Body |
| Tanpa Judul | `:::card{icon="info"}` | Ikon + Body |
| Minimal | `:::card` | Body saja |

## Atribut

| Atribut | Wajib | Fungsi |
|---------|-------|--------|
| `icon` | ❌ | Ikon di header (star, info, link, dll) |
| `href` | ❌ | URL tujuan (card menjadi link) |
| `class` | ❌ | Menambahkan class CSS tambahan |

## Ikon yang Tersedia

| Ikon | Nama | Preview |
|------|------|---------|
| Bintang | `star` | :icon[star] |
| Informasi | `info` | :icon[info] |
| Link | `link` | :icon[link] |

> Untuk daftar ikon lengkap, lihat [Icon](/docs/components/icon).

## Catatan

- Judul ditulis di dalam `[]` setelah `card`
- Jika `href` diberikan, seluruh card menjadi link
- Card bersifat block, harus ditulis di baris sendiri
- Ikon akan muncul di atas judul
- Card bisa berisi paragraf, list, code block, atau komponen lain di dalamnya

## Lihat Juga

- [Icon](/docs/components/icon) — Ikon SVG dengan berbagai ukuran
- [Badge](/docs/components/badge) — Label kecil dengan warna
- [Button](/docs/components/button) — Tombol dengan ikon
- [Callout](/docs/components/callout) — Menyorot informasi penting