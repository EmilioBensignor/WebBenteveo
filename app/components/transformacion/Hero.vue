<template>
  <section ref="root"
    class="w-full min-h-dvh lg:h-dvh flex flex-col justify-center sticky top-0 [@media(max-height:560px)]:relative overflow-hidden bg-negro px-4 sm:px-6 md:px-8 lg:px-0 pt-28 md:pt-32 lg:pt-0 pb-12 md:pb-16 lg:pb-0"
    :class="cubierto && 'invisible'">
    <div ref="titular"
      class="w-full max-w-362 flex flex-col items-center gap-3 lg:gap-6 relative lg:absolute lg:inset-x-0 lg:top-32 xxl:top-36 z-10 text-center mx-auto lg:px-12">
      <p class="text-blanco lg:text-xl font-medium leading-none">La transformación IA ya empezó.</p>
      <UiHeadingH1 class="max-w-212 text-amarillo">
        ¿Cuánto está perdiendo tu empresa por quedarse afuera de la transformación?
      </UiHeadingH1>
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:gap-4 pt-2 lg:pt-0">
        <UiButtonPrimary class="gap-3 pl-6 pr-4">
          Agendar una llamada
          <Icon name="material-symbols:calendar-month-outline-rounded" class="size-4 lg:size-6 shrink-0" />
        </UiButtonPrimary>
        <UiButtonPrimary variant="glass" size="glass" class="gap-3 pl-6 pr-4">
          Solicitar auditoría
          <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
        </UiButtonPrimary>
      </div>
    </div>

    <div ref="marco"
      class="w-full aspect-video lg:aspect-auto relative lg:absolute lg:inset-0 overflow-hidden rounded-3xl lg:rounded-none mt-8 lg:mt-0 will-change-transform">
      <video ref="reproductor" src="/video/hero-transformacion.mp4" poster="/img/posters/hero-transformacion.jpg"
        class="size-full object-cover" autoplay loop muted playsinline preload="metadata" />
    </div>
  </section>

  <div ref="recorrido" class="w-full h-0 lg:h-[150vh]" aria-hidden="true" />
</template>

<script setup>
const root = useTemplateRef('root')
const titular = useTemplateRef('titular')
const marco = useTemplateRef('marco')
const reproductor = useTemplateRef('reproductor')
const recorrido = useTemplateRef('recorrido')
const cubierto = ref(false)

useHead({
  link: [{ rel: 'preload', as: 'image', href: '/img/posters/hero-transformacion.jpg', fetchpriority: 'high' }]
})

function revisar() {
  if (!root.value || !recorrido.value) return
  const tapado = window.scrollY >= recorrido.value.offsetHeight + root.value.offsetHeight
  if (tapado === cubierto.value) return

  cubierto.value = tapado
  if (tapado) reproductor.value?.pause()
  else reproductor.value?.play().catch(() => { })
}

onMounted(() => {
  revisar()
  window.addEventListener('scroll', revisar, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', revisar))

useGsapContext(root, (ctx, gsap, ScrollTrigger) => {
  const mm = gsap.matchMedia()

  mm.add('(min-width: 1080px)', () => {
    const finTitular = () => titular.value.offsetTop + titular.value.offsetHeight
    const escala = () => Math.min(0.5, (window.innerHeight - finTitular() - 56) / window.innerHeight)
    const bajada = () => finTitular() + 32 + (window.innerHeight * escala()) / 2 - window.innerHeight / 2

    gsap.timeline({
      scrollTrigger: {
        start: 0,
        end: () => recorrido.value.offsetHeight,
        scrub: 1,
        invalidateOnRefresh: true
      }
    })
      .fromTo(marco.value,
        { scale: escala, y: bajada, borderRadius: 72 },
        { scale: 1, y: 0, borderRadius: 0, ease: 'none' }, 0)
      .to(titular.value, { autoAlpha: 0, y: -120, ease: 'none', duration: 0.2 }, 0)
      .to({}, { duration: 0.6 })

    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  ctx.add(() => () => mm.revert())
})
</script>
