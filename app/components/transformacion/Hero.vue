<template>
  <section ref="root"
    class="h-dvh w-full sticky top-0 overflow-hidden bg-negro [--r:1.5rem] md:[--r:2rem] lg:[--r:2.5rem]"
    :class="cubierto && 'invisible'">
    <video ref="video"
      src="https://q7epkagsjeo0w9l9.public.blob.vercel-storage.com/video/hero-transfromacion-tecnologica.mp4"
      poster="/img/posters/hero-transformacion.jpg" class="size-full object-cover absolute inset-0" autoplay loop muted
      playsinline preload="metadata" />
    <div class="absolute inset-0 bg-black/40" />

    <div class="absolute bottom-0 inset-x-0 z-10 flex items-end justify-between md:gap-12">
      <div
        class="hero-tab-mobile flex flex-col gap-6 px-4 py-6 md:contents">
        <div ref="columna" class="hero-col flex flex-col items-center md:items-start min-w-0">
          <p ref="paso"
            class="text-blanco lg:text-xl font-medium leading-none md:pt-5 lg:pt-6 md:pr-6 lg:pr-8 md:pl-6 lg:pl-8 xxl:pl-10">
            La transformación IA ya empezó.
          </p>
          <div class="md:pr-6 lg:pr-12 md:pl-4 lg:pl-6 xl:pl-8 xxl:pl-10 md:pb-6 lg:pb-8 pt-3 md:pt-4 lg:pt-6">
            <UiHeadingH1 class="md:max-w-86 lg:max-w-114 xl:max-w-146 xxxl:max-w-212 text-amarillo xl:text-3xl! xxxl:text-[2.75rem]! text-center md:text-start">
              ¿Cuánto está perdiendo tu empresa por quedarse afuera de la transformación?
            </UiHeadingH1>
          </div>
        </div>

        <div
          class="hero-tab-right flex flex-col xl:flex-row items-stretch xl:items-center max-md:self-center gap-2 lg:gap-4 shrink-0 md:pt-5 lg:pt-6 md:pl-6 lg:pl-8 md:pr-6 lg:pr-8 xxl:pr-10 md:pb-6 lg:pb-8">
          <UiButtonPrimary variant="glass" size="glass" class="gap-3 pl-6 pr-4">
            Agendar una llamada
            <Icon name="material-symbols:calendar-month-outline-rounded" class="size-4 lg:size-6 shrink-0" />
          </UiButtonPrimary>
          <UiButtonPrimary variant="glass" size="glass" class="gap-3 pl-6 pr-4">
            Solicitar auditoría
            <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
          </UiButtonPrimary>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const root = useTemplateRef('root')
const video = useTemplateRef('video')
const columna = useTemplateRef('columna')
const paso = useTemplateRef('paso')
const cubierto = ref(false)
let observer

function revisar() {
  if (!root.value) return
  const tapado = window.scrollY >= root.value.offsetHeight
  if (tapado === cubierto.value) return

  cubierto.value = tapado
  if (tapado) video.value?.pause()
  else video.value?.play().catch(() => { })
}

function medirPaso() {
  if (!columna.value || !paso.value) return
  columna.value.style.setProperty('--sw', `${Math.round(paso.value.offsetWidth)}px`)
  columna.value.style.setProperty('--sh', `${Math.round(paso.value.offsetHeight)}px`)
}

onMounted(() => {
  revisar()
  window.addEventListener('scroll', revisar, { passive: true })
  medirPaso()
  observer = new ResizeObserver(medirPaso)
  observer.observe(paso.value, { box: 'border-box' })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', revisar)
  observer?.disconnect()
})
</script>

<style scoped>
.hero-tab-mobile,
.hero-col,
.hero-tab-right {
  --tab-bg: rgb(221 221 221 / 0.24);
  --tab-backdrop: blur(24px) saturate(180%);
}

@media (width < 768px) {
  .hero-tab-mobile {
    --top: var(--r);
    --tr: var(--r);
    --fr: var(--r);
  }
}

@media (width >= 768px) {
  .hero-tab-right {
    --top: var(--r);
    --tr: var(--r);
    --fr: var(--r);
  }
}

@media (width < 768px) {
  .hero-tab-mobile {
    position: relative;
  }

  .hero-tab-mobile::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    bottom: 0;
    top: calc(-1 * var(--top));
    right: calc(-1 * var(--fr));
    pointer-events: none;
    background: var(--tab-bg);
    -webkit-backdrop-filter: var(--tab-backdrop);
    backdrop-filter: var(--tab-backdrop);
    mask-image:
      linear-gradient(#000 0 0),
      linear-gradient(#000 0 0),
      linear-gradient(#000 0 0),
      radial-gradient(circle at 0 100%, #000 calc(var(--tr) - 0.5px), transparent var(--tr)),
      radial-gradient(circle at 100% 100%, #000 calc(var(--tr) - 0.5px), transparent var(--tr)),
      radial-gradient(circle at 100% 0, transparent calc(var(--fr) - 0.5px), #000 var(--fr));
    mask-size:
      calc(100% - var(--fr) - 2 * var(--tr)) calc(100% - var(--top)),
      var(--tr) calc(100% - var(--top) - var(--tr)),
      var(--tr) calc(100% - var(--top) - var(--tr)),
      var(--tr) var(--tr),
      var(--tr) var(--tr),
      var(--fr) var(--fr);
    mask-position:
      left var(--tr) bottom 0,
      right var(--fr) bottom 0,
      left 0 bottom 0,
      right var(--fr) top var(--top),
      left 0 top var(--top),
      right 0 bottom 0;
    mask-repeat: no-repeat;
  }
}

@media (width >= 768px) {
  .hero-tab-right {
    position: relative;
  }

  .hero-col {
    --rs: calc(var(--r) / 2);
    position: relative;
  }

  .hero-col::before,
  .hero-tab-right::before {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 0;
    top: calc(-1 * var(--r));
    pointer-events: none;
    background: var(--tab-bg);
    -webkit-backdrop-filter: var(--tab-backdrop);
    backdrop-filter: var(--tab-backdrop);
    mask-repeat: no-repeat;
  }

  .hero-col::before {
    left: 0;
    right: calc(-1 * var(--r));
    mask-image:
      radial-gradient(circle at 100% 0, transparent calc(var(--r) - 0.5px), #000 var(--r)),
      linear-gradient(#000 0 0),
      linear-gradient(#000 0 0),
      radial-gradient(circle at 0 100%, #000 calc(var(--rs) - 0.5px), transparent var(--rs)),
      radial-gradient(circle at 100% 0, transparent calc(var(--rs) - 0.5px), #000 var(--rs)),
      linear-gradient(#000 0 0),
      linear-gradient(#000 0 0),
      radial-gradient(circle at 0 100%, #000 calc(var(--r) - 0.5px), transparent var(--r)),
      radial-gradient(circle at 100% 0, transparent calc(var(--r) - 0.5px), #000 var(--r));
    mask-size:
      var(--r) var(--r),
      calc(var(--sw, 0px) - var(--rs)) calc(var(--sh, 0px) + 1px),
      var(--rs) calc(var(--sh, 0px) - var(--rs) + 1px),
      var(--rs) var(--rs),
      var(--rs) var(--rs),
      calc(100% - 2 * var(--r)) calc(100% - var(--r) - var(--sh, 0px)),
      var(--r) calc(100% - 2 * var(--r) - var(--sh, 0px)),
      var(--r) var(--r),
      var(--r) var(--r);
    mask-position:
      left 0 top 0,
      left 0 top var(--r),
      left calc(var(--sw, 0px) - var(--rs)) top calc(var(--r) + var(--rs)),
      left calc(var(--sw, 0px) - var(--rs)) top var(--r),
      left var(--sw, 0px) top calc(var(--r) + var(--sh, 0px) - var(--rs)),
      left 0 bottom 0,
      right var(--r) bottom 0,
      right var(--r) top calc(var(--r) + var(--sh, 0px)),
      right 0 bottom 0;
  }

  .hero-tab-right::before {
    right: 0;
    left: calc(-1 * var(--fr));
    mask-image:
      linear-gradient(#000 0 0),
      linear-gradient(#000 0 0),
      radial-gradient(circle at 100% 100%, #000 calc(var(--tr) - 0.5px), transparent var(--tr)),
      radial-gradient(circle at 0 0, transparent calc(var(--top) - 0.5px), #000 var(--top)),
      radial-gradient(circle at 0 0, transparent calc(var(--fr) - 0.5px), #000 var(--fr));
    mask-size:
      calc(100% - var(--fr) - var(--tr)) calc(100% - var(--top)),
      var(--tr) calc(100% - var(--top) - var(--tr)),
      var(--tr) var(--tr),
      var(--top) var(--top),
      var(--fr) var(--fr);
    mask-position:
      right 0 bottom 0,
      left var(--fr) bottom 0,
      left var(--fr) top var(--top),
      right 0 top 0,
      left 0 bottom 0;
  }
}
</style>
