const logoSlider = document.getElementById("logoSlider");

const logosClientes = [
  {
    img: "abasto.png",
    alt: "Logo Abasto",
    nombre: "Abasto",
  },
  {
    img: "bangho.jpg",
    alt: "Logo Bangho",
    nombre: "Bangho",
  },
  {
    img: "bayer.svg",
    alt: "Logo Bayer",
    nombre: "Bayer",
  },
  {
    img: "danica.png",
    alt: "Logo Danica",
    nombre: "Danica",
  },
  {
    img: "disney.svg",
    alt: "Logo Disney",
    nombre: "Disney",
  },
  {
    img: "fuca.svg",
    alt: "Logo Fuca",
    nombre: "Fuca",
  },
  {
    img: "garbarino.svg",
    alt: "Logo Garbarino",
    nombre: "Garbarino",
  },
  {
    img: "irsa.png",
    alt: "Logo Irsa",
    nombre: "Irsa",
  },
  {
    img: "klaukol.svg",
    alt: "Logo Klaukol",
    nombre: "Klaukol",
  },
  {
    img: "megatlon.png",
    alt: "Logo Megatlon",
    nombre: "Megatlon",
  },
  {
    img: "melia.svg",
    alt: "Logo Melia",
    nombre: "Melia",
  },
  {
    img: "msc.png",
    alt: "Logo Msc",
    nombre: "Msc",
  },
  {
    img: "parex.svg",
    alt: "Logo Parex",
    nombre: "Parex",
  },
  {
    img: "paty.svg",
    alt: "Logo Paty",
    nombre: "Paty",
  },
  {
    img: "qualy.svg",
    alt: "Logo Qualy",
    nombre: "Qualy",
  },
  {
    img: "quickfood.png",
    alt: "Logo Quickfood",
    nombre: "Quickfood",
  },
  {
    img: "revear.svg",
    alt: "Logo Revear",
    nombre: "Revear",
  },
  {
    img: "sadia.svg",
    alt: "Logo Sadia",
    nombre: "Sadia",
  },
  {
    img: "vie-tur.svg",
    alt: "Logo Vietur",
    nombre: "Vietur",
  },
];
const logosDuplicados = [...logosClientes, ...logosClientes, ...logosClientes];

for (let logo = 0; logo < logosDuplicados.length; logo++) {
  logoSlider.innerHTML += `
    <div class="logoSlide wow fadeInUp">
      <img src="/content/img/${logosDuplicados[logo].img}" alt="${logosDuplicados[logo].alt}" />
      <p>${logosDuplicados[logo].nombre}</p>
    </div>
  `;
}

$("#logoSlider").slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 1000,
  speed: 500,
  swipeToSlide: false,
  variableWidth: false,
});