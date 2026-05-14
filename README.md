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

5. Generar build para despliegue:

```bash
npm run deploy
```

## Despliegue

Este proyecto despliega en InfinityFree por FTP con GitHub Actions.

- Workflow: `.github/workflows/deploy.yml`
- Trigger: `push` a `main`
- Flujo: `npm ci` -> `npm run build` -> subida de `dist/` a `htdocs/`
- Secretos requeridos en GitHub: `FTPUSERNAME` y `FTPKEY`

Nota: `public/.htaccess` se copia a `dist/.htaccess` durante el build para forzar HTTPS y soportar fallback de SPA.

## Versionado de build

- El footer muestra ahora un identificador de build con formato `v1.0.0-uuid`.
- En cada `npm run build` se genera automáticamente un UUID nuevo mediante `scripts/generate-build-version.mjs`.
- El valor se inyecta en `VITE_APP_VERSION` y ayuda a identificar de forma precisa cada despliegue.

## Analítica y cookies

- La integración de Google Analytics utiliza la variable `VITE_GA_MEASUREMENT_ID`.
- En GitHub Actions se toma desde `Repository variables`.
- La web muestra un banner de consentimiento de cookies/analítica; si se rechaza, Analytics queda desactivado.
- Puedes partir de `.env.example` para configurar variables en local.

## Publicación en InfinityFree

- Para activar analítica en producción, define `VITE_GA_MEASUREMENT_ID` en el repositorio (Settings > Secrets and variables > Actions > Variables).
- El SSL de dominio se gestiona en InfinityFree (Let's Encrypt) y su instalación se realiza desde su panel.

### Checklist recomendado de publicación

Repositorio: `https://github.com/troylin1987/mariogijoncv/`

1. En Settings > Actions > General, deja habilitado `Read and write permissions` para `GITHUB_TOKEN`.
2. En Settings > Secrets and variables > Actions > Secrets, crea:
	 - `FTPUSERNAME`
	 - `FTPKEY`
3. En Settings > Secrets and variables > Actions > Variables, crea:
	 - `VITE_GA_MEASUREMENT_ID = G-EX2Y83PKE2`
4. Haz push a `main` para disparar el workflow `Deploy to InfinityFree`.
5. Verifica en Actions que termina en verde.

### DNS recomendado para dominio personalizado

Configuracion recomendada para `mariogijon.es` y `www.mariogijon.es` en InfinityFree:

- Registro `A` para `@`
	- Host/Name: `@`
	- Target/Value: `185.27.134.149`
	- TTL: automatico o 3600

- Registro `A` para `www`
	- Host/Name: `www`
	- Target/Value: `185.27.134.149`
	- TTL: automatico o 3600

- Evita dejar registros `CNAME` de `www` hacia `github.io`.

Después, valida en InfinityFree que el certificado Let's Encrypt este `Active` para el dominio.

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
- `public/.htaccess` - forzado HTTPS y fallback SPA en Apache.
