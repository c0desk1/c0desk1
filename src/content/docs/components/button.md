---
slug: "button"
title: "Button"
description: "Button digunakan untuk tombol dengan ikon dan berbagai gaya."
category: "Components"
order: 9
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T02:45:00Z
seo:
  title: "Button — Komponen Kustom"
  description: "Button digunakan untuk tombol dengan ikon dan berbagai gaya."
  noIndex: true
---

Button digunakan untuk tombol dengan ikon dan berbagai gaya. Cocok untuk link download, tautan eksternal, atau aksi lain yang membutuhkan tombol.

## Sintaks {#penggunaan-syntak-button}

Gunakan `:button[label]` dengan atribut:

```md
:button[Download]{url="/" icon="download"}

:button[GitHub]{url="https://github.com" icon="github"}

:button[Lihat Demo]{url="/" variant="primary"}

:button[Selengkapnya]{url="/" variant="secondary"}
```

## Preview

:button[Download]{url="/" icon="download"}

:button[GitHub]{url="https://github.com" icon="github"}

:button[Lihat Demo]{url="/" variant="primary"}

:button[Selengkapnya]{url="/" variant="secondary"}

## Varian

| Varian | Gaya | Cocok untuk |
|--------|------|-------------|
| `primary` | Solid (default) | Aksi utama / CTA |
| `secondary` | Outline ringan | Aksi sekunder |
| `success` | Hijau | Berhasil / sukses |
| `danger` | Merah | Hapus / bahaya |
| `outline` | Transparan dengan border | Gaya ringan |
| `ghost` | Transparan tanpa border | Sangat ringan |

## Ikon

| Ikon | Data Attribute | Contoh |
|------|----------------|--------|
| Download | `icon="download"` | `:button[Download]{icon="download"}` |
| GitHub | `icon="github"` | `:button[GitHub]{icon="github"}` |
| Eksternal | `icon="external"` | `:button[Link]{icon="external"}` |
| Panah | `icon="arrow"` | `:button[Selanjutnya]{icon="arrow"}` |
| Bintang | `icon="star"` | `:button[Favorit]{icon="star"}` |
| Info | `icon="info"` | `:button[Info]{icon="info"}` |
| Peringatan | `icon="warning"` | `:button[Peringatan]{icon="warning"}` |

## Atribut

| Atribut | Wajib | Fungsi |
|---------|-------|--------|
| `url` | ✅ | Tujuan link (dapat dari `[]` atau `url="..."`) |
| `icon` | ❌ | Nama ikon (lihat daftar di atas) |
| `variant` | ❌ | Gaya tombol (default: `primary`) |
| `block` | ❌ | Tombol lebar penuh |
| `class` | ❌ | Menambahkan class CSS tambahan |

## Catatan

- Label ditulis di dalam `[]`
- Jika `url` tidak diberikan di atribut, nilai `[]` akan dianggap sebagai URL
- Tombol akan terbuka di tab baru jika URL eksternal (http/https)
- Tombol internal (`/`, `#`) akan terbuka di tab yang sama
- Ikon akan muncul di sebelah kiri label
- Tombol bersifat inline, bisa diletakkan di dalam paragraf
- `block` membuat tombol melebar penuh dan cocok untuk CTA

## Lihat Juga

- [Badge](/docs/badge) — Label kecil dengan warna
- [User](/docs/user) — Profil pengguna dengan avatar
- [Callout](/docs/callout) — Menyorot informasi penting