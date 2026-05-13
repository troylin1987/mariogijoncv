# Assets Multimedia - Mario Gijón CV

## Estructura de carpetas y contenido

### 📁 Estructura actual
```
/public/media/
├── profile-avatar.svg              ✅ Avatar circular (120x120px)
├── profile-badge.svg               ✅ Badge/emblem personal (200x200px)
├── hero-visual.svg                 ✅ Hero visual homepage (600x400px)
├── professional-visual.svg         ✅ Visual área profesional (600x400px)
├── personal-visual.svg             ✅ Visual área personal (600x400px)
├── location-map.svg                ✅ Mapa/ubicación (600x300px)
├── capabilities/                   
│   ├── architecture.svg            ✅ Capability block icon
│   ├── leadership.svg              ✅ Capability block icon
│   └── business-impact.svg         ✅ Capability block icon
├── personal/
│   ├── exploration.svg             ✅ Personal capability icon
│   ├── craft.svg                   ✅ Personal capability icon
│   ├── learning.svg                ✅ Personal capability icon
│   └── projects/                   (para imágenes de proyectos personales)
├── skills/
│   ├── mobile.svg                  ✅ Skill icon
│   ├── cloud.svg                   ✅ Skill icon
│   ├── genai.svg                   ✅ Skill icon
│   ├── microservices.svg           ✅ Skill icon
│   ├── architecture.svg            ✅ Skill icon
│   └── leadership.svg              ✅ Skill icon
├── badges/
│   ├── ibm-mentor.svg              ✅ Badge example
│   ├── design-thinking.svg         ✅ Badge example
│   └── security-architect.svg      ✅ Badge example
├── timeline/
│   ├── 2025-01.svg                 ✅ Timeline icon (AI/GenAI)
│   ├── 2024-09.svg                 ✅ Timeline icon (GenAI)
│   ├── 2024-06.svg                 ✅ Timeline icon (Consultoría)
│   └── 2023-03.svg                 ✅ Timeline icon (Ticketing)
└── projects/
    ├── el-corte-ingles-ai.svg      ✅ Project showcase
    ├── banco-santander-genai.svg   ✅ Project showcase
    └── barcelona-ticketing.svg     ✅ Project showcase
```

---

## 📝 Guía de uso y reemplazo

### Imágenes que DEBES reemplazar con las tuyas:

#### 1. **profile-avatar.svg** (Profile sidebar)
- **Ubicación**: `/public/media/profile-avatar.svg`
- **Tamaño**: 120×120px
- **Uso**: Aparece en el sidebar (hamburger menu)
- **Cómo reemplazar**: 
  - Opción 1: Coloca tu foto en JPG/PNG con el mismo nombre
  - Opción 2: Edita el SVG existente con tu diseño
  - **Mejor opción**: Tu fotografía real (JPG, 120×120px)

#### 2. **Imágenes de proyectos profesionales** 
- **Ubicación**: `/public/media/projects/[project-id].svg` or `.png`
- **Tamaño**: 800×500px (16:9 ratio)
- **Uso**: Thumbnails en ProjectCards
- **Nombres sugeridos**:
  - `el-corte-ingles-ai-solutions.png`
  - `banco-santander-genai-platform.png`
  - `barcelona-ticketing-app.png`
  - (más para otros proyectos)
- **Formato**: PNG/JPG (comprimido con TinyPNG)

#### 3. **Timeline icons**
- **Ubicación**: `/public/media/timeline/YYYY-MM.svg`
- **Tamaño**: 32×32px (cuadrado)
- **Uso**: Pequeño icono en cada línea del timeline
- **Los SVGs actuales cubren**:
  - 2025-01: AI/ML
  - 2024-09: GenAI/Spark
  - 2024-06: Briefcase/Consultoría
  - 2023-03: Tickets
- **Para agregar más**: Crea nuevos SVGs o usa los existentes repetidos

#### 4. **Skill icons**
- **Ubicación**: `/public/media/skills/[skill-name].svg`
- **Tamaño**: 20×20px (para badges pequeños)
- **Los actuales**: mobile, cloud, genai, microservices, architecture, leadership
- **Cómo usarlos**: Se referencian automáticamente en skills en AboutPage
- **Si quieres cambiar**: Edita el mapeo en las líneas que dicen `image` en AboutPage

#### 5. **Badges icons**
- **Ubicación**: `/public/media/badges/[badge-name].svg`
- **Tamaño**: 64×64px
- **Los actuales**:
  - `ibm-mentor.svg`
  - `design-thinking.svg`
  - `security-architect.svg`
- **Para agregar más badges**: Crea nuevos SVG files y actualiza en copy.json

#### 6. **Capability block icons**
- **Ubicación**: `/public/media/capabilities/[capability].svg`
- **Tamaño**: 64×64px
- **Professional**:
  - `architecture.svg`
  - `leadership.svg`
  - `business-impact.svg`
- **Personal** (`/public/media/personal/`):
  - `exploration.svg`
  - `craft.svg`
  - `learning.svg`

---

## 🎨 Formatos recomendados por tipo

| Tipo | Formato | Tamaño | Compresión | Nota |
|------|---------|--------|-----------|------|
| Avatars | PNG/JPG | 120×120 | Natural | Tu foto real |
| Icons | SVG | 20-64px | Gzip | Vectorial, escalable |
| Capability blocks | SVG | 64×64 | Gzip | Iconos profesionales |
| Project visuals | PNG/JPG | 800×500 | 75% quality | Screenshots/mockups |
| Diagrams | SVG | variable | Gzip | Arquitectura |
| Badges | SVG | 64×64 | Gzip | Símbolos profesionales |
| Hero visuals | SVG | 600×400 | Gzip | Responsivo |

---

## 🛠️ Herramientas recomendadas

1. **Comprimir imágenes PNG/JPG**:
   - TinyPNG: https://tinypng.com
   - ImageOptim (macOS): https://imageoptim.com

2. **Crear/editar SVGs**:
   - Figma: https://figma.com
   - Sketch: https://www.sketch.com
   - Inkscape: https://inkscape.org (libre)

3. **Optimizar SVGs**:
   - SVGOMG: https://jakearchibald.github.io/svgomg/

4. **Imágenes gratis**:
   - Unsplash: https://unsplash.com
   - Pexels: https://pexels.com
   - Pixabay: https://pixabay.com

---

## ✅ Checklist de migración

- [ ] Reemplazar `profile-avatar.svg` con tu foto (o crear tu SVG)
- [ ] Crear imágenes 800×500px para cada proyecto profesional
- [ ] Crear/diseñar timeline icons (32×32px SVG) para cada hito
- [ ] Crear skill icons si usas diferentes de los actuales
- [ ] Crear badge icons para tus certificaciones
- [ ] Opcional: Personalizar hero/professional/personal visuals

---

## 📸 Cómo integrar tus propias imágenes

### En AboutPage (skills, badges):
Los skills y badges se renderizan desde `copy.json`. Los iconos se buscan automáticamente en:
- `/public/media/skills/[skill-name].svg`
- `/public/media/badges/[badge-name].svg`

### En timeline:
Los iconos se buscan por fecha: `/public/media/timeline/YYYY-MM.svg`
Si no existe, usa uno genérico o reutiliza SVGs existentes.

### En projects:
Las imágenes de proyectos se buscan en `/public/media/projects/[project-id].svg` o `.png`

---

## 📝 Notas

- **Todos los SVGs actuales son ejemplos** basados en la paleta naranja (#ff8c42, #ff6b35, #ffb84d)
- Puedes cambiar los colores editando los gradients en el SVG
- Los SVGs son responsivos y se escalan perfectamente
- Para máxima calidad en fotos: JPG comprimido al 80% es ideal
- Para máxima compatibilidad: PNG para fotos, SVG para iconos

¡Personaliza todo lo que quieras! 🎨
