<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-12"
    inner="gap-8 lg:gap-12">
    <div class="max-w-200 flex flex-col items-center gap-3 md:gap-4 mx-auto text-center">
      <UiHeadingH2>
        Todo lo que necesitas, <span class="text-amarillo">resuelto en un solo lugar</span>
      </UiHeadingH2>
      <p class="text-hueso text-sm lg:text-base leading-normal font-light" v-html="parrafo" />
    </div>

    <ul ref="lista" class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      <li v-for="(p, i) in problemas" :key="p.titulo" class="perspective-[1800px]"
        @pointerenter="hover(i, true, $event)" @pointerleave="hover(i, false, $event)">
        <button type="button" :aria-pressed="girada.has(i)" :aria-label="`${p.titulo} Ver cómo lo resolvemos`"
          class="size-full grid text-left cursor-pointer transform-3d transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0"
          :class="{ 'rotate-y-180': girada.has(i) }" @click="alternar(i, $event)">
          <span
            class="min-h-72 md:min-h-80 lg:min-h-104 flex flex-col gap-6 relative [grid-area:1/1] border border-blanco/33 rounded-2xl overflow-hidden bg-linear-to-b from-white/8 to-transparent backface-hidden p-5 pb-24 lg:p-6 lg:pb-32"
            aria-hidden="true">
            <span class="flex justify-between items-start gap-4">
              <span class="size-12 lg:size-14 flex justify-center items-center glass rounded-full text-amarillo">
                <Icon :name="p.icon" class="size-6! lg:size-7!" />
              </span>
              <span class="text-gris text-xs uppercase tracking-[0.2em] pt-2">Desafío</span>
            </span>

            <span class="text-hueso text-base lg:text-xl leading-[1.3] text-balance">{{ p.titulo }}</span>

            <span
              class="absolute bottom-0 left-0 text-amarillo text-[5.5rem] lg:text-[8rem] font-bold -mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4">
              {{ String(i + 1).padStart(2, '0') }}
            </span>

            <span
              class="size-8 lg:size-10 flex justify-center items-center absolute right-5 bottom-5 lg:right-6 lg:bottom-6 glass-boton rounded-full text-hueso">
              <Icon name="material-symbols:360-rounded" class="size-4! lg:size-5!" />
            </span>
          </span>

          <span
            class="min-h-72 md:min-h-80 lg:min-h-104 flex flex-col gap-6 relative [grid-area:1/1] rounded-2xl overflow-hidden bg-amarillo shadow-amarilla text-negro backface-hidden rotate-y-180 p-5 pb-24 lg:p-6 lg:pb-32">
            <span class="flex justify-between items-start gap-4">
              <span class="size-12 lg:size-14 flex justify-center items-center rounded-full bg-negro text-amarillo">
                <Icon :name="p.icon" class="size-6! lg:size-7!" />
              </span>
              <span class="text-xs font-semibold uppercase tracking-[0.2em] pt-2">Solución</span>
            </span>

            <span class="text-sm lg:text-base leading-[1.45] font-medium">{{ p.texto }}</span>

            <span
              class="absolute bottom-0 left-0 text-negro text-[5.5rem] lg:text-[8rem] font-bold -mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4"
              aria-hidden="true">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </span>
        </button>
      </li>
    </ul>

    <div class="flex flex-col items-center gap-4 lg:gap-6 text-center">
      <p class="max-w-160 text-hueso text-sm lg:text-base leading-normal font-light">
        Cada empresa de {{ nombre }} es distinta:
        <span class="font-semibold text-amarillo">nos sentamos contigo, entendemos tu operación y diseñamos la
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
