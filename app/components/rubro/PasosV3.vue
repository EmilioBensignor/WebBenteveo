<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <div class="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-8">
      <div class="max-w-190 flex flex-col gap-3 md:gap-4">
        <UiHeadingH2>Mira cómo funciona <span class="text-amarillo">en la práctica</span></UiHeadingH2>
        <p class="text-hueso text-sm lg:text-base leading-normal font-light" v-html="pasos.subtitulo" />
      </div>
      <div class="hidden md:flex gap-3 shrink-0">
        <button type="button" aria-label="Paso anterior" @click="prev"
          class="size-10 lg:size-12 flex justify-center items-center glass-boton rounded-full text-hueso cursor-pointer">
          <Icon name="material-symbols:arrow-back-rounded" class="size-5! lg:size-6!" />
        </button>
        <button type="button" aria-label="Paso siguiente" @click="next"
          class="size-10 lg:size-12 flex justify-center items-center glass-boton rounded-full text-hueso cursor-pointer">
          <Icon name="material-symbols:arrow-forward-rounded" class="size-5! lg:size-6!" />
        </button>
      </div>
    </div>

    <div class="w-full flex flex-col gap-8 lg:gap-10">
      <div class="w-full aspect-[4/3] sm:aspect-[1375/700] relative border border-blanco/33 rounded-2xl overflow-hidden bg-black">
        <Transition enter-active-class="transition-opacity duration-500" enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-500" leave-to-class="opacity-0">
          <NuxtImg :key="pasos.items[active].imagen" :src="pasos.items[active].imagen" :alt="pasos.items[active].texto"
            format="avif" sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:1448px"
            class="size-full absolute inset-0 object-cover" />
        </Transition>
        <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

        <div class="flex items-end gap-3 md:gap-5 absolute bottom-0 left-0 right-0 pointer-events-none">
          <Transition mode="out-in" enter-active-class="transition-all duration-400" enter-from-class="opacity-0 translate-y-6"
            leave-active-class="transition-all duration-200" leave-to-class="opacity-0">
            <div :key="active" class="flex items-end gap-3 md:gap-5">
              <span
                class="text-[5.5rem] lg:text-[8rem] font-bold leading-none text-amarillo tabular-nums -mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4">
                {{ String(active + 1).padStart(2, '0') }}
              </span>
              <p class="max-w-120 text-hueso text-base md:text-xl lg:text-2xl leading-[1.25] font-medium pb-4 md:pb-5 lg:pb-6">
                {{ pasos.items[active].texto }}
              </p>
            </div>
          </Transition>
        </div>
      </div>

      <div class="w-full relative">
        <div class="h-px absolute top-2 lg:top-2.5 bg-blanco/20" :style="linea" />
        <div class="h-px absolute top-2 lg:top-2.5 bg-amarillo shadow-amarilla transition-all duration-500"
          :style="{ ...linea, width: `calc((100% - ${margen * 2}%) * ${active / (total - 1)})` }" />

        <ol class="grid relative" :style="{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }">
          <li v-for="(paso, i) in pasos.items" :key="paso.texto" class="flex justify-center">
            <button type="button" class="flex flex-col items-center gap-3 text-center cursor-pointer group"
              :aria-pressed="active === i" @click="active = i">
              <span class="size-4 lg:size-5 rounded-full border-2 transition-all duration-300"
                :class="i <= active ? 'bg-amarillo border-amarillo shadow-amarilla' : 'bg-negro border-blanco/40 md:group-hover:border-blanco'" />
              <span class="hidden md:block max-w-56 text-xs lg:text-sm leading-[1.3] transition-colors duration-300"
                :class="active === i ? 'text-hueso' : 'text-hueso/45 md:group-hover:text-hueso/80'">
                {{ paso.texto }}
              </span>
            </button>
          </li>
        </ol>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
const props = defineProps({
  pasos: { type: Object, required: true }
})

const active = ref(0)
const total = computed(() => props.pasos.items.length)
const margen = computed(() => 50 / total.value)
const linea = computed(() => ({ left: `${margen.value}%`, right: `${margen.value}%` }))
const prev = () => { active.value = (active.value + total.value - 1) % total.value }
const next = () => { active.value = (active.value + 1) % total.value }
</script>
