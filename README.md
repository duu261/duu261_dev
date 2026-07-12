# duu261.indevs.in

Personal site of Nguyễn Như Vũ - Java backend / BrSE student in Ho Chi Minh City.

Static site, zero client JS. All motion is CSS, gated behind `prefers-reduced-motion`.

## Stack

- [Astro](https://astro.build) with content collections (`src/content/projects`, `src/content/blog`)
- Catppuccin Macchiato palette, Fira Code / Shippori Mincho B1 / Playfair Display / Archivo
- Custom remark pipeline for themed diagrams, file panels, and callouts (see `AUTHORING.md`)

## Commands

pnpm only.

| Command        | Action                            |
| :------------- | :-------------------------------- |
| `pnpm install` | Install dependencies              |
| `pnpm dev`     | Dev server at `localhost:4321`    |
| `pnpm build`   | Production build to `./dist/`     |
| `pnpm preview` | Preview the production build      |

## Writing content

Plain markdown only - no hand-written HTML. Frontmatter schemas and the
themed block syntax are documented in [AUTHORING.md](AUTHORING.md).
Entries with `draft: true` never reach the public build.
