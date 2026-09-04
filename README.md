# Arvure — Estudio Tech

**Automatizamos lo que te frena. Construimos lo que te escala.**

Preview público colaborativo del rebrand de Arvure a estudio tech: **automatizaciones, páginas web, aplicaciones y nodos conectados**.

> Repo privado principal: [Arvure-Solutions/Arvure](https://github.com/Arvure-Solutions/Arvure) → `estudio-tech/`
> Este repo `Arvure-page` es el **preview público** para que todos puedan aportar y mejorar la página.

## 🌐 Preview (GitHub Pages)

Una vez activado Pages, la web estará en:

**https://arvure-solutions.github.io/Arvure-page/**

Rutas:
- `/` → Home
- `/admin.html` → Panel admin
- `/cliente.html` → Panel cliente
- `/login.html` → Login
- `/blog.html` → Blog

## 📁 Estructura

```
index.html      # Home (hero nodos, ticker, Soluciones, Stack)
admin.html      # Panel admin (catálogo, agenda nodos)
cliente.html    # Panel cliente
login.html      # Selector de acceso
blog.html       # Blog
ARVURE_TECH.md  # Documentación del rebrand (paleta, mapeo, checklist)
```

## 🎨 Dirección de diseño

- Fondo `#FFFBF0` (cream), superficies `#FFFFFF`, borde `#E8E0D0`
- Texto `#0A0A0A` / `#6B6B6B`, acentos `#FFE066` highlight, `#0A7F3D` ok
- Tipografía `Inter`, `JetBrains Mono` para labels
- Concepto **Nodos conectados**: logo nodo + hero 6 nodos (CRM/WEB/APP/AUTO/NODO/DATA)

Ver detalle completo en [ARVURE_TECH.md](./ARVURE_TECH.md).

## 🤝 Cómo colaborar

1. Fork este repo o clona directo si tenés acceso a `Arvure-Solutions`
2. Crea rama: `git checkout -b feat/tu-mejora`
3. Edita los HTML (todo es estático, sin build)
4. Commit y PR: `gh pr create --fill`

Datos mock viven en `localStorage` prefijo `fabrica_*`. Para resetear tras cambios de catálogo:

```js
localStorage.removeItem('fabrica_catalogo')
localStorage.removeItem('fabrica_posts')
location.reload()
```

## 📄 Licencia

Privado — Arvure Solutions.
