# Mario Gijón - Portal personal y profesional

Proyecto base creado con React + Vite, Tailwind CSS y Flowbite.

## Cómo arrancar

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

3. Compilar para producción:

```bash
npm run build
```

4. Probar la aplicación localmente con preview:

```bash
npm run preview
```

5. Generar el build para despliegue en GitHub Pages:

```bash
npm run deploy
```

## Despliegue

Este proyecto incluye una acción de GitHub Actions que publica el contenido de `dist/` en la rama `gh-pages` cuando se hace push a `main`.

## Versionado de build

- El footer muestra ahora un identificador de build con formato `v1.0.0-uuid`.
- En cada `npm run build` se genera automáticamente un UUID nuevo mediante `scripts/generate-build-version.mjs`.
- El valor se inyecta en `VITE_APP_VERSION` y ayuda a identificar de forma precisa cada despliegue.

## Analítica y cookies

- La integración de Google Analytics utiliza la variable `VITE_GA_MEASUREMENT_ID`.
- En GitHub Actions se toma desde `Repository variables`.
- La web muestra un banner de consentimiento de cookies/analítica; si se rechaza, Analytics queda desactivado.
- Puedes partir de `.env.example` para configurar variables en local.

## Publicación en GitHub Pages

- El dominio personalizado se mantiene en `public/CNAME` (`www.mariogijon.es`).
- Para activar analítica en producción, define `VITE_GA_MEASUREMENT_ID` en el repositorio (Settings > Secrets and variables > Actions > Variables).
- Al mover el dominio desde Google Sites a GitHub Pages, asegúrate de actualizar los DNS en tu proveedor de dominio.

### Checklist recomendado para publicar en tu repo público

Repositorio: `https://github.com/troylin1987/mariogijoncv/`

1. En GitHub, entra en Settings > Pages.
2. En Build and deployment, selecciona Source: `Deploy from a branch`.
3. Branch: `gh-pages` y carpeta `/ (root)`.
4. En Settings > Actions > General, deja habilitado `Read and write permissions` para `GITHUB_TOKEN`.
5. En Settings > Secrets and variables > Actions > Variables, crea:
	 - `VITE_GA_MEASUREMENT_ID = G-EX2Y83PKE2`
6. Haz push a `main` para disparar el workflow `Deploy to GitHub Pages`.
7. Verifica en Actions que termina en verde y que publica en `gh-pages`.

### DNS recomendado para dominio personalizado

El proyecto usa `www.mariogijon.es` en `public/CNAME`, asi que lo ideal es:

- Registro `CNAME`
	- Host/Name: `www`
	- Target/Value: `troylin1987.github.io`
	- TTL: automático o 3600

- Registro `A` para el dominio raíz `@` (opcional, pero recomendado para redirección)
	- `185.199.108.153`
	- `185.199.109.153`
	- `185.199.110.153`
	- `185.199.111.153`

- (Opcional) Registro `AAAA` para IPv6:
	- `2606:50c0:8000::153`
	- `2606:50c0:8001::153`
	- `2606:50c0:8002::153`
	- `2606:50c0:8003::153`

Después, en Settings > Pages, añade `www.mariogijon.es` como Custom domain y activa `Enforce HTTPS`.

### Verificaciones SEO/robots rápidas tras publicar

1. Abrir `https://www.mariogijon.es/robots.txt` y comprobar que responde 200.
2. Abrir `https://www.mariogijon.es/sitemap.xml` y comprobar que responde 200.
3. En Google Search Console, añadir propiedad de dominio/sitio y enviar sitemap.
4. En GA4 Realtime, validar eventos `page_view`, `search_submit`, `project_view_details_click`, `project_view_website_click` y `contact_email_click`.

## Estructura inicial

- `src/App.tsx` - aplicación principal y navegación.
- `src/content/copy.json` - textos multidioma.
- `src/data/projects.ts` - datos iniciales de proyectos.
- `src/pages/*` - páginas principales del portal.
- `src/pages/ProjectDetailPage.tsx` - fichas de proyecto individuales.
- `src/pages/SearchPage.tsx` - búsqueda global por proyectos.
- `public/CNAME` - dominio de GitHub Pages.
