<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12 items-stretch!">
    <div class="flex flex-col items-center gap-3 lg:gap-4 self-center text-center">
      <UiHeadingH2 class="max-w-80 md:max-w-none">
        ¿Te suena <span class="text-amarillo">alguna de estas frases?</span>
      </UiHeadingH2>
      <p class="text-hueso text-sm lg:text-base font-light">Tocá cada una para ver cómo la resolvemos.</p>
    </div>

    <ul ref="lista" class="w-full flex flex-col">
      <li v-for="(item, i) in frasesRespuestas" :key="item.frase"
        class="group relative border-t border-blanco/15 last:border-b overflow-hidden" :style="coords[i]"
        @mousemove="seguir(i, $event)">
        <span
          class="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(18rem_circle_at_var(--x)_var(--y),rgba(252,183,22,0.16),transparent_70%)] lg:group-hover:opacity-100"
          aria-hidden="true" />

        <button type="button" class="relative w-full flex items-start gap-4 lg:gap-10 py-5 lg:p-8 text-left cursor-pointer"
          :aria-expanded="abierto === i" :aria-controls="`frase-${i}`" @click="alternar(i)">
          <span
            class="text-[2.75rem] lg:text-[5.5rem] xxl:text-[6.5rem] font-semibold leading-[0.85] tracking-tight tabular-nums shrink-0 text-transparent [-webkit-text-stroke:1px_rgba(252,183,22,0.45)] transition-all duration-500 lg:group-hover:[-webkit-text-stroke:1px_transparent] lg:group-hover:text-amarillo"
            :class="abierto === i && 'text-amarillo! [-webkit-text-stroke:1px_transparent]!'">
            {{ String(i + 1).padStart(2, '0') }}
          </span>

          <div class="flex-1 min-w-0 flex flex-col gap-2 lg:gap-3">
            <h3 class="text-blanco text-base lg:text-3xl xxl:text-4xl font-medium italic leading-[1.2]">
              “{{ item.frase }}”
            </h3>

            <div :id="`frase-${i}`" class="grid transition-all duration-500 ease-in-out"
              :class="abierto === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
              <div class="overflow-hidden">
                <p class="flex items-start gap-2 text-hueso/70 text-sm lg:text-base leading-[1.4] font-light pt-1">
                  <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-5 shrink-0 mt-0.5 text-amarillo" />
                  <span>{{ item.respuesta }}</span>
                </p>
              </div>
            </div>
          </div>

          <span class="size-8 lg:size-10 shrink-0 flex justify-center items-center glass-boton rounded-full text-hueso"
            :class="{ activo: abierto === i }">
            <Icon name="material-symbols:add-rounded" class="size-5 transition-transform duration-300"
              :class="{ 'rotate-45': abierto === i }" />
          </span>
        </button>
      </li>
    </ul>

    <div class="flex flex-col items-center gap-4 self-center">
      <p class="text-center text-amarillo text-base lg:text-[1.75rem] font-medium">Para eso estamos.</p>
      <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
        Hablemos de tu marca
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
import { frasesRespuestas } from '~/constants/agencia'
import { useGsapContext } from '~/composables/useGsapContext'

const lista = useTemplateRef('lista')
const coords = ref(frasesRespuestas.map(() => ({ '--x': '50%', '--y': '50%' })))
const abierto = ref(0)

function alternar(i) {
  abierto.value = abierto.value === i ? null : i
}

function seguir(i, evento) {
  const caja = evento.currentTarget.getBoundingClientRect()
  coords.value[i] = { '--x': `${evento.clientX - caja.left}px`, '--y': `${evento.clientY - caja.top}px` }
}

useGsapContext(lista, (ctx, gsap, ScrollTrigger) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const items = lista.value.children
  gsap.set(items, { y: 50, autoAlpha: 0 })

  ScrollTrigger.batch(items, {
    start: 'top 92%',
    once: true,
    onEnter: (lote) => gsap.to(lote, {
      y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true
    })
  })
})
</script>
