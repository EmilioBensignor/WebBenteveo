<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <UiHeadingH2 class="max-w-80 md:max-w-none text-center">
      Lo que dicen los medios sobre <span class="text-amarillo">nuestro trabajo con IA</span>
    </UiHeadingH2>

    <div ref="listaEl" class="w-full max-w-362 relative" data-cursor-hide @pointerleave="hovered = null">
      <div ref="fotoEl"
        class="hidden lg:block absolute top-0 left-0 z-20 size-56 xl:size-64 xxl:size-72 rounded-full overflow-hidden pointer-events-none opacity-0">
        <NuxtImg v-for="(m, i) in medios" :key="m.title" :src="m.image" alt=""
          class="size-full absolute inset-0 object-cover transition-opacity duration-300"
          :class="hovered === i ? 'opacity-100' : 'opacity-0'" format="avif" sizes="224px xl:256px xxl:288px" loading="lazy" />
      </div>

      <ul class="flex flex-col border-t border-blanco/15">
        <li v-for="(m, i) in medios" :key="m.title" class="border-b border-blanco/15">
          <NuxtLink :to="m.to"
            class="group flex flex-col gap-2 md:flex-row md:items-center md:gap-6 py-6 md:py-8 lg:py-11 xxl:py-13 transition-colors duration-300"
            @pointerenter="hovered = i">
            <div class="flex items-center justify-between gap-4 md:contents">
              <span class="text-sm md:text-base lg:text-xl xxl:text-2xl tabular-nums leading-none transition-colors duration-300 shrink-0 md:order-1"
                :class="activa(i) ? 'text-amarillo' : 'text-gris'">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <span class="text-xs uppercase tracking-wide transition-colors duration-300 shrink-0 md:order-3"
                :class="activa(i) ? 'text-amarillo' : 'text-gris'">
                {{ m.medio }}
              </span>
            </div>
            <p class="flex-1 text-base lg:text-xl xxl:text-2xl font-light leading-[1.3] transition-colors duration-300 md:order-2"
              :class="activa(i) ? 'text-hueso' : 'text-hueso lg:text-gris'">
              {{ m.title }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </DefaultSection>
</template>

<script setup>
import { medios } from '~/constants/transformacion'

const listaEl = ref(null)
const fotoEl = ref(null)
const hovered = ref(null)

const activa = (i) => hovered.value === null || hovered.value === i

let raf = null
let target = { x: 0, y: 0 }
let pos = { x: 0, y: 0 }
let opacity = 0
let started = false

const onPointerMove = (e) => {
  const rect = listaEl.value.getBoundingClientRect()
  target = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  if (!started) {
    pos = { ...target }
    started = true
  }
}

const tick = () => {
  const el = fotoEl.value
  if (el) {
    pos.x += (target.x - pos.x) * 0.12
    pos.y += (target.y - pos.y) * 0.12
    const visible = hovered.value !== null && started
    opacity += ((visible ? 1 : 0) - opacity) * 0.15
    const size = el.offsetWidth
    el.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0) scale(${0.85 + opacity * 0.15})`
    el.style.opacity = opacity
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  listaEl.value?.addEventListener('pointermove', onPointerMove)
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  listaEl.value?.removeEventListener('pointermove', onPointerMove)
  if (raf) cancelAnimationFrame(raf)
})
</script>
