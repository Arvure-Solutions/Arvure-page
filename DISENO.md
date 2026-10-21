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

---

## v2 · Reposicionamiento y copy (board + auditoría ejecutiva)

### Veredicto de la board
**MESA/CONSEJO — SILLAS:** BEZOS · HORMOZI · BUFFETT · VAYNERCHUK · CLIENTE PYME (contrapeso)
**VEREDICTO:** agrupar por capacidad, **pero no borrar la prueba** (A′ — opción A modificada)
**CONDICIONES:** (1) cada agrupación lleva un problema concreto + link a un sistema real;
(2) el precio sale de la grilla y queda en un solo bloque; (3) ninguna afirmación numérica
que no sea defendible en una llamada.

| Silla | Voto | Argumento |
|---|---|---|
| BEZOS | A′ 8/10 | Cambiar copy y portafolio es puerta de dos vías: reversible, barato, se mide en 2 semanas. Decidí hoy. |
| HORMOZI | A′ 7/10 | Agrupar sube el valor percibido (breadth) pero baja la probabilidad percibida si no queda evidencia. Por eso: agrupación **+** link real. |
| BUFFETT | A′ 6/10 | En un estudio de 1–2 personas la prueba ES el activo. "Desde USD 400" × 6 tarjetas en el primer scroll ancla el ticket abajo. Por eso el precio sale de la grilla. |
| VAYNERCHUK | A′ 8/10 | Las categorías no detienen el scroll; las historias sí. Por eso el eje no es "apps" sino "el proceso que te consume horas". |
| CLIENTE PYME | A′ 6/10 | "Sin humo" le servía a ella, pero a vos te posiciona como barato. Se reemplaza por promesa concreta: precio cerrado y alcance. |

### Qué se cambió

**Voz (se eliminó la señal "low cost"):**

| Antes | Ahora |
|---|---|
| "sin humo, sin plantillas eternas" | "Diseñamos la arquitectura, escribimos el código y te entregamos todo: credenciales, documentación y capacitación." |
| "Auditamos tus procesos **gratis**" | "Relevamos tus procesos y te entregamos el mapa de qué automatizar primero, con el impacto estimado en horas." |
| "Sin compromiso · Propuesta en 48 h" | "Sin sorpresas: alcance, plazo y precio cerrado antes de empezar" |
| "Ves valor antes de pagar el total" | "Tres etapas con entregas parciales. Ves funcionando lo que pagás, no un informe." |
| "Lo automatizamos en 7 días **o te decimos que no se puede**" | "El primer flujo en producción, en 7 días. Si no lo podemos sostener con este nivel de ingeniería, te lo decimos antes de empezar." |
| "Somos **el nodo** que conecta tu operación" | "Automatizaciones, webs y apps a medida, integradas en un solo sistema." (la marca es sujeto, no componente) |
| "Starter · Automatización" | "Sprint de automatización" |
| "Sistema completo" | "Plataforma operativa" |
| "Si se puede resolver sin código, mejor" | "Herramientas maduras cuando alcanzan; código a medida cuando hace falta." |
| "24 h respuesta promedio" | "48 h de diagnóstico a propuesta" |
| Hero: "32 h ahorro · 99.9% uptime · 50+ APIs" | Hero: "Nodos · Eventos · APIs" (conceptos, sin números inventados) |
| 8 casos con nombre propio | **4 capacidades** con link a un sistema real |

**Portafolio:** la sección `#casos` pasó de 8 proyectos nombrados a **4 capacidades**
(Aplicaciones · Automatizaciones · Webs · Sistemas a medida), cada una con problema
concreto, 4 specs de stack y un enlace a un sistema en producción. El `id="casos"`
se conservó para no romper el orden gestionado desde el admin.

**Precios:** se sacaron de la grilla de 6 soluciones (quedan en el modal de detalle)
y quedan en un solo bloque: los 2 planes + la FAQ. El piso de la plataforma operativa
("USD 1.200") **no se cambió** — sube recién cuando se defina el costo real por semana
(ver pendientes).

### Pendientes que necesitan un dato real (no inventados)
1. **Costo real por semana** → recalibrar el piso de "Plataforma operativa". Hoy
   "web o app + panel + 4 nodos + soporte, 3–4 semanas" por USD 1.200 no cierra.
2. **Evidencia publicable**: 2–3 testimonios con nombre, un caso con ahorro real en
   horas y un NPS. Sin esto, subir precio produce "caro", que es peor que "barato".
3. **Fotos de las capacidades**: hoy son stock genérico. Con agrupación funcionan
   mejor, pero unas capturas reales de producto valen más.
4. **Renombrar "nodo"**: hoy el vocabulario de marca ("nodos.deploy", "nodo Arvure")
   te define como pieza y no como estudio. Es un cambio de marca, no de copy.
5. El campo `precio` del catálogo sigue editándose en el admin pero ya no se muestra
   en la grilla: se ve al abrir el detalle de cada solución.
