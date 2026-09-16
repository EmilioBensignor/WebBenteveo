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
        class="hero-tab-mobile flex flex-col gap-6 max-md:max-w-[calc(100%-3rem)] max-md:pt-4 max-md:pr-4 max-md:pl-4 max-md:sm:pl-6 max-md:pb-6 md:contents">
        <div class="flex flex-col items-start min-w-0">
          <p
            class="hero-step text-negro lg:text-xl font-medium leading-none md:pt-5 lg:pt-6 md:pr-6 lg:pr-8 md:pl-4 lg:pl-6 xl:pl-8 xxl:pl-10">
            La transformación IA ya empezó.
          </p>
          <div class="hero-tab-left md:pr-6 lg:pr-12 md:pl-4 lg:pl-6 xl:pl-8 xxl:pl-10 md:pb-6 lg:pb-8 pt-6">
            <UiHeadingH1 class="max-w-md lg:max-w-212 text-negro">
              ¿Cuánto está perdiendo tu empresa por quedarse afuera de la transformación?
            </UiHeadingH1>
          </div>
        </div>

        <div
          class="hero-tab-right flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-4 shrink-0 md:pt-5 lg:pt-6 md:pl-6 lg:pl-8 md:pr-8 lg:pr-12 xl:pr-16 xxl:pr-10 md:pb-6 lg:pb-8">
          <UiButtonPrimary variant="glass-dark" size="glass" class="gap-3 pl-6 pr-4">
            Agendar una llamada
            <Icon name="material-symbols:calendar-month-outline-rounded" class="size-4 lg:size-6 shrink-0" />
          </UiButtonPrimary>
          <UiButtonPrimary variant="glass-dark" size="glass" class="gap-3 pl-6 pr-4">
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
const cubierto = ref(false)

function revisar() {
  if (!root.value) return
  const tapado = window.scrollY >= root.value.offsetHeight
  if (tapado === cubierto.value) return

  cubierto.value = tapado
  if (tapado) video.value?.pause()
  else video.value?.play().catch(() => { })
}

onMounted(() => {
  revisar()
  window.addEventListener('scroll', revisar, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', revisar))
</script>

<style scoped>
@media (width < 768px) {
  .hero-tab-mobile {
    position: relative;
    background-color: var(--color-amarillo);
    border-top-right-radius: var(--r);
  }

  .hero-tab-mobile::before,
  .hero-tab-mobile::after {
    content: "";
    position: absolute;
    width: var(--r);
    height: var(--r);
    pointer-events: none;
    background: radial-gradient(circle at 100% 0, transparent calc(var(--r) - 0.5px), var(--color-amarillo) var(--r));
  }

  .hero-tab-mobile::before {
    left: 0;
    bottom: 100%;
  }

  .hero-tab-mobile::after {
    left: 100%;
    bottom: 0;
  }
}

@media (width >= 768px) {
  .hero-step,
  .hero-tab-left,
  .hero-tab-right {
    position: relative;
    background-color: var(--color-amarillo);
  }

  .hero-step::before,
  .hero-step::after,
  .hero-tab-left::after,
  .hero-tab-right::before,
  .hero-tab-right::after {
    content: "";
    position: absolute;
    width: var(--r);
    height: var(--r);
    pointer-events: none;
  }

  .hero-step {
    --rs: calc(var(--r) / 2);
    border-top-right-radius: var(--rs);
  }

  .hero-tab-left {
    border-top-right-radius: var(--r);
  }

  .hero-step::before,
  .hero-tab-left::after {
    background: radial-gradient(circle at 100% 0, transparent calc(var(--r) - 0.5px), var(--color-amarillo) var(--r));
  }

  .hero-step::after {
    width: var(--rs);
    height: var(--rs);
    background: radial-gradient(circle at 100% 0, transparent calc(var(--rs) - 0.5px), var(--color-amarillo) var(--rs));
  }

  .hero-step::before {
    left: 0;
    bottom: 100%;
  }

  .hero-step::after,
  .hero-tab-left::after {
    left: 100%;
    bottom: 0;
  }

  .hero-tab-right {
    border-top-left-radius: var(--r);
  }

  .hero-tab-right::before,
  .hero-tab-right::after {
    background: radial-gradient(circle at 0 0, transparent calc(var(--r) - 0.5px), var(--color-amarillo) var(--r));
  }

  .hero-tab-right::before {
    right: 0;
    bottom: 100%;
  }

  .hero-tab-right::after {
    right: 100%;
    bottom: 0;
  }
}
</style>
