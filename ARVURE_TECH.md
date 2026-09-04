# Arvure — Rebrand a Estudio Tech

Documento de los cambios aplicados para pasar de **fábrica de ideas** a **estudio tech: automatizaciones, páginas web, aplicaciones y nodos conectados**.

Fecha: 2026-09-04
Carpeta: `Arvure/`

---

## 1. Dirección de diseño

- **Fondo:** huevo cálido `#FFFBF0` (cream) — minimalista, claro, cálido.
- **Superficies:** `#FFFFFF` (paper) para cards/dialogs.
- **Borde:** `#E8E0D0` (line) — contraste suave, no gris frío.
- **Texto:** `#0A0A0A` (ink) para títulos/cuerpo, `#6B6B6B` (muted/dim) para secundario, `#9A9A9A` para captions.
- **Acentos:** `ink` (negro) para CTAs primarios `rounded-full bg-ink text-cream`, `#FFE066` (amarillo) solo como highlight, `#0A7F3D` ok, `#FF3B30` error.
- **Tipografía:** `Inter 400/500/700/800/900` para todo (títulos `font-black tracking-[-0.03em]`), `JetBrains Mono` para labels/mono, `Space Grotesk` eliminado.
- **Concepto Nodos:** logo nodo (3 círculos + líneas), visual hero de 6 nodos interconectados (CRM/WEB/APP/AUTO/NODO/DATA), ticker `NODOS CONECTADOS`.
- **Forma:** `rounded-2xl`, `shadow-card`, sin `glow` neón.

---

## 2. Mapeo de compatibilidad (admin/cliente)

Para no romper el JS existente que usa clases legacy (`bg-lavanda`, `border-edge`, `bg-panel`, etc.), se re-mapearon en `tailwind.config`:

```js
// admin.html:16, cliente.html:13, login.html:13
panel:   '#FFFBF0',  // antes #0A0A14
surface: '#FFFFFF',  // antes #34344E
edge:    '#E8E0D0',  // antes #3A3A46
ink:     '#0A0A0A',
dim:     '#6B6B6B',
lavanda: '#0A0A0A',  // lavanda ahora es negro → botones activos siguen funcionando
sol:     '#FFE066',
play:    '#FF3B30',
ok:      '#0A7F3D',
```

Así `bg-lavanda`, `text-lavanda`, `border-lavanda` siguen existiendo pero pintan negro/tech.

---

## 3. Archivos modificados

### 3.1 `index.html` — home completa reescrita
- `index.html:1` nuevo `<title>` y `<meta description>` tech.
- `index.html:15` nuevo `tailwind.config` con paleta clara, `fontFamily.sans: Inter`, `boxShadow.card`.
- `index.html:53` header sticky claro `bg-cream/80 backdrop-blur-xl`, logo nodo SVG + `ESTUDIO TECH`.
- `index.html:81` Hero: badge `ESTUDIO TECH · AUTOMATIZACIÓN & PRODUCTO`, H1 bold `Automatizamos lo que te frena. Construimos lo que te escala.` con highlight `#FFE066`, SVG de nodos (6 círculos + líneas + pulso), stats 120+/40+/24h, ejes `NODOS · AUTOMATIZACIONES · WEBS · APPS`.
- `index.html:147` Ticker `bg-ink text-cream` con `AUTOMATIZACIONES · PÁGINAS WEB · APPS · INTEGRACIONES · BOTS · SCRAPING · NODOS`.
- `index.html:165` Sección `#ideas` renombrada a **Soluciones** (3 columnas, filtros `Automatizaciones/Webs/Apps/Nodos`, cards `rounded-2xl border-line bg-paper`).
- `index.html:219` `#punto-de-partida` → **Cómo trabajamos** (Discovery/Prototipo/Escalado) + 2 planes `Starter USD 400` / `Sistema completo USD 1.200`.
- `index.html:297` `#sobre-nos` → **Estudio** (stack híbrido Next.js/Python/n8n/Supabase, 100% a medida).
- `index.html:361` `#proceso-creativo` → **Stack & Método** (01 Automatización, 02 Web, 03 Nodos event-driven).
- `index.html:418` `#primer-paso` → 4 pasos 01-04 (charla 20min).
- `index.html:462` `#faq` 5 preguntas tech, `index.html:513` newsletter, `index.html:545` contacto con form `Automatización/Web/App/Integración`.
- `index.html:375` migración: si `catalogo.some(id.startsWith('idea_'))` reemplaza por `CATALOGO_DEFECTO` tech.

### 3.2 `catalogo.defaults.js`
- `catalogo.defaults.js:1` 6 soluciones tech con `id: sol_00x`, `eje: Automatizaciones/Webs/Apps/Nodos`, `tipo: automatizacion/web/app/nodo`, precios `desde USD 400-1500`, copys de flujos n8n/Next.js.
- Antes: 4 ideas fabriles `idea_002..005` con ejes Empresas/Personas/Perfiles.

### 3.3 `contenido.defaults.js`
- `contenido.defaults.js:1` `HERO_DEFECTO` tech: badge `ESTUDIO TECH`, titulo `Automatizamos / lo que te frena. Construimos lo que te escala.`, párrafo nodo, ejes `NODOS · AUTOMATIZACIONES...`.
- `contenido.defaults.js:11` `SECCIONES_DEFECTO` renombradas: `Soluciones / Cómo trabajamos / Estudio / Stack & Método`.

### 3.4 `posts.defaults.js`
- `posts.defaults.js:1` 3 posts tech: `automatizar-sin-perder-control`, `por-que-tu-web-deberia-ser-un-nodo`, `stack-hibrido-no-code-code` (antes arco dramático/mirada/montaje).

### 3.5 `blog.html` — reescrito
- `blog.html:14` paleta clara, `fontFamily: Inter`, `bg-cream`.
- `blog.html:44` header nodo, `blog.html:58` H1 `Ideas que se convierten en sistema.` + subtítulo casos reales.
- `blog.html:105` migración: si `slug.includes('arco-dramatico')` resetea a `POSTS_DEFECTO` tech.

### 3.6 `admin.html` — reescrito completo, misma paleta
- `admin.html:6` icon nodo, `admin.html:12` fonts Inter, `admin.html:16` config clara mapeada.
- `admin.html:49` login `rounded-2xl bg-surface`, badge `Nodos operativos`, botón `rounded-full bg-ink`.
- `admin.html:68` aside `bg-surface`, logo nodo, nav: `Catálogo de soluciones`, `Agenda de nodos` (antes fábrica).
- `admin.html:97` header `Nodos operativos` con dot `bg-ok`.
- `admin.html:113` dashboard: `Buen día, Julio.` bold, KPIs `Soluciones`, gráfico `bg-ink`.
- `admin.html:273` catálogo: tabla `Solución/Título/Eje/Estado`, diálogo `Nueva solución` con `tipo: automatizacion/web/app/nodo`, `eje: Automatizaciones/Webs/Apps/Nodos`, ids `sol_XXX`.
- `admin.html:410` migración catálogo/posts legacy en carga.
- Resto de vistas (órdenes, pagos, mensajes, agenda, config) actualizadas a copy tech (`Automatización/Web/App`, `Sprints`, `n8n/Python/Next.js/Supabase`).

### 3.7 `login.html` — reescrito
- `login.html:6` icon nodo, `login.html:13` paleta clara, `login.html:44` header nodo, `login.html:63` hero `¿Quién entra?` bold, 2 cards `Panel admin` / `Mi panel` con `rounded-2xl shadow-card`.

### 3.8 `cliente.html` — reescrito
- `cliente.html:13` paleta clara mapeada, `cliente.html:44` login `Clientes · Estudio Tech`, `cliente.html:68` aside `panel cliente · nodos`.
- `cliente.html:106` vistas: `Hola, —` con `bg-ink`, proyecto principal con `brief→prod`, hitos de sprints, entregables `ZIP/JSON/PDF`, pagos con `50/50`.

---

## 4. Cómo ver los cambios

Los datos viven en `localStorage` bajo prefijo `fabrica_` (se mantiene por compatibilidad):
- `fabrica_catalogo`, `fabrica_posts`, `fabrica_hero`, `fabrica_orden_secciones`

Si venís de la versión fabril, la primera carga detecta `idea_*` y resetea automáticamente a tech. Para forzar:

```js
localStorage.removeItem('fabrica_catalogo');
localStorage.removeItem('fabrica_posts');
localStorage.removeItem('fabrica_hero');
location.reload();
```

O desde consola:

```powershell
# Borrar todo lo de Arvure
python -c "import os; print('recargar con Ctrl+Shift+R')"
```

---

## 5. Checklist visual

- [x] Fondo crema cálido en todas las páginas
- [x] Títulos bold `font-black` (no serif light)
- [x] Logo nodo en header de las 5 páginas
- [x] Hero con sistema de nodos SVG
- [x] Ticker negro con servicios tech
- [x] Soluciones 6 cards tech
- [x] Admin/cliente/login en misma paleta clara
- [x] Migración automática de datos legacy

---

## 6. Próximos pasos sugeridos

- Unificar nombre de storage a `arvure_*` (hoy sigue `fabrica_*` por compatibilidad).
- Reemplazar imágenes placeholder por capturas reales de proyectos/nodos.
- Añadir animación de líneas entre nodos en hero (opcional, hoy estático + pulso).
