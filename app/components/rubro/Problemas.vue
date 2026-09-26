<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-12"
    inner="gap-8 lg:gap-12">
    <div class="flex flex-col items-center gap-3 md:gap-4 mx-auto text-center">
      <UiHeadingH2>
        Todo lo que necesitas, resuelto en un solo lugar
      </UiHeadingH2>
      <p class="max-w-6xl text-hueso text-sm lg:text-base leading-normal font-light" v-html="parrafo" />
    </div>

    <ul ref="lista"
      class="w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-[calc(100%+4rem)] lg:w-full flex lg:grid lg:grid-cols-4 gap-4 lg:gap-5 -mx-4 sm:-mx-6 md:-mx-8 lg:mx-0 -my-6 lg:my-0 px-4 sm:px-6 md:px-8 lg:px-0 py-6 lg:py-0 overflow-x-auto overflow-y-hidden lg:overflow-visible snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 md:scroll-px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <li v-for="(p, i) in problemas" :key="p.titulo" class="w-[82%] tab:w-[55%] md:w-[42%] lg:w-auto shrink-0 snap-start perspective-[1800px]"
        @pointerenter="hover(i, true, $event)" @pointerleave="hover(i, false, $event)">
        <button type="button" :aria-pressed="girada.has(i)" :aria-label="`${p.titulo} Ver cómo lo resolvemos`"
          class="size-full grid text-left cursor-pointer transform-3d transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0"
          :class="{ 'rotate-y-180': girada.has(i) }" @click="alternar(i, $event)">
          <span
            class="min-h-64 lg:min-h-72 xl:min-h-88 flex flex-col gap-6 relative [grid-area:1/1] border border-blanco/33 rounded-2xl overflow-hidden bg-linear-to-b from-white/8 to-transparent backface-hidden p-5 pb-20 lg:p-6 lg:pb-24 xl:pb-28"
            aria-hidden="true">
            <span class="flex justify-between items-start gap-4">
              <Icon :name="p.icon" class="size-8! lg:size-10! text-amarillo" />
              <span class="text-gris text-xs uppercase tracking-[0.2em] pt-2">Desafío</span>
            </span>

            <span class="text-hueso text-base lg:text-xl leading-[1.3] text-balance">{{ p.titulo }}</span>

            <span
              class="absolute bottom-0 left-0 text-amarillo text-[5rem] lg:text-[5.5rem] xl:text-[7rem] font-bold -mb-4 lg:-mb-6 xl:-mb-8 -ml-2 md:-ml-3 lg:-ml-4">
              {{ String(i + 1).padStart(2, '0') }}
            </span>

            <span
              class="size-8 lg:size-10 flex justify-center items-center absolute right-5 bottom-5 lg:right-6 lg:bottom-6 glass-boton rounded-full text-hueso">
              <Icon name="material-symbols:360-rounded" class="size-4! lg:size-5!" />
            </span>
          </span>

          <span
            class="min-h-64 lg:min-h-72 xl:min-h-88 flex flex-col gap-6 relative [grid-area:1/1] rounded-2xl overflow-hidden bg-amarillo shadow-amarilla text-negro backface-hidden rotate-y-180 p-5 pb-20 lg:p-6 lg:pb-24 xl:pb-28">
            <span class="flex justify-between items-start gap-4">
              <Icon :name="p.icon" class="size-8! lg:size-10! text-negro" />
              <span class="text-xs font-semibold uppercase tracking-[0.2em] pt-2">Solución</span>
            </span>

            <span class="text-sm lg:text-base leading-[1.45] font-medium">{{ p.texto }}</span>

            <span
              class="absolute bottom-0 left-0 text-negro text-[5rem] lg:text-[5.5rem] xl:text-[7rem] font-bold -mb-4 lg:-mb-6 xl:-mb-8 -ml-2 md:-ml-3 lg:-ml-4"
              aria-hidden="true">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </span>
        </button>
      </li>
    </ul>

    <div class="flex flex-col items-center gap-4 lg:gap-6 text-center">
      <p class="text-hueso text-sm lg:text-base leading-normal font-light">
        Cada empresa de {{ nombre }} es distinta:
        <span class="font-semibold">nos sentamos contigo, entendemos tu operación y diseñamos la
          solución que necesitas.</span>
      </p>
      <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="w-full sm:w-max shrink-0 gap-3 pl-6 pr-4">
        Cuéntanos tu caso
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
defineProps({
  parrafo: { type: String, required: true },
  problemas: { type: Array, required: true },
  nombre: { type: String, required: true }
})

const lista = useTemplateRef('lista')
const girada = ref(new Set())

function fijar(i, valor) {
  const s = new Set(girada.value)
  valor ? s.add(i) : s.delete(i)
  girada.value = s
}

function hover(i, valor, e) {
  if (e.pointerType === 'mouse') fijar(i, valor)
}

function alternar(i, e) {
  const teclado = e.detail === 0
  if (!teclado && window.matchMedia('(hover: hover)').matches) return
  fijar(i, !girada.value.has(i))
}

useGsapContext(lista, (ctx, gsap, ScrollTrigger) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const items = lista.value.children

  gsap.set(items, { y: 60, autoAlpha: 0 })

  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (lote) => gsap.to(lote, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12
    })
  })
})
</script>
