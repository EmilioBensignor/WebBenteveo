<template>
  <div class="relative w-full">
    <div ref="emblaRef" class="overflow-hidden">
      <div class="flex" :style="{ marginLeft: `-${gap}px` }">
        <div v-for="(item, i) in items" :key="i" class="min-w-0 shrink-0 grow-0"
          :style="{ flexBasis: slideBasis, paddingLeft: `${gap}px` }">
          <slot :item="item" />
        </div>
      </div>
    </div>

    <div class="w-10 lg:w-28 hidden md:block absolute inset-y-0 left-0 z-5 pointer-events-none bg-linear-to-r from-negro-puro to-transparent" />
    <div class="w-10 lg:w-28 hidden md:block absolute inset-y-0 right-0 z-5 pointer-events-none bg-linear-to-l from-negro-puro to-transparent" />
  </div>
</template>

<script setup>
import emblaCarouselVue from 'embla-carousel-vue'

const props = defineProps({
  items: { type: Array, required: true },
  slidesPerView: { type: Number, default: 2.6 },
  gap: { type: Number, default: 16 }
})

const [emblaRef, embla] = emblaCarouselVue({
  loop: true,
  containScroll: false,
  align: (viewSize, snapSize) => (viewSize - 2 * snapSize) / 2
})

const slideBasis = computed(() => `${100 / props.slidesPerView}%`)

defineExpose({
  scrollPrev: () => embla.value?.scrollPrev(),
  scrollNext: () => embla.value?.scrollNext()
})
</script>
