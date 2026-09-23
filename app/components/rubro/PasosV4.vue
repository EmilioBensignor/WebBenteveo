<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <div class="w-full flex flex-col items-center gap-3 md:gap-4 text-center">
      <UiHeadingH2>Mira cómo funciona <span class="text-amarillo">en la práctica</span></UiHeadingH2>
      <p class="max-w-190 lg:max-w-230 text-hueso text-sm lg:text-base leading-normal font-light"
        v-html="pasos.subtitulo" />
    </div>

    <ol class="w-full flex flex-col lg:flex-row gap-3 lg:gap-4 lg:h-120 xl:h-136 mac:h-112">
      <li v-for="(paso, i) in pasos.items" :key="paso.texto"
        class="relative border rounded-2xl overflow-hidden bg-black transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        :class="[
          active === i ? 'h-72 md:h-96 lg:h-auto lg:flex-[3.2] border-amarillo/70' : 'h-16 md:h-20 lg:h-auto lg:flex-1 border-blanco/33',
        ]"
        @mouseenter="hoverable && (active = i)">
        <button type="button" class="size-full absolute inset-0 z-10 cursor-pointer" :aria-label="paso.texto"
          :aria-expanded="active === i" @click="active = i" />

        <NuxtImg :src="paso.imagen" :alt="paso.texto" format="avif"
          sizes="xs:100vw sm:100vw md:100vw lg:70vw xxl:1000px"
          class="size-full absolute inset-0 object-cover transition-all duration-700"
          :class="active === i ? 'opacity-100' : 'opacity-0 lg:opacity-40 lg:grayscale'" />
        <div class="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

        <div class="lg:hidden flex items-center gap-4 absolute top-0 left-0 right-0 p-4 md:p-5 pointer-events-none">
          <span class="text-base font-bold tabular-nums"
            :class="active === i ? 'text-amarillo' : 'text-hueso/50'">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <span class="text-sm md:text-base leading-[1.3] truncate"
            :class="active === i ? 'text-hueso' : 'text-hueso/70'">
            {{ paso.texto }}
          </span>
        </div>

        <p class="hidden lg:block max-w-120 absolute top-0 left-0 text-hueso text-xl xl:text-2xl leading-[1.25] font-medium transition-opacity p-6 xl:p-8 pointer-events-none"
          :class="active === i ? 'opacity-100 duration-500 delay-500' : 'opacity-0 duration-150'">
          {{ paso.texto }}
        </p>

        <span
          class="absolute bottom-0 left-0 text-[5.5rem] lg:text-[8rem] font-bold leading-none tabular-nums transition-all duration-500 -mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4 pointer-events-none"
          :class="active === i
            ? 'text-amarillo [-webkit-text-stroke:1px_transparent]'
            : 'max-lg:opacity-0 text-transparent [-webkit-text-stroke:1px_rgba(252,183,22,0.45)]'">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
      </li>
    </ol>
  </DefaultSection>
</template>

<script setup>
defineProps({
  pasos: { type: Object, required: true }
})

const active = ref(0)
const hoverable = ref(false)

let media
const update = () => { hoverable.value = media.matches }
onMounted(() => {
  media = window.matchMedia('(min-width: 1080px) and (hover: hover)')
  update()
  media.addEventListener('change', update)
})
onBeforeUnmount(() => media?.removeEventListener('change', update))
</script>
