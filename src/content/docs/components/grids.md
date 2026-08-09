---
slug: "grids"
title: "Grids"
description: "Grid digunakan untuk membuat layout 2 kolom yang responsif untuk komponen."
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
  description: "Grid digunakan untuk membuat layout 2 kolom yang responsif untuk komponen."
  noIndex: true
---

Grid digunakan untuk membuat layout 2 kolom yang responsif. Cocok untuk menampilkan card, callout, atau komponen lain secara berdampingan.

## Preview

::::grid
:::card[Judul Card]{icon="info"}
Card dengan ikon dan judul.
:::

:::card[Judul Card]{icon="info"}
Card dengan ikon dan judul.
:::
::::

## Sintaks

```md
::::grid
:::card[Judul Card]{icon="info"}
Konten card 1
:::

:::card[Judul Card]{icon="info"}
Konten card 2
:::
::::
```

Grid otomatis membagi child menjadi 2 kolom. Di mobile, menjadi 1 kolom.

## Aturan

- Grid hanya untuk membungkus komponen (`card, callout, dll`)
- Tidak ada atribut tambahan (default 2 kolom, gap `1rem`)
- Di mobile: 1 kolom, gap `0.75rem`

## Lihat Juga

- [Card](/docs/cards/) — Kotak informasi dengan ikon
- [Callout](/docs/callout/) — Menyorot informasi penting