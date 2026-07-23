# Portfolio Redesign — Spec

## Estado actual
- Next.js 15.5.4 + React 19 + Tailwind 3.4 + Radix + Framer Motion
- Imagen `sergioromerohd/portfolio-app` corriendo en CasaOS (`sparkling_felix`)
- Sin CI/CD. Build manual. Dockerfile con `node:18` EOL y `npm install --production` que rompe devDeps

## Stack objetivo
| Capa | Decisión | Por qué |
|---|---|---|
| Runtime | Node 20 alpine | 18 está EOL |
| Framework | Next.js 15.5+ App Router | Server components, output standalone |
| UI | Tailwind 3.4 + Radix (mínimo) + shadcn | Solo lo usado; -33 archivos ui/ |
| Animación | Framer Motion 11 | Lo que ya hay, versión pineada |
| Icons | lucide-react | Lo que ya hay |
| Toasts | sonner | Más simple que shadcn toast |
| Theme | next-themes | Lo que ya hay, default dark |
| Build | output: 'standalone' | Imagen Docker ~150MB en vez de 1GB |
| Linter | next lint + tsc --noEmit | Obligatorio en CI |
| CI | GitHub Actions (lint+typecheck+build) | Catch errores en PR |
| CD | GitHub Actions → ghcr.io | Push a main → imagen |
| Deploy | CasaOS + Watchtower pull-policy | Auto-deploy sin tocar el server |

## Pipeline deploy
```
git push origin main
  → CI (lint, typecheck, build) ✓
  → CD (docker buildx + push ghcr.io/sergioromerohd/portfolio:latest)
  → Watchtower detecta nueva imagen (cada 5min)
  → docker compose pull && up -d
  → 30s healthcheck wait
  → portfolio actualizado en cv.sergioromerohd.com
```

## Design system (próximos slices)
- **Solo dark** (defaultTheme="dark", sin toggle). Cero luces, un foco.
- **Tipografía**:
  - Sans: Inter (UI)
  - Mono: JetBrains Mono (código, datos)
- **Paleta**:
  - bg: `oklch(0.13 0.01 250)` casi negro azulado
  - fg: `oklch(0.95 0.01 250)`
  - accent: `oklch(0.7 0.15 175)` teal/verde (terminal)
  - muted: `oklch(0.55 0.01 250)`
  - border: `oklch(0.25 0.01 250)`
- **Bento grid** en hero (3-4 cards: stack/skills/proyectos/contacto)
- **Hero terminal** con typing animation real (xterm-style o custom)
- **Sin emoji en UI** (excepto OG image)
- **Sin gradientes chillones** (el `--primary-gold: ...` que tiene tu about ahora se va)
- **Cursor caret parpadeante** en bloques de código

## Vertical slices restantes
1. ✅ Fix Dockerfile, .dockerignore, next.config, limpieza de shadcn ui
2. ✅ CI workflow
3. ✅ CD workflow → ghcr.io
4. ⏳ Watchtower en CasaOS
5. ⏳ Design system (Tailwind config + globals.css dark)
6. ⏳ Hero terminal + secciones reescritas (bento)
7. ⏳ SEO/OG/JSON-LD + sitemap + robots
8. ⏳ PR final a main
