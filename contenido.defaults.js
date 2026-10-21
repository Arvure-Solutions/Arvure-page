/* Contenido por defecto — editable desde el panel de administración.
   Los valores se guardan en localStorage bajo el prefijo "fabrica_".
   Nota: el título del hero se reparte en tres tramos (data-hero-l1/l2/l3) a
   partir del campo titulo2, para evitar la duplicación de frases que
   existía en la versión anterior. */
window.HERO_DEFECTO = {
  badge: "ESTUDIO DE INGENIERÍA DE SOFTWARE · AUTOMATIZACIÓN, WEB Y APPS",
  titulo1: "Automatizamos",
  titulo2: "lo que te frena. Construimos lo que te escala.",
  parrafo: "Automatizaciones, webs y apps a medida, integradas en un solo sistema. Diseñamos la arquitectura, escribimos el código y te entregamos todo: credenciales, documentación y capacitación. Tu operación sigue funcionando aunque nosotros no estemos.",
  boton1: "Empezar proyecto",
  boton1link: "#contacto",
  boton2: "Ver soluciones",
  boton2link: "#ideas",
  ejes: "NODOS · EVENTOS · APIs · SISTEMAS CONECTADOS",
  imagen: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
  fig: "ARQUITECTURA DE NODOS · VER CAPACIDADES →",
  figcaption: "Arquitectura de nodos · Ver capacidades →",
  figlink: "#casos"
};

/* Orden de secciones. El hero ("inicio") y la tira de capacidades
   ("servicios") quedan fijados al inicio por el script de la página. */
window.SECCIONES_DEFECTO = [
  { id: "ideas", nombre: "Soluciones" },
  { id: "punto-de-partida", nombre: "Cómo trabajamos" },
  { id: "sobre-nos", nombre: "Estudio" },
  { id: "proceso-creativo", nombre: "Stack & Método" },
  { id: "casos", nombre: "Capacidades" },
  { id: "primer-paso", nombre: "Primer paso" },
  { id: "faq", nombre: "FAQ" },
  { id: "newsletter", nombre: "Newsletter" },
  { id: "contacto", nombre: "Contacto" }
];
