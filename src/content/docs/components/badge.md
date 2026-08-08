---
slug: "badge"
title: "Badge"
description: "Badge digunakan untuk label kecil dengan berbagai variant warna dan ikon."
category: "Components"
order: 8
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T02:40:00Z
seo:
  title: "Badge — Komponen Kustom"
  description: "Badge digunakan untuk label kecil dengan berbagai variant warna dan ikon."
  noIndex: true
---

# Badge

Badge digunakan untuk label kecil dengan berbagai variant warna dan ikon. Cocok untuk menandai status, versi, kategori, atau informasi singkat lainnya.

## Sintaks

Gunakan `:badge[label]` dengan atribut opsional:

```md
:badge[Stabil]

:badge[Beta]{variant="warning"}

:badge[New]{variant="success" icon="star"}

:badge[Deprecated]{variant="danger"}
```

## Preview

:badge[Stabil]

:badge[Beta]{variant="warning"}

:badge[New]{variant="success" icon="star"}

:badge[Deprecated]{variant="danger"}

## Varian

| Varian | Warna | Cocok untuk |
|--------|-------|-------------|
| `default` | Netral | Default / biasa |
| `new` | Aksen | Fitur baru |
| `warning` | Kuning | Peringatan |
| `success` | Hijau | Berhasil / stabil |
| `info` | Biru | Informasi |
| `danger` | Merah | Berbahaya / deprecated |
| `outline` | Transparan | Gaya ringan |
| `ghost` | Transparan | Sangat ringan |

## Ikon

| Ikon | Data Attribute | Contoh |
|------|----------------|--------|
| Bintang | `icon="star"` | `:badge[Populer]{icon="star"}` |
| Centang | `icon="check"` | `:badge[Selesai]{icon="check"}` |

## Atribut

| Atribut | Wajib | Fungsi |
|---------|-------|--------|
| `variant` | ❌ | Menentukan warna badge (default: `default`) |
| `icon` | ❌ | Menambahkan ikon di depan label |
| `class` | ❌ | Menambahkan class CSS tambahan |

## Catatan

- Label ditulis di dalam `[]`
- Badge bersifat inline, bisa diletakkan di dalam paragraf
- Varian menentukan warna dan gaya badge
- Ikon bersifat opsional dan akan muncul di sebelah kiri label
- Badge bisa dikombinasikan dengan komponen inline lain dalam satu paragraf

## Lihat Juga

- [User](/docs/user) — Profil pengguna dengan avatar
- [Button](/docs/button) — Tombol dengan ikon
- [Callout](/docs/callout) — Menyorot informasi penting