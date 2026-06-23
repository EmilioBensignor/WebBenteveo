<template>
  <section class="w-full relative overflow-hidden" :class="bg">
    <div v-if="$slots.background" class="absolute inset-0">
      <slot name="background" />
    </div>
    <div class="w-full max-w-344 flex flex-col justify-center items-center gap-3 md:gap-4 lg:gap-6 xxl:gap-8 relative z-10 mx-auto" v-bind="$attrs">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineOptions({ inheritAttrs: false })

defineProps({
  bg: { type: String, default: '' }
})
</script>
