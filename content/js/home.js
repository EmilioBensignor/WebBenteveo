const logoSlider = document.getElementById("logoSlider");

const logosClientes = [
  {
    img: "ajinomoto.webp",
    alt: "Ajinomoto",
    nombre: "Ajinomoto",
  },
  {
    img: "abasto.webp",
    alt: "Logo Abasto",
    nombre: "Abasto Shopping",
  },
  {
    img: "bangho.webp",
    alt: "Logo Bangho",
    nombre: "Bangho",
  },
  {
    img: "barbieri.webp",
    alt: "Barbieri",
    nombre: "Barbieri",
  },
  {
    img: "bayer.webp",
    alt: "Logo Bayer",
    nombre: "Bayer",
  },
  {
    img: "danica.webp",
    alt: "Logo Danica",
    nombre: "Dánica",
  },
  {
    img: "disney.webp",
    alt: "Logo Disney",
    nombre: "Disney",
  },
  {
    img: "fam.webp",
    alt: "FAM",
    nombre: "Fundación Argentina de Mieloma",
  },
  {
    img: "fox.webp",
    alt: "FOX",
    nombre: "FOX Channel",
  },
  {
    img: "fruttami.webp",
    alt: "Fruttami",
    nombre: "Frutta-mi",
  },
  {
    img: "fuca.webp",
    alt: "Logo Fuca",
    nombre: "FUCA",
  },
  {
    img: "garbarino.webp",
    alt: "Logo Garbarino",
    nombre: "Garbarino",
  },
  {
    img: "irsa.webp",
    alt: "Logo Irsa",
    nombre: "IRSA",
  },
  {
    img: "klaukol.webp",
    alt: "Logo Klaukol",
    nombre: "Klaukol",
  },
  {
    img: "megatlon.webp",
    alt: "Logo Megatlon",
    nombre: "Megatlon",
  },
  {
    img: "melia.webp",
    alt: "Logo Melia",
    nombre: "Meliá Hotels International",
  },
  {
    img: "motoroma.webp",
    alt: "Motoroma",
    nombre: "Moto Roma",
  },
  {
    img: "msc.webp",
    alt: "Logo Msc",
    nombre: "MSC Cruceros",
  },
  {
    img: "parex.webp",
    alt: "Logo Parex",
    nombre: "Parex",
  },
  {
    img: "paty.webp",
    alt: "Logo Paty",
    nombre: "Paty",
  },
  {
    img: "qualy.webp",
    alt: "Logo Qualy",
    nombre: "Qualy",
  },
  {
    img: "quickfood.webp",
    alt: "Logo Quickfood",
    nombre: "Quickfood",
  },
  {
    img: "revear.webp",
    alt: "Logo Revear",
    nombre: "Revear",
  },
  {
    img: "sadia.webp",
    alt: "Logo Sadia",
    nombre: "Sadia",
  },
  {
    img: "sika.webp",
    alt: "Sika",
    nombre: "Sika",
  },
  {
    img: "sodimac.webp",
    alt: "Sodimac",
    nombre: "Sodimac",
  },
  {
    img: "starbucks.webp",
    alt: "Starbucks",
    nombre: "Starbucks",
  },
  {
    img: "vasser.webp",
    alt: "Vasser",
    nombre: "Vasser",
  },
  {
    img: "vietur.webp",
    alt: "Logo Vietur",
    nombre: "Vietur",
  },
];

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.swiperLogos')) {
    const swiperLogos = new Swiper('.swiperLogos', {
      slidesPerView: 3,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      spaceBetween: 16,
      breakpoints: {
        480: {
          slidesPerView: 4,
        },
        700: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
        992: {
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 6,
        },
      }
    })
  }
});

for (let logo = 0; logo < logosClientes.length; logo++) {
  logoSlider.innerHTML += `
    <div class="swiper-slide wow fadeInUp">
      <img src="/content/img/home/clientes/${logosClientes[logo].img}" alt="${logosClientes[logo].alt}" />
      <p>${logosClientes[logo].nombre}</p>
    </div>
  `;
}