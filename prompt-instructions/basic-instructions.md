# Instrucciones base del proyecto Mario Gijón

## Fuente de datos

La fuente principal es la web actual:

`https://www.mariogijon.es`

Además, para la parte personal se incorporan estos proyectos:

- `https://www.egmagazineradio.es/`
- `https://www.gasoliprecios.com/`
- `https://quinielator.gt.tc/`
- `https://pokemontcg.gt.tc/`
- `https://www.lafumadera.com/`
- `https://www.blueshift.wuaze.com/`
- `https://troylin1987.github.io/factum/`
- `https://troylin1987.github.io/reservasPadel/`
- `https://play.google.com/store/apps/details?id=com.mgs.polenmadrid`

## Enfoque general

El sitio debe ser el portal personal y profesional definitivo de Mario Gijón.

Debe combinar:

- la presentación personal,
- la experiencia técnica profesional,
- el portfolio de clientes y proyectos,
- los proyectos personales,
- la búsqueda global,
- una navegación sencilla y moderna.

## Exclusiones claras

- No se trasladará el `Unity Portfolio` que actualmente existe en mariogijon.es.
- La nueva versión debe obviar esa sección.
- El portfolio actual es completamente profesional y debe reutilizarse al máximo.
- La sección personal es nueva y debe construirse desde cero con los proyectos listados.

## Estructura propuesta

### 1. Home

- Hero con `Mario Gijón` + `Ingeniero en Informática`.
- Mensaje de valor: `Mobile & web solutions architect en IBM. Basado en Fuenlabrada, Madrid.`
- CTA: `Ver portfolio`, `Contáctame`.
- Destacados de proyectos profesionales y personales.
- Breve lista de capacidades.
- Enlace a búsqueda global.

### 2. Sobre mí

- Historia profesional breve.
- Motivación.
- Valores.
- Habilidades principales.
- Foto / localización / contacto rápido.

### 3. Profesional

- Presentación del rol actual.
- Resumen de experiencia técnica.
- Línea de tiempo o hitos.
- Portfolio profesional filtrable.
- Resultados clave y reconocimientos.

### 4. Personal

- Presentación de los proyectos personales.
- Narrativa del espacio personal y los experimentos digitales.
- Cards con cada proyecto.
- Información de valor: utilidades, productos y experimentos.

### 5. Portfolio

- Portfolio con filtros por categoría: `Profesional`, `Personal`, `Web`, `App`, `Tool`, `Data`.
- Proyecto por tarjeta con imagen, rol, cliente y tecnología.
- Páginas individuales para cada proyecto.

### 6. Proyecto individual

Cada ficha debe incluir:

- Título del proyecto.
- Subtítulo / contexto.
- Rol de Mario.
- Problema / necesidad.
- Solución técnica.
- Tecnologías usadas.
- Impacto / resultados.
- Enlaces y recursos.
- Capturas o maquetas.

### 7. Contacto

- Correo: `m.gijon87@gmail.com`
- Enlaces profesionales.
- CTA clara: `Hablemos de tu proyecto`.
- Opción de formulario ligero si se desea.

### 8. Footer

- Marca a la izquierda.
- Copyright automático con año.
- Version visible: `Version ...`.
- Enlaces rápidos.
- Información de dominio y nota accesible.

## Requisitos UX y responsive

- Mobile first.
- Dos estilos claros: mobile y desktop.
- Header con `Mario Gijón`, icono y menú hamburguesa.
- Menú deslizante superpuesto en mobile.
- Fondo sólido en menú mobile para legibilidad.
- Selector de idioma con label traducida.
- Footer profesional.
- Tema profesional.
- Brand naranja + turquesa para jerarquía visual.
- Tipografía: Grift y Bebas Neue.
- Jerarquía por tamaño, color, peso, bordes y espaciado.
- Contenido compacto en altura.
- Secciones personales y profesionales con fondo diferenciado.
- Microanimaciones y transiciones suaves.
- Feedback visual en cargas y estados.
- Errores claros y amigables.

## Requisitos técnicos

- Stack: React + Vite.
- Estilos: Tailwind CSS + Flowbite.
- Preparado para GitHub Pages.
- Deploy con GitHub Actions.
- `base: '/'` en Vite para producción con dominio propio.
- `public/CNAME` debe contener `www.mariogijon.es`.
- Cache local con ventana de 30 minutos.
- Refresco automático de datos al expirar la cache.
- Hash de assets y busting de versión.
- Build con número de versión visible.
- Analytics configurado con `VITE_GA_MEASUREMENT_ID`.
- Google Analytics cargado al inicio.
- Todos los textos en `src/content/copy.json`.
- Multidioma completo en la UI.
- Idioma por defecto: castellano.
- Idiomas soportados: SPA, ENG, CAT, GLG, EUS, FRA, ITA, DEU, ZHO, JPN, RUS, POL.
- Traducciones completas para todo texto visible y accesible.

## Requisitos SEO

- Meta title y description.
- Canonical.
- Open Graph y Twitter Card.
- `theme-color`, autor, idioma `es`, robots indexables.
- JSON-LD `WebApplication`.
- Imagen social `og-image`.
- Contenido semántico con encabezados.
- Optimización para `mario gijón` y términos clave.

## Portfolio profesional a reutilizar

Proyectos detectados en mariogijon.es:

- Passenger+
- Materials Inspect
- Bank Of Cyprus
- BizkaiUP
- Aupromas
- Delivery Notes
- SO:FIA
- Enemalta
- Evo Banco
- Handling Services Web
- Plataforma Tierra
- InSite

Proyectos adicionales detectados en navegación actual:

- El Corte Inglés - AI Solutions
- Banco Santander - GenAI Platform
- F.C. Barcelona Tickets
- Llocs de Treball
- Disruptions
- Bankinter

## Portfolio personal a incorporar

Proyectos personales nuevos:

- EG Magazine Radio
- Gasoliprecios
- Quinielator
- PokemonTCG
- La Fumadera
- Blueshift
- Factum
- Reservas Pádel
- Polen Madrid

### Dossier recomendado por proyecto personal

Cada proyecto personal debe incluir:

- Breve descripción.
- Problema que resuelve.
- Público objetivo.
- Experiencia de usuario principal.
- Arquitectura y tecnología.
- Valores añadidos.
- Estado actual / enlaces.
- Lecciones aprendidas.

## Contenido y copy

- Reutilizar al máximo el contenido actual de mariogijon.es.
- Extraer nombres de proyectos y estructura de portfolio del sitio actual.
- Crear copy nuevo y más profesional, manteniendo personalidad.
- Textos directos, técnicos y accesibles.

## Secciones extras recomendadas

- Proyectos destacados en Home.
- Mi stack tecnológico.
- Impacto y resultados cuantificados.
- Reconocimientos / premios.
- Proceso de trabajo.
- Privacidad y accesibilidad.

## Estructura de datos

El contenido principal debe estar en estructuras JSON:

- `site.metadata`
- `home.sections`
- `about.sections`
- `professional.projects`
- `personal.projects`
- `contact.info`
- `copy.json`

## Nota final

Esta primera versión debe ser una base de producción robusta y refinada, que sirva tanto como carta de presentación profesional como escaparate personal.

Debemos crear una página web más completa y moderna que el sitio actual, conservando el valor del portfolio profesional y ampliando la sección personal con proyectos con identidad propia.
