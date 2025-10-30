# Spesifikasi Proyek Web Berita Instansi

## 1. Tujuan & Prinsip
- Web berita instansi sederhana, aman, cepat, siap SEO.
- Frontend: Astro + Tailwind (statis, tanpa server app).
- CMS: Decap CMS di `/admin` dengan editorial workflow (draft → review → publish).
- Konten: Markdown + frontmatter YAML versi kontrol GitHub.
- Deploy: Vercel (preview otomatis per PR).
- Autentikasi editor: GitHub OAuth via proxy (Vercel function).
- Terbit terjadwal: status `published` + tanggal masa depan + Vercel Cron harian → rebuild.
- Multibahasa: locale `id|en`, rute `/id/...` dan `/en/...`.

## 2. Struktur Folder
```
/                         # akar repo
  public/
    images/
      logo.png
      favicon.svg
      hero.jpg
      cover-default.jpg
  content/
    berita/
      2025-10-30-slug.md
    kabar-duka/
      2025-10-29-nama.md
    profil/
      tentang.md
      visi-misi.md
      struktur.md
      fasilitas.md
    alumni/
      orang/
        1999-john-doe.md
        2005-ina-awan.md
    pages/
      id-index.md
      en-index.md
  src/
    lib/
      posts.ts
      i18n.ts
      search.ts
    layouts/
      Base.astro
      Post.astro
      Page.astro
    components/
      Hero.astro
      ArticleCard.astro
      Ticker.astro
      StatsCounter.astro
      TOC.astro
      ReadingProgress.astro
      ObituaryCard.astro
      PersonCard.astro
      LanguageSwitcher.astro
    pages/
      index.astro
      id/
        index.astro
        profil.astro
        berita/
          index.astro
          [slug].astro
        kabar-duka/
          index.astro
          [slug].astro
        alumni/
          index.astro
          [cohort].astro
      en/
        index.astro
        profil.astro
        berita/
          index.astro
          [slug].astro
        kabar-duka/
          index.astro
          [slug].astro
        alumni/
          index.astro
          [cohort].astro
      admin/
        index.html
  admin/
    config.yml
  .github/
    pull_request_template.md
    workflows/
      archive.yml
```

## 3. Model Konten (Frontmatter)

### A. Berita (`content/berita/*.md`)
```yaml
---
status: "draft"           # atau "published"
title: "Judul Artikel"
slug: "judul-artikel"
date: "YYYY-MM-DD"
author: "Redaksi"
tags: ["akademik", "umum"]
cover: "/images/cover-default.jpg"
summary: "Ringkasan 1–2 kalimat."
locale: "id"              # atau "en"
---
Isi artikel…
```
- Sembunyikan bila status ≠ `published` atau `date` > hari ini.
- Urut terbaru (desc).
- Terapkan Schema.org Article pada detail.

### B. Kabar Duka (`content/kabar-duka/*.md`)
```yaml
---
status: "draft"
obituaryTitle: "In Memoriam Nama Lengkap"
slug: "nama-lengkap"
name: "Nama Lengkap"
photo: "/images/obituary-default.jpg"     # opsional
affiliation: "Unit/Fakultas/Prodi"
role: "Dosen"
dateOfDeath: "YYYY-MM-DD"
funeralInfo: "Tempat & waktu prosesi"
location: "Lokasi"
contactFamily: ""
gallery: []
summary: "Ringkasan singkat."
locale: "id"
condolencesEnabled: false                 # opsional
---
Konten obituari…
```
- Listing: filter tahun/unit/peran; pencarian nama.
- Detail: tunjukkan field yang ada, skema warna tenang.
- `condolencesEnabled` → form ucapan via PR (moderasi).

### C. Profil (`content/profil/*.md`)
```yaml
---
title: "Tentang"
slug: "tentang"
summary: "Deskripsi singkat"
locale: "id"
---
Konten…
```

### D. Alumni – Orang (`content/alumni/orang/*.md`)
```yaml
---
status: "published"
name: "Nama Lengkap"
slug: "nama-lengkap"
cohort: 2005
program: "Teknik X"
unit: "Fakultas Y"
jobTitle: "Jabatan"
organization: "Perusahaan"
email: ""
phone: ""
avatar: "/images/alumni-default.jpg"
locale: "id"
---
Profil singkat…
```
- Index: kumpulkan angkatan unik (desc).
- `cohort` page: daftar orang angkatan, status `published` saja.
- Email/telepon tampil hanya bila terisi.

## 4. Utilitas & Logika

### Berita (`src/lib/posts.ts`)
```ts
export async function getPublishedNews(all: Array<any>) {
  const today = new Date().toISOString().slice(0, 10);
  return all
    .filter((p) => p.data.status === "published" && p.data.date <= today)
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}
```

### Kabar Duka (`src/lib/posts.ts` atau `obituaries.ts`)
```ts
export function getPublishedObituaries(all: Array<any>) {
  return all
    .filter((p) => p.data.status === "published")
    .sort((a, b) =>
      (b.data.dateOfDeath || "").localeCompare(a.data.dateOfDeath || "")
    );
}
```

### Alumni (`src/lib/posts.ts` atau `alumni.ts`)
```ts
export function groupCohorts(people: Array<any>) {
  const published = people.filter((p) => p.data.status === "published");
  const years = Array.from(new Set(published.map((p) => p.data.cohort))).sort(
    (a, b) => b - a
  );
  return { years, people: published };
}

export function byCohort(people: Array<any>, year: number) {
  return people
    .filter((p) => p.data.cohort === year)
    .sort((a, b) => (a.data.name || "").localeCompare(b.data.name || ""));
}
```

### Multibahasa
- Filter konten sesuai `locale` berdasarkan segmen rute.
- `LanguageSwitcher.astro` memetakan path ID ↔ EN; fallback ke ID bila EN tak tersedia.

### Rute Dinamis
- `[slug].astro`: jika konten tidak layak (status/date), kirim 404.
- Pastikan `ReadingProgress`, `TOC`, `StatsCounter`, `Ticker` menggunakan IntersectionObserver untuk animasi in-view tanpa CLS.

## 5. UI dan UX
- Header nav: Beranda • Profil • Berita • Kabar Duka • Alumni • `🔍` • `🌗`.
- Hero: parallax ringan, highlight berita terbaru.
- Berita index: pencarian Fuse.js, filter tag/tanggal, load lebih.
- Detail berita: ringkasan, TOC, reading progress, OG, schema.
- Profil: TOC sticky, layout editorial.
- Kabar Duka: filter, pencarian, detail calm.
- Alumni: index angkatan + detail cohort (PersonCard).
- Animasi: transform/opacity (micro-interaction, scroll reveal).
- Responsif, semantik, kontras AA, skip link.

## 6. SEO & Aksesibilitas
- Sitemap `/sitemap.xml`, RSS `/rss.xml`.
- Meta canonical, OG/Twitter, Schema Article.
- `robots.txt` blok `/admin` dan URL preview.

## 7. Deployment & Workflow
- Build Astro (static) → deploy Vercel. Preview per PR aktif.
- Vercel Cron harian 06:00 WIB → trig rebuild (endpoint revalidate).
- Protected `main`: PR + 1 reviewer.
- `.github/workflows/archive.yml` → arsip mingguan konten & images ke rilis.

## 8. Decap CMS

### `/admin/index.html`
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Admin</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.css"
    />
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
    <script>
      // widget kustom (opsional)
    </script>
  </body>
</html>
```

### `/admin/config.yml`
```yaml
backend:
  name: github
  repo: ORGANIZATION_OR_USER/REPO_NAME        # TODO
  branch: main
  base_url: https://YOUR_OAUTH_PROXY.example.com   # TODO
  auth_endpoint: /api/auth

media_folder: "public/images"
public_folder: "/images"

site_url: "https://DOMAIN_PROD.com"          # TODO
display_url: "https://DOMAIN_PROD.com"       # TODO
logo_url: "/images/logo.png"

publish_mode: editorial_workflow

collections:
  - name: berita
    label: "Berita"
    folder: "content/berita"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    preview_path: "{{locale}}/berita/{{slug}}"
    fields:
      - {label: "Status", name: "status", widget: "select", options: ["draft","published"], default: "draft"}
      - {label: "Judul", name: "title", widget: "string"}
      - {label: "Slug", name: "slug", widget: "string"}
      - {label: "Tanggal", name: "date", widget: "datetime", format: "YYYY-MM-DD", time_format: false}
      - {label: "Penulis", name: "author", widget: "string", default: "Redaksi"}
      - {label: "Tag", name: "tags", widget: "list", default: []}
      - {label: "Cover", name: "cover", widget: "image", choose_url: false}
      - {label: "Ringkasan", name: "summary", widget: "text"}
      - {label: "Bahasa", name: "locale", widget: "select", options: ["id","en"], default: "id"}
      - {label: "Isi", name: "body", widget: "markdown"}

  - name: kabar_duka
    label: "Kabar Duka"
    folder: "content/kabar-duka"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    preview_path: "{{locale}}/kabar-duka/{{slug}}"
    fields:
      - {label: "Status", name: "status", widget: "select", options: ["draft","published"], default: "draft"}
      - {label: "Judul Obituari", name: "obituaryTitle", widget: "string"}
      - {label: "Slug", name: "slug", widget: "string"}
      - {label: "Nama", name: "name", widget: "string"}
      - {label: "Foto", name: "photo", widget: "image", required: false, choose_url: false}
      - {label: "Afiliasi", name: "affiliation", widget: "string", required: false}
      - {label: "Peran", name: "role", widget: "select", options: ["Dosen","Staf","Alumni","Lainnya"], required: false}
      - {label: "Tanggal Wafat", name: "dateOfDeath", widget: "datetime", format: "YYYY-MM-DD", time_format: false}
      - {label: "Info Prosesi", name: "funeralInfo", widget: "text", required: false}
      - {label: "Lokasi", name: "location", widget: "string", required: false}
      - {label: "Kontak Keluarga", name: "contactFamily", widget: "string", required: false}
      - {label: "Galeri", name: "gallery", widget: "list", field: {label: "Gambar", name: "image", widget: "image"}, required: false}
      - {label: "Ringkasan", name: "summary", widget: "text"}
      - {label: "Bahasa", name: "locale", widget: "select", options: ["id","en"], default: "id"}
      - {label: "Isi", name: "body", widget: "markdown"}

  - name: profil
    label: "Profil"
    folder: "content/profil"
    create: false
    fields:
      - {label: "Judul", name: "title", widget: "string"}
      - {label: "Slug", name: "slug", widget: "string"}
      - {label: "Ringkasan", name: "summary", widget: "text", required: false}
      - {label: "Bahasa", name: "locale", widget: "select", options: ["id","en"], default: "id"}
      - {label: "Isi", name: "body", widget: "markdown"}

  - name: alumni_orang
    label: "Alumni - Orang"
    folder: "content/alumni/orang"
    create: true
    slug: "{{cohort}}-{{slug}}"
    preview_path: "{{locale}}/alumni/{{cohort}}"
    fields:
      - {label: "Status", name: "status", widget: "select", options: ["draft","published"], default: "published"}
      - {label: "Nama", name: "name", widget: "string"}
      - {label: "Slug", name: "slug", widget: "string"}
      - {label: "Angkatan", name: "cohort", widget: "number", value_type: "int", min: 1900, max: 2100}
      - {label: "Program", name: "program", widget: "string", required: false}
      - {label: "Unit", name: "unit", widget: "string", required: false}
      - {label: "Jabatan", name: "jobTitle", widget: "string", required: false}
      - {label: "Organisasi", name: "organization", widget: "string", required: false}
      - {label: "Email (opsional)", name: "email", widget: "string", required: false}
      - {label: "Telepon (opsional)", name: "phone", widget: "string", required: false}
      - {label: "Foto", name: "avatar", widget: "image", required: false, choose_url: false}
      - {label: "Bahasa", name: "locale", widget: "select", options: ["id","en"], default: "id"}
      - {label: "Bio Singkat", name: "body", widget: "markdown", required: false}
```

## 9. OAuth Proxy (Ringkasan)
- Deploy [`decap-oauth-provider`](https://github.com/decaporg/decap-cms-oauth-provider) ke Vercel.
- ENV:
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`
  - `JWT_SECRET`
  - `OAUTH_CLIENT_REDIRECT_URL=https://DOMAIN_PROD.com/admin/`
- Pastikan `base_url` & `auth_endpoint` di `config.yml` menunjuk ke proxy.

## 10. Backup Mingguan (`.github/workflows/archive.yml`)
```yaml
name: Archive Content
on:
  schedule:
    - cron: "0 0 * * 0"
jobs:
  zip:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: sudo apt-get update && sudo apt-get install -y zip
      - run: zip -r content-archive.zip content public/images
      - uses: softprops/action-gh-release@v2
        with:
          tag_name: content-archive-${{ github.run_number }}
          files: content-archive.zip
```

## 11. Pull Request Template (`.github/pull_request_template.md`)
```markdown
### Cek sebelum merge
- [ ] Judul benar
- [ ] Ringkasan ≤ 280 karakter
- [ ] Tag relevan
- [ ] Cover terunggah
- [ ] Tanggal sesuai

Preview: <PASTE_VERCEL_PREVIEW_URL>
```

## 12. Kriteria Selesai
- `/admin` login via GitHub OAuth; editorial workflow efektif.
- Editor dapat draft, review, publish.
- Preview per PR via Vercel berjalan.
- Draft & jadwal (future date) tidak tampil sebelum waktunya.
- Rute `/id/` & `/en/` valid; LanguageSwitcher berfungsi, fallback ID bila perlu.
- Alumni per angkatan berjalan (index + detail).
- Lighthouse ≥ 90 (Performance & SEO).
- Paket: `astro`, `@astrojs/tailwind`, `fuse.js` (opsional `@astrojs/mdx`).

## 13. Next Steps
1. Isi placeholder (`repo`, domain, OAuth proxy URL) dalam spec.
2. Commit `identitas-branding.yaml` & `SPEC.md` ke repo.
3. Mulai bootstrap proyek Astro sesuai struktur di atas.
4. Konfigurasi Vercel + Decap OAuth proxy.
5. Siapkan Vercel Cron & GitHub branch protection.