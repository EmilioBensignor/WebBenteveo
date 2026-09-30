export const preguntasSeguridad = [
  {
    tema: 'Relación con la IA',
    pregunta: '¿Cómo usa tu equipo herramientas como ChatGPT, Gemini o Copilot?',
    ayuda: 'No es lo mismo una cuenta personal gratuita que una licencia que administra la empresa: cambian las condiciones sobre tus datos.',
    opciones: [
      { texto: 'Cada persona con su propia cuenta, muchas veces gratuita.', puntos: 3 },
      { texto: 'Tenemos algunas licencias de empresa, pero también se usan cuentas personales.', puntos: 2 },
      { texto: 'Sólo con cuentas corporativas que administra la empresa.', puntos: 0 }
    ]
  },
  {
    tema: 'Información compartida',
    pregunta: '¿Qué tipo de información se pega o se sube en esas herramientas?',
    ayuda: 'Piensa en lo que pasa un día normal: correos, planillas, contratos, capturas de pantalla.',
    opciones: [
      { texto: 'Datos de clientes, contratos o información financiera.', puntos: 3 },
      { texto: 'Documentos internos, pero sin datos personales.', puntos: 2 },
      { texto: 'Sólo textos genéricos o información pública.', puntos: 0 },
      { texto: 'No lo sabemos con certeza.', puntos: 3 }
    ]
  },
  {
    tema: 'Reglas de uso',
    pregunta: '¿Existe una política escrita sobre qué se puede compartir con la IA?',
    ayuda: 'Una regla clara evita que cada persona decida por su cuenta qué información es sensible.',
    opciones: [
      { texto: 'Sí, el equipo la conoce y se aplica.', puntos: 0 },
      { texto: 'Existe, pero pocas personas la conocen.', puntos: 2 },
      { texto: 'No, cada uno usa la IA como le parece.', puntos: 3 }
    ]
  },
  {
    tema: 'Entrenamiento de modelos',
    pregunta: '¿Sabes si las herramientas que usan pueden entrenar sus modelos con tus datos?',
    ayuda: 'Muchas versiones gratuitas lo permiten por defecto, salvo que alguien lo desactive.',
    opciones: [
      { texto: 'Lo revisamos y está desactivado en todas las cuentas.', puntos: 0 },
      { texto: 'Creemos que no, pero no lo verificamos.', puntos: 2 },
      { texto: 'No sabíamos que eso podía pasar.', puntos: 3 }
    ]
  },
  {
    tema: 'Accesos y conexiones',
    pregunta: '¿Quién puede conectar la IA con el correo, el CRM o las carpetas de la empresa?',
    ayuda: 'Extensiones y apps de IA suelen pedir permisos amplios sobre tus sistemas con un solo clic.',
    opciones: [
      { texto: 'Sólo el área de sistemas, después de aprobarlo.', puntos: 0 },
      { texto: 'Cualquiera puede instalar una extensión o una app.', puntos: 3 },
      { texto: 'No lo tenemos claro.', puntos: 3 }
    ]
  },
  {
    tema: 'Transparencia',
    pregunta: '¿Usan chatbots o contenido generado con IA para hablar con clientes?',
    ayuda: 'La regulación europea exige avisar cuando una persona interactúa con un sistema de IA.',
    opciones: [
      { texto: 'Sí, y avisamos que es IA.', puntos: 0 },
      { texto: 'Sí, pero no lo indicamos.', puntos: 3 },
      { texto: 'No usamos IA de cara a clientes.', puntos: 0 }
    ]
  },
  {
    tema: 'Trazabilidad',
    pregunta: 'Si alguien compartiera información sensible con la IA por error, ¿podrían saberlo?',
    ayuda: 'Sin registros, un incidente puede pasar meses sin que nadie lo detecte.',
    opciones: [
      { texto: 'Sí, tenemos registros de uso.', puntos: 0 },
      { texto: 'Sólo si la persona lo avisa.', puntos: 2 },
      { texto: 'No, no tendríamos forma de saberlo.', puntos: 3 }
    ]
  },
  {
    tema: 'Formación',
    pregunta: '¿Tu equipo recibió formación sobre el uso seguro de la IA?',
    ayuda: 'La mayoría de las filtraciones no son ataques: son descuidos de alguien que no sabía el riesgo.',
    opciones: [
      { texto: 'Sí, y se actualiza periódicamente.', puntos: 0 },
      { texto: 'Hubo una charla puntual.', puntos: 1 },
      { texto: 'No, todavía no.', puntos: 3 }
    ]
  }
]

export const nivelesRiesgo = [
  {
    hasta: 6,
    nombre: 'Riesgo bajo',
    bajada: 'Buenas bases',
    texto: 'Tu empresa ya tiene buenas prácticas en el uso de IA. El siguiente paso es documentarlas y revisar cada nueva herramienta antes de sumarla, para que la exposición no crezca a medida que el equipo adopta más soluciones.',
    icon: 'material-symbols:verified-user-outline-rounded',
    color: 'text-emerald-400',
    fondo: 'bg-emerald-400'
  },
  {
    hasta: 14,
    nombre: 'Riesgo moderado',
    bajada: 'Hay puntos abiertos',
    texto: 'Parte de la información de tu empresa ya circula por herramientas de IA sin reglas claras. Todavía no es un problema grave, pero alcanza con un descuido para que datos de clientes o documentos internos queden fuera de tu control.',
    icon: 'material-symbols:error-outline-rounded',
    color: 'text-amarillo',
    fondo: 'bg-amarillo'
  },
  {
    hasta: Infinity,
    nombre: 'Riesgo crítico',
    bajada: 'Acción inmediata recomendada',
    texto: 'Información sensible de tu empresa probablemente ya está saliendo hacia servicios de IA sin control, sin registro y sin que nadie pueda revisarla. Además, el uso de IA de cara a clientes sin aviso puede incumplir el Artículo 50 del Reglamento Europeo de IA.',
    icon: 'material-symbols:warning-outline-rounded',
    color: 'text-red-400',
    fondo: 'bg-red-400'
  }
]

export const principiosSeguridad = [
  {
    icon: 'material-symbols:manage-search-rounded',
    title: 'Revisamos antes de integrar',
    text: 'Analizamos los sistemas, los accesos, los datos y las conexiones involucradas antes de sumar una solución.'
  },
  {
    icon: 'material-symbols:dns-outline',
    title: 'Priorizamos los datos bajo control',
    text: 'Cuando el proyecto lo permite, alojamos la base de conocimiento y el procesamiento de información sensible dentro de la infraestructura del cliente.'
  },
  {
    icon: 'material-symbols:shield-lock-outline-rounded',
    title: 'Protegemos la información cuando debe procesarse afuera',
    text: 'Si una parte del procesamiento requiere servicios externos, definimos qué datos pueden salir, aplicamos mecanismos de protección y controlamos cómo regresan a la operación.',
    garantias: ['Tus datos no entrenan modelos', 'No se comparten', 'No quedan en nuestros servidores', 'Accesos mínimos y temporales']
  },
  {
    icon: 'material-symbols:visibility-outline-rounded',
    title: 'Hacemos las decisiones visibles',
    text: 'Definimos quién puede acceder, qué puede hacer cada sistema, qué información queda registrada y cuándo debe intervenir una persona.'
  },
  {
    icon: 'material-symbols:hub-outline',
    title: 'Evitamos dependencias innecesarias',
    text: 'Diseñamos soluciones que no queden atadas a un único proveedor cuando técnicamente sea posible. Así, la empresa conserva mayor autonomía para decidir cómo evoluciona su tecnología.'
  }
]

export const normativas = [
  { nombre: 'EU AI Act', referencia: 'Reglamento (UE) 2024/1689' },
  { nombre: 'Data Act', referencia: 'Reglamento de Datos' },
  { nombre: 'Cyber Resilience Act', referencia: 'CRA' },
  { nombre: 'European Accessibility Act', referencia: 'Directiva (UE) 2019/882' }
]
