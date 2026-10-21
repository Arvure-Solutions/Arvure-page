/* Contenido por defecto — editable desde el panel de administración.
   Los valores se guardan en localStorage bajo el prefijo "fabrica_".
   Nota: el título del hero se divide en titulo1 / titulo2 / titulo3 para
   evitar la duplicación de frases que existía en la versión anterior. */
window.HERO_DEFECTO = {
  badge: "ESTUDIO TECH · AUTOMATIZACIÓN & PRODUCTO",
  titulo1: "Automatizamos",
  titulo2: "lo que te frena. Construimos lo que te escala.",
  parrafo: "Somos el nodo que conecta tu operación. Automatizaciones, páginas web y aplicaciones a medida — sin humo, sin plantillas eternas.",
  boton1: "Empezar proyecto →",
  boton1link: "#contacto",
  boton2: "Ver soluciones",
  boton2link: "#ideas",
  ejes: "NODOS · AUTOMATIZACIONES · WEBS · APPS",
  imagen: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
  fig: "ARQUITECTURA DE NODOS · VER CASOS →",
  figcaption: "Arquitectura de nodos · Ver casos →",
  figlink: "#casos"
};

/* Orden de secciones. El hero ("inicio") y la tira de capacidades
   ("servicios") quedan fijados al inicio por el script de la página. */
window.SECCIONES_DEFECTO = [
  { id: "ideas", nombre: "Soluciones" },
  { id: "punto-de-partida", nombre: "Cómo trabajamos" },
  { id: "sobre-nos", nombre: "Estudio" },
  { id: "proceso-creativo", nombre: "Stack & Método" },
  { id: "casos", nombre: "Casos de éxito" },
  { id: "primer-paso", nombre: "Primer paso" },
  { id: "faq", nombre: "FAQ" },
  { id: "newsletter", nombre: "Newsletter" },
  { id: "contacto", nombre: "Contacto" }
];
