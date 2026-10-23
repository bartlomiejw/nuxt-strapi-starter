# Strapi CMS

A minimal [Strapi 5](https://strapi.io) application that backs the Nuxt front end.

- **Content type:** `Article` (`title`, `slug`, `excerpt`, `content` as Blocks rich text, `cover` image), localised with the i18n plugin (`en`, `fr`, `ar`, `pl`). `slug` and `cover` are shared across locales.
- **Public API:** read-only (`find`, `findOne`); write routes are not exposed.
- **Seeding:** on first start `src/index.ts` creates the extra locales, grants the public role read access and seeds demo articles. Disable with `SEED_DEMO_CONTENT=false`.

## Run locally (SQLite)

```bash
cd strapi
cp .env.example .env   # then replace every "tobemodified" value
pnpm install
pnpm develop           # admin panel: http://localhost:1337/admin
```

## Run with Docker (PostgreSQL)

From the repository root:

```bash
docker compose up -d
```

## Types

`types/generated` is produced by Strapi from the schemas. Regenerate it after changing a content type:

```bash
pnpm strapi ts:generate-types
```
