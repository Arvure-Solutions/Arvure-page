# Arvure — Rediseño "Studio Minimal"

Rediseño completo de `arvure-solutions.github.io/Arvure-page` bajo principios de
**Apple Design / Taste / minimalismo**. HTML + CSS propios, sin dependencia de
Google Fonts ni del CDN de Tailwind para el diseño visible.

---

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Página completa. Estructura, marcado y toda la lógica (catálogo, filtros, modal, forms, WhatsApp, reveal, nav). |
| `styles.css` | Design system: tokens, tipografía, layout, componentes, modo oscuro, animaciones. |
| `contenido.defaults.js` | Valores por defecto del hero y orden de secciones (los usa el panel admin vía `localStorage`). |
| `catalogo.defaults.js` | Catálogo por defecto de soluciones (sin cambios respecto al original). |

### Desplegar

```bash
# reemplazar los archivos en el repo de GitHub Pages
cp index.html styles.css contenido.defaults.js catalogo.defaults.js \
   /ruta/al/repo/Arvure-page/
git add -A && git commit -m "Rediseño Studio Minimal" && git push
```

---

## Bugs corregidos (encontrados en el sitio en vivo)

### 1. El hero caía al final de la página
`SECCIONES_DEFECTO` no incluía `inicio`, `servicios` ni `newsletter`. El script de
reordenamiento (`main.appendChild(fragment)`) dejaba esas tres secciones fuera de la
lista y las empujaba **al final**. Cualquier visitante nuevo veía primero
*"Tres formas de escalar tu operación"* y el hero recién en el pie.

**Fix:** el script ahora fija `inicio` y `servicios` al principio (`const fijas = ['inicio','servicios']`)
y respeta el orden del admin para el resto.

### 2. El H1 duplicaba la frase
`HERO_DEFECTO.titulo2 = "lo que te frena. Construimos lo que te escala."` se inyectaba
completo en el `<em>`, produciendo en pantalla:

> "Automatizamos **lo que te frena.** Construimos **lo que te frena. Construimos lo que te escala.**"

**Fix:** el título se reparte en tres partes (`data-hero-l1/l2/l3`) derivándolas del
mismo campo `titulo2` que edita el admin. Se eliminó además el punto duplicado
(`"lo que te frena.."`).

---

## Sistema de diseño

### Color
Un solo acento: **azul Apple `#0071E3`** (oscuro: `#2997FF`). Todo lo demás es
monocromático. Superficies: `#FFFFFF` / `#F5F5F7` / `#000000`.
Tinta: `#1D1D1F` · `#6E6E73` · `#86868B`.
**Eliminado** el amarillo mostaza `#FFE066` (usado 8 veces como "resaltador" y badge).

### Tipografía
`-apple-system / SF Pro Display` con fallback a `Inter` / `Helvetica Neue`.
**Cero webfonts** → sin petition a Google, render más rápido.
Escala fluida con `clamp()`:

| Rol | Tamaño | Tracking | Peso |
|---|---|---|---|
| Display (H1) | `clamp(2.75rem, 6.2vw, 4.75rem)` | `-0.045em` | 700 |
| Headline (H2) | `clamp(2.1rem, 4.9vw, 3.6rem)` | `-0.04em` | 700 |
| Lead | `clamp(1.06rem, 1.35vw, 1.31rem)` | `-0.012em` | 400 |
| Body | `1rem` | — | 400 |
| Eyebrow / meta | `11px` mono, `0.16em` | — | 600 |

El mono (SF Mono) queda **solo** para eyebrows, metadatos y etiquetas técnicas —
antes se usaba en botones, stats y copyright, lo que generaba ruido de terminal.

### Espaciado
Ritmo vertical modular: `--bay: clamp(88px, 11vw, 168px)` por sección,
gutter `clamp(20px, 5vw, 40px)`, contenedor `1200px`.
Antes todas las secciones usaban `py-16 / lg:py-20` (sin progresión).

### Grid (12 col, 6 tracks)
- **Soluciones** → `4+2 / 2+2+2 / banda ancha` (la 6ta tarjeta es horizontal)
- **Stack** → `3+3+3` iguales
- **Casos** → `4+2 / 2+2+2 / 2+2+2`

Todos sin huecos. El grid anterior era simétrico (`md:grid-cols-3` en todo).

### Radios y bordes
`8 / 12 / 16 / 22 / 28px` + pill `980px`. Bordes `1px rgba(0,0,0,.09)`.
Sombras difusas: `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.045)`.

---

## Componentes

- **Nav flotante** — `position: fixed`, `backdrop-filter: blur(22px) saturate(180%)`,
  se vuelve "glass" al hacer scroll (`.is-stuck`).
- **Hero** — titular a 2 líneas a sangre (`Automatizamos lo que te frena.` /
  `Construimos lo que te escala.`), un solo acento tipográfico (gris atenuado vs. negro),
  panel del sistema con nodo central azul, chip de vidrio flotante y 3 stats.
- **Tarjetas** — borde hairline, `translateY(-4px)` + sombra al hover, zoom 1.04 en la foto.
- **Steps** — rail vertical con separadores hairline y numeración monoespaciada.
- **Planes** — el plan destacado se invierte (negro en claro, blanco en oscuro).
- **FAQ** — `details/summary` con signo `+` que rota a `×`.
- **Footer** — negro, wordmark "Arvure" a `12rem`.
- **Reveal** — `IntersectionObserver`, `translateY(20px) → 0` en 850ms con
  `cubic-bezier(.22,1,.36,1)`; respeta `prefers-reduced-motion`.

## Modo oscuro
Tokens por `prefers-color-scheme`. Sin selector manual: el sitio se adapta solo.

## Accesibilidad
- `:focus-visible` con anillo azul de 2px.
- Contraste AA en cuerpo (`#6E6E73` sobre blanco = 5.1:1).
- `aria-pressed` en los filtros, `aria-expanded` implícito en `details`,
  `role="img"` + `aria-label` en el SVG del hero.
- `alt` descriptivo en todas las imágenes.

---

## Compatibilidad con el panel de administración

Se preservaron **todos** los hooks que el admin usa (`localStorage` con prefijo `fabrica_`):

| Hook | Estado |
|---|---|
| `fabrica_catalogo` | ✅ se lee y migra igual |
| `fabrica_hero` | ✅ se lee; ahora reparte el título en 3 spans |
| `fabrica_orden_secciones` | ✅ se respeta, con `inicio` y `servicios` fijos al inicio |
| `fabrica_custom_nombres` | ✅ se sigue generando, con el nuevo estilo |
| `fabrica_suscriptores` | ✅ newsletter igual |

Atributos `data-*` intactos: `data-hero-*`, `data-grid-ideas`, `data-abrir-idea`,
`data-filtro-eje`, `data-encargo`, `data-newsletter`, `data-anio`, `data-cerrar-idea`.

El CDN de Tailwind se mantiene en `<head>` **solo** para el markup que inyecta el
admin; su `tailwind.config` se remapeó a los tokens nuevos. El diseño visible
no depende de Tailwind.

---

## Nota de contenido

`contenido.defaults.js` ahora define `titulo2` como la frase completa
("lo que te frena. Construimos lo que te escala."). Si el admin tiene un hero
guardado con el valor viejo, el script lo reparte igual; para recuperar el
título original basta con borrar la clave `fabrica_hero` del `localStorage`.
