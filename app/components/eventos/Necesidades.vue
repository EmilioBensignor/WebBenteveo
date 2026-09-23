<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12 items-stretch!">
    <UiHeadingH2 class="max-w-80 md:max-w-none self-center text-center">
      Todo lo que necesitas, <span class="text-amarillo">resuelto en un solo lugar</span>
    </UiHeadingH2>

    <ul ref="lista" class="w-full flex flex-col">
      <li v-for="(n, i) in necesidades" :key="n.title"
        class="group relative border-t border-blanco/15 last:border-b overflow-hidden" :style="coords[i]"
        @mousemove="seguir(i, $event)">
        <span
          class="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(18rem_circle_at_var(--x)_var(--y),rgba(252,183,22,0.16),transparent_70%)] lg:group-hover:opacity-100"
          aria-hidden="true" />

        <button type="button"
          class="relative w-full flex max-lg:flex-col max-lg:items-start items-center gap-2 lg:gap-10 py-5 lg:p-8 text-left cursor-pointer lg:cursor-default"
          :aria-expanded="abierto === i" :aria-controls="`necesidad-${i}`" @click="alternar(i)">
          <span class="max-lg:w-full flex justify-between items-center gap-4 shrink-0">
            <span
              class="text-[2.75rem] lg:text-[5.5rem] xxl:text-[6.5rem] font-semibold leading-[0.85] tracking-tight tabular-nums shrink-0 text-transparent [-webkit-text-stroke:1px_rgba(252,183,22,0.45)] transition-all duration-500 lg:group-hover:[-webkit-text-stroke:1px_transparent] lg:group-hover:text-amarillo"
              :class="abierto === i ? 'max-lg:text-amarillo max-lg:[-webkit-text-stroke:1px_transparent]' : ''">
              {{ String(i + 1).padStart(2, '0') }}
            </span>

            <span class="lg:hidden size-8 shrink-0 flex justify-center items-center glass-boton rounded-full text-hueso"
              :class="{ activo: abierto === i }">
              <Icon name="material-symbols:add-rounded" size="1.25rem" class="transition-transform duration-300"
                :class="{ 'rotate-45': abierto === i }" />
            </span>
          </span>

          <div class="max-lg:w-full flex-1 min-w-0 flex flex-col gap-1 lg:gap-2">
            <h3
              class="text-hueso text-base lg:text-3xl xxl:text-4xl leading-[1.15] transition-colors duration-500 lg:group-hover:text-blanco">
              {{ n.title }}
            </h3>
            <div :id="`necesidad-${i}`" class="grid transition-all duration-500 ease-in-out lg:block"
              :class="abierto === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
              <div class="overflow-hidden lg:overflow-visible">
                <p
                  class="text-hueso/60 text-sm lg:text-base leading-[1.4] font-light transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:group-hover:max-h-32 lg:group-hover:opacity-100 lg:group-focus-within:max-h-32 lg:group-focus-within:opacity-100">
                  {{ n.text }}
                </p>
              </div>
            </div>
          </div>

          <Icon :name="n.icon" size="2rem"
            class="hidden! lg:block! shrink-0 text-amarillo/40 transition-all duration-500 lg:group-hover:text-amarillo lg:group-hover:rotate-6 lg:group-hover:scale-110" />
        </button>
      </li>
    </ul>

    <div class="flex flex-col items-center gap-4">
      <p class="text-hueso text-sm lg:text-base font-light">¿Ya tienes algo en mente?</p>
      <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
        Hablemos de tu evento
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
import { necesidades } from '~/constants/eventos'
import { useGsapContext } from '~/composables/useGsapContext'

const lista = useTemplateRef('lista')
const coords = ref(necesidades.map(() => ({ '--x': '50%', '--y': '50%' })))
const abierto = ref(0)

function alternar(i) {
  abierto.value = abierto.value === i ? null : i
}

function seguir(i, evento) {
  const caja = evento.currentTarget.getBoundingClientRect()
  coords.value[i] = {
    '--x': `${evento.clientX - caja.left}px`,
    '--y': `${evento.clientY - caja.top}px`
  }
}

useGsapContext(lista, (ctx, gsap, ScrollTrigger) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const items = lista.value.children

  gsap.set(items, { y: 50, autoAlpha: 0 })

  ScrollTrigger.batch(items, {
    start: 'top 92%',
    once: true,
    onEnter: (lote) => gsap.to(lote, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      overwrite: true
    })
  })
})
</script>
