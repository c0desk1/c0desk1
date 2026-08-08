---
slug: "callout"
title: "Callout"
description: "Callout digunakan untuk menyorot informasi penting dengan warna dan ikon berbeda."
category: "Components"
order: 2
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T03:20:00Z
seo:
  title: "Callout — Komponen Kustom"
  description: "Callout digunakan untuk menyorot informasi penting dengan warna dan ikon berbeda."
  noIndex: true
---

Callout digunakan untuk menyorot informasi penting dengan warna dan ikon berbeda. Cocok untuk catatan, tips, peringatan, dan informasi penting lainnya.

## Sintaks

Gunakan format blockquote dengan `[!TYPE]` di awal:

```md
> [!NOTE]
> Ini adalah catatan penting.

> [!TIP]
> Gunakan ini untuk hasil lebih baik.

> [!WARNING]
> Jangan lupa backup database.

> [!IMPORTANT]
> Ini sangat penting untuk diperhatikan.

> [!CAUTION]
> Hati-hati dengan langkah ini.

> [!DANGER]
> Ini berbahaya.
```

## Preview

> [!NOTE]
> Ini adalah catatan penting.

> [!TIP]
> Gunakan ini untuk hasil lebih baik.

> [!WARNING]
> Jangan lupa backup database.

> [!IMPORTANT]
> Ini sangat penting untuk diperhatikan.

> [!CAUTION]
> Hati-hati dengan langkah ini.

> [!DANGER]
> Ini berbahaya.

## Varian

| Varian | Warna | Ikon | Cocok untuk |
|--------|-------|------|-------------|
| `NOTE` | Muted | ℹ️ | Informasi umum |
| `TIP` | Aksen | 💡 | Tips dan saran |
| `IMPORTANT` | Ungu | ⭐ | Hal penting |
| `WARNING` | Kuning | ⚠️ | Peringatan |
| `CAUTION` | Oranye | 🚨 | Hati-hati |
| `DANGER` | Merah | 🔥 | Berbahaya |

## Atribut

Callout tidak memiliki atribut tambahan. Cukup tulis `[!TYPE]` di awal blockquote.

## Catatan

- Tipe callout harus ditulis dengan huruf kapital: `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`, `DANGER`
- Spasi setelah `>` dan `[!TYPE]` bersifat opsional
- Konten bisa terdiri dari beberapa paragraf
- Callout juga bisa berisi list, code block, dan komponen lain di dalamnya
- Callout adalah komponen block, jadi harus ditulis di baris sendiri