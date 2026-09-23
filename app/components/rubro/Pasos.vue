<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <div class="w-full flex flex-col items-center gap-3 md:gap-4 text-center">
      <UiHeadingH2>Mira cómo funciona <span class="text-amarillo">en la práctica</span></UiHeadingH2>
      <p class="max-w-190 lg:max-w-230 text-hueso text-sm lg:text-base leading-normal font-light"
        v-html="pasos.subtitulo" />
    </div>

    <div class="w-full flex flex-col gap-4 lg:gap-6">
      <div
        class="flex gap-2 lg:gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0 py-1">
        <button v-for="(paso, i) in pasos.items" :key="paso.texto" ref="tabRefs" type="button"
          class="min-w-56 md:min-w-0 md:flex-1 flex items-center gap-3 lg:gap-4 border rounded-2xl text-left transition-colors duration-300 cursor-pointer p-4 lg:p-5"
          :class="active === i ? 'border-amarillo bg-amarillo/8' : 'border-blanco/20 md:hover:border-blanco/50'"
          :aria-pressed="active === i" @click="active = i">
          <span class="text-lg lg:text-2xl font-bold tabular-nums transition-colors duration-300"
            :class="active === i ? 'text-amarillo' : 'text-hueso/40'">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <span class="text-sm lg:text-base leading-[1.3] transition-colors duration-300"
            :class="active === i ? 'text-hueso' : 'text-hueso/60'">
            {{ paso.texto }}
          </span>
        </button>
      </div>

      <div class="w-full relative">
        <div class="w-full aspect-[1375/700] relative border border-blanco/33 rounded-2xl overflow-hidden bg-black">
          <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-300" leave-to-class="opacity-0">
            <NuxtImg :key="pasos.items[active].imagen" :src="pasos.items[active].imagen"
              :alt="pasos.items[active].texto" format="avif" sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:1448px"
              class="size-full absolute inset-0 object-cover" />
          </Transition>
        </div>

        <button type="button" aria-label="Paso anterior" @click="prev"
          class="size-10 lg:size-12 flex justify-center items-center absolute top-1/2 left-3 md:left-4 lg:-left-6 -translate-y-1/2 glass-boton rounded-full text-hueso cursor-pointer">
          <Icon name="material-symbols:arrow-back-rounded" class="size-5! lg:size-6!" />
        </button>
        <button type="button" aria-label="Paso siguiente" @click="next"
          class="size-10 lg:size-12 flex justify-center items-center absolute top-1/2 right-3 md:right-4 lg:-right-6 -translate-y-1/2 glass-boton rounded-full text-hueso cursor-pointer">
          <Icon name="material-symbols:arrow-forward-rounded" class="size-5! lg:size-6!" />
        </button>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
const props = defineProps({
  pasos: { type: Object, required: true }
})

const active = ref(0)
const tabRefs = ref([])
const total = computed(() => props.pasos.items.length)
const prev = () => { active.value = (active.value + total.value - 1) % total.value }
const next = () => { active.value = (active.value + 1) % total.value }

watch(active, (i) => {
  tabRefs.value[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
})
</script>
