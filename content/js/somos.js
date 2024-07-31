const nuestroEquipo = document.getElementById("nuestroEquipo");
const listaPremios = document.getElementById("listaPremios");
const listaSectores = document.getElementById("listaSectores");
const capacidadesContent = document.getElementById("capacidadesContent");

const equipo = [
  {
    img: "/content/img/somos/persona.png",
    alt: "",
    nombre: "Maria Shevcensko",
    rol: "Front-End Ninja",
  },
  {
    img: "/content/img/somos/persona.png",
    alt: "",
    nombre: "Maria Shevcensko",
    rol: "Front-End Ninja",
  },
  {
    img: "/content/img/somos/persona.png",
    alt: "",
    nombre: "Maria Shevcensko",
    rol: "Front-End Ninja",
  },
  {
    img: "/content/img/somos/persona.png",
    alt: "",
    nombre: "Maria Shevcensko",
    rol: "Front-End Ninja",
  },
];
const premios = [
  "2019 Hunger Boss - Awwwwards",
  "2019 Hunger Boss - Awwwwards",
  "2019 Hunger Boss - Awwwwards",
  "2019 Hunger Boss - Awwwwards",
  "2019 Hunger Boss - Awwwwards",
  "2019 Hunger Boss - Awwwwards",
  "2019 Hunger Boss - Awwwwards",
];
const sectores = [
  "Consumo masivo: Alimentos y Bebidas",
  "Construcción y Herramientas",
  "Entretenimiento y Medios",
  "Tecnología",
  "Retail y Comercio",
  "Turismo",
  "Farmacéutica",
  "E-commerce y ventas en línea"
];
const capacidades = [
  {
    img: "/content/img/somos/imgCapacidad.png",
    alt: "",
    title: "COMUNICACIÓN",
    texto: "Creación de ideas transformadoras que impulsan ventas y construyen marcas cercanas a sus consumidores.",
  },
  {
    img: "/content/img/somos/imgCapacidad.png",
    alt: "",
    title: "CONVERSIÓN",
    texto: "Conectamos con mensajes precisos y relevantes, transformando el interés en acciones efectivas.",
  },
  {
    img: "/content/img/somos/imgCapacidad.png",
    alt: "",
    title: "ENTRETENIMIENTO",
    texto: "Fusionamos la marca con el entretenimiento para generar contenido atractivo que capture la atención y el interés.",
  },
  {
    img: "/content/img/somos/imgCapacidad.png",
    alt: "",
    title: "EXPERIENCIA",
    texto: "Diseñamos experiencias singulares que despiertan la imaginación y el interés, tanto en el mundo digital como en el real.",
  },
  {
    img: "/content/img/somos/imgCapacidad.png",
    alt: "",
    title: "SERVICIO",
    texto: "Implementamos estrategias de CRM basadas en datos sólidos para fomentar relaciones duraderas y significativas.",
  },
  {
    img: "/content/img/somos/imgCapacidad.png",
    alt: "",
    title: "TRANSFORMACIÓN",
    texto: "Elaboramos acciones innovadoras para acelerar el crecimiento y garantizar la evolución continua de los negocios.",
  },
];

// Nuestro Equipo
for (let e = 0; e < equipo.length; e++) {
  nuestroEquipo.innerHTML += `
    <div>
      <figure class="equipoFigure">
        <img src="${equipo[e].img}" alt="${equipo[e].alt}">
        <figcaption>
          <p>${equipo[e].nombre}</p>
          <small>${equipo[e].rol}</small>
        </figcaption>
      </figure>
    </div>
  `;
}

$("#nuestroEquipo").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 1000,
  speed: 500,
  swipeToSlide: false,
  variableWidth: false,
})

// Premios
for (let premio = 0; premio < premios.length; premio++) {
  listaPremios.innerHTML += `
    <li>${premios[premio]}</li>
  `;
}

// Sectores
for (let sector = 0; sector < sectores.length; sector++) {
  listaSectores.innerHTML += `
    <li>${sectores[sector]}</li>
  `;
}

// Capacidades
for (let capacidad = 0; capacidad < capacidades.length; capacidad++) {
  capacidadesContent.innerHTML += `
    <div class="capacidad">
      <img src="${capacidades[capacidad].img}" alt="${capacidades[capacidad].alt}">
      <h3>${capacidades[capacidad].title}</h3>
      <p>${capacidades[capacidad].texto}</p>
    </div>
  `;
}