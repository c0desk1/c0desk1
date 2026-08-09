---
slug: "icon"
title: "Icon"
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
  title: "Icon — Komponen Kustom"
  description: "Icon digunakan untuk menampilkan ikon SVG dengan berbagai ukuran."
  noIndex: true
---

Icon digunakan untuk menampilkan ikon SVG dengan berbagai ukuran. Cocok untuk menambahkan ikon di dalam teks, tombol, atau sebagai elemen dekoratif.

## Sintaks

Gunakan `:icon[name]` dengan atribut ukuran:

```md
:icon[star] 

:icon[star]{size="sm"}

:icon[star]{size="md"}

:icon[star]{size="lg"}

Klik :icon[arrow] untuk melanjutkan.

```

## Preview

:icon[star]

:icon[star]{size="sm"}

:icon[star]{size="md"}

:icon[star]{size="lg"}

Klik :icon[arrow] untuk melanjutkan.

## Ukuran

| Ukuran | Keterangan |
|--------|------------|
| `sm` | Kecil (0.75rem) |
| `md` | Sedang (1rem) — default |
| `lg` | Besar (1.25rem) |

## Daftar Ikon

| Nama | Preview | Nama | Preview |
|------|---------|------|---------|
| `star` | :icon[star] | `arrow` | :icon[arrow] |
| `check` | :icon[check] | `cross` | :icon[cross] |
| `info` | :icon[info] | `warning` | :icon[warning] |
| `fire` | :icon[fire] | `sparkle` | :icon[sparkle] |
| `github` | :icon[github] | `twitter` | :icon[twitter] |
| `youtube` | :icon[youtube] | `home` | :icon[home] |
| `search` | :icon[search] | `menu` | :icon[menu] |
| `close` | :icon[close] | `download` | :icon[download] |
| `upload` | :icon[upload] | `copy` | :icon[copy] |
| `link` | :icon[link] | `external` | :icon[external] |
| `code` | :icon[code] | `terminal` | :icon[terminal] |
| `server` | :icon[server] | `cloud` | :icon[cloud] |
| `database` | :icon[database] | | |

## Atribut

| Atribut | Wajib | Fungsi |
|---------|-------|--------|
| `size` | ❌ | Ukuran ikon (`sm`, `md`, `lg`) |
| `class` | ❌ | Menambahkan class CSS tambahan |

## Catatan

- Nama ikon ditulis di dalam `[]`
- Icon menggunakan SVG mask, konsisten dengan filetree, button, dan badge
- Ukuran default adalah `md` (1rem)
- Ikon bersifat inline, bisa diletakkan di dalam paragraf
- Warna ikon mengikuti `currentColor`, bisa diubah dengan CSS

## Lihat Juga

:::card[Badge]{icon="info" href="/docs/badge/}
Label kecil dengan warna
:::

:::card[Button]{icon="info" href="/docs/button/}
Tombol dengan ikon
:::

:::card[Card]{icon="info" href="/docs/card/"}
Kotak informasi dengan ikon
:::