---
slug: "video"
title: "Video"
description: "Video digunakan untuk menampilkan video dari YouTube, Vimeo, atau file lokal."
category: "Components"
order: 11
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T11:15:00Z
seo:
  title: "Video — Komponen Kustom"
  description: "Video digunakan untuk menampilkan video dari YouTube, Vimeo, atau file lokal."
  noIndex: true
---

Video digunakan untuk menampilkan video dari YouTube, Vimeo, atau file lokal. Mendukung berbagai platform dan format video.

## Sintaks

Gunakan `::video[url]` dengan atribut opsional:

```md
::video[https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ]
```

## Preview

::video[https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ]

## Platform yang Didukung

| Platform | URL Contoh | Keterangan |
|----------|------------|------------|
| YouTube | `youtube.com/watch?v=ID` | Otomatis di-embed |
| YouTube Shorts | `youtube.com/shorts/ID` | Otomatis di-embed (9:16) |
| YouTube | `youtu.be/ID` | Short URL otomatis di-embed |
| Vimeo | `vimeo.com/123456789` | Otomatis di-embed |
| File Lokal | `/videos/file.mp4` | Menggunakan `<video>` native |

## Atribut

| Atribut | Fungsi |
|---------|--------|
| `width` | Lebar video (default: `100%`) |
| `height` | Tinggi video (default: `400`) |
| `title` | Judul untuk aksesibilitas (default: `"Video embed"`) |

## Catatan

- URL ditulis di dalam `[]`
- YouTube Shorts otomatis dikenali dan di-embed
- Video lokal (`/videos/...`) akan menggunakan elemen `<video>` native
- Video responsif dengan aspect-ratio 16:9
- Tombol fullscreen tersedia di semua platform
- `title` digunakan untuk aksesibilitas screen reader

## Lihat Juga

- [Figure](/docs/figure/) — Gambar dengan caption
- [Callout](/docs/callout/) — Menyorot informasi penting
- [Steps](/docs/steps/) — Panduan langkah-demi-langkah