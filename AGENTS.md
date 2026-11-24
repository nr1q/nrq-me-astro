## Development

This project is built with **Astro**, **Tailwind CSS v4**, **Lenis**, **Three.js**, **GSAP**, and **SplitType**.

Install dependencies:

```
pnpm install
```

Start the development server (Vite-powered):

```
pnpm run dev
```

Build for production:

```
pnpm run build
```

Preview the production build:

```
pnpm run preview
```

## Deployment

Static output is generated in `dist/` and is intended for deployment to **Cloudflare Pages** under `https://nrq.me`.

## Notes

- The site uses a dark-only theme. Theme toggle code exists in `src/components/ThemeToggle.astro` but is not currently imported.
- The Three.js canvas is a fixed full-screen background animated by Lenis scroll progress.
- All images and fonts are self-hosted in `public/`.

## Documentation

- [Astro](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lenis](https://lenis.darkroom.engineering/)
- [Three.js](https://threejs.org/docs/)
