<template>
  <div ref="rootRef" class="w-full max-w-260 relative">
    <div class="w-px absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2" :class="lineTrack">
      <div class="w-full h-full origin-top" :class="lineFill" :style="{ transform: `scaleY(${progress})` }" />
    </div>

    <div v-for="(item, i) in items" :key="item.title"
      class="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 relative pl-10 md:pl-0 mb-14 md:mb-24 last:mb-0"
      :class="i % 2 ? 'md:flex-row-reverse' : ''">
      <span class="size-4 flex justify-center items-center absolute top-1/2 left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <span class="size-4 absolute rounded-full transition-transform duration-500 ease-out" :class="[
          dotHalo, reached(i) ? 'scale-150' : 'scale-0'
        ]" />
        <span class="size-2 relative rounded-full transition-colors duration-500"
          :class="reached(i) ? dotOn : dotOff" />
      </span>

      <div class="md:w-1/2 transition-all duration-700 ease-out" :class="[
        i % 2 ? 'md:pl-12 lg:pl-20' : 'md:pr-12 lg:pr-20',
        reached(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      ]">
        <div class="relative rounded-2xl transition-all duration-500 overflow-hidden"
          :class="reached(i) ? imageShadow : ''">
          <NuxtImg :src="item.image" :alt="item.title" format="avif,webp" sizes="600px" loading="lazy"
            class="w-full aspect-8/7 sm:aspect-16/10 object-cover transition-transform duration-700 ease-out"
            :class="reached(i) ? 'scale-100' : 'scale-110'" />
          <div class="absolute inset-0 rounded-2xl border" :class="imageBorder" />
        </div>
      </div>

      <div class="md:w-1/2 flex flex-col gap-2 md:gap-3 transition-all duration-700 ease-out delay-150" :class="[
        i % 2 ? 'md:pr-12 lg:pr-20 md:text-right md:items-end' : 'md:pl-12 lg:pl-20',
        reached(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      ]">
        <span class="text-6xl lg:text-7xl font-bold leading-none" :class="numberClass">0{{ i + 1 }}</span>
        <h3 class="text-xl lg:text-2xl font-bold" :class="titleClass">{{ item.title }}</h3>
        <p v-if="item.text" class="max-w-100 text-sm lg:text-base font-medium" :class="textClass">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true },
  lineTrack: { type: String, default: 'bg-blanco/10' },
  lineFill: { type: String, default: 'bg-amarillo shadow-amarilla' },
  dotHalo: { type: String, default: 'bg-amarillo/25' },
  dotOn: { type: String, default: 'bg-amarillo shadow-amarilla' },
  dotOff: { type: String, default: 'bg-blanco/30' },
  imageShadow: { type: String, default: 'shadow-amarilla' },
  imageBorder: { type: String, default: 'border-blanco/10' },
  numberClass: { type: String, default: 'text-amarillo' },
  titleClass: { type: String, default: 'text-blanco' },
  textClass: { type: String, default: 'text-blanco/70' }
})

const rootRef = ref(null)
const progress = useScrollProgress(rootRef, (r, vh) => (vh * 0.75 - r.top) / r.height)

const reached = (i) => progress.value * props.items.length >= i + 0.35
</script>
