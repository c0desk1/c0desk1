---
slug: "user"
title: "User"
description: "User digunakan untuk menampilkan profil pengguna dengan avatar, nama, dan role."
category: "Components"
order: 7
draft: false
author:
  name: Tim Unloyd
  role: Developer
  url: https://c0desk1.my.id/
  email: hello@c0desk1.my.id
lastUpdated: 2026-08-09T02:40:00Z
seo:
  title: "User — Komponen Kustom"
  description: "User digunakan untuk menampilkan profil pengguna dengan avatar, nama, dan role."
  noIndex: true
---

# User

User digunakan untuk menampilkan profil pengguna dengan avatar, nama, dan role. Cocok untuk menampilkan penulis artikel, kontributor, atau anggota tim.

## Sintaks

Gunakan `:user[name]` dengan atribut opsional:

```md
:user[Bima Akbar]

:user[Bima Akbar]{avatar="https://avatars.githubusercontent.com/u/81931118?v=4"}

:user[Bima Akbar]{avatar="https://avatars.githubusercontent.com/u/81931118?v=4" role="Developer"}

:user[Bima Akbar]{avatar="https://avatars.githubusercontent.com/u/81931118?v=4" role="Developer" url="https://github.com/bimaakbar-dev"}
```

## Preview

:user[Bima Akbar]

:user[Bima Akbar]{avatar="https://avatars.githubusercontent.com/u/81931118?v=4"}

:user[Bima Akbar]{avatar="https://avatars.githubusercontent.com/u/81931118?v=4" role="Developer"}

:user[Bima Akbar]{avatar="https://avatars.githubusercontent.com/u/81931118?v=4" role="Developer" url="https://github.com/bimaakbar-dev"}

## Atribut

| Atribut | Wajib | Fungsi |
|---------|-------|--------|
| `avatar` | ❌ | URL avatar (akan ditampilkan sebagai gambar bulat) |
| `role` | ❌ | Peran pengguna (ditampilkan setelah nama dengan pemisah `·`) |
| `url` | ❌ | Link ke profil (membungkus user dalam link) |
| `class` | ❌ | Menambahkan class CSS tambahan |

## Catatan

- Nama ditulis di dalam `[]`
- Avatar akan otomatis berbentuk bulat (`rounded-full`)
- Jika `url` diberikan, user akan menjadi link
- Link eksternal otomatis memiliki `rel="noopener noreferrer nofollow"`
- User bersifat inline, bisa diletakkan di dalam paragraf
- Role akan ditampilkan setelah nama dengan pemisah `·`
- Avatar placeholder akan muncul jika avatar tidak diisi

## Lihat Juga

- [Badge](/docs/badge/) — Label kecil dengan warna
- [Button](/docs/button/) — Tombol dengan ikon
- [Callout](/docs/callout/) — Menyorot informasi penting