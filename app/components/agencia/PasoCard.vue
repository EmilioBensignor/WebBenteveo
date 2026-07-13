<template>
  <button type="button" :aria-pressed="active"
    class="h-75 lg:h-91 flex flex-col justify-end relative border rounded-2xl text-left transition-colors duration-500 cursor-pointer overflow-hidden p-4 lg:p-6"
    :class="active ? 'border-transparent spin-border' : 'border-blanco/33'">
    <div class="absolute inset-0">
      <NuxtImg :src="paso.image" alt="" format="avif,webp" sizes="400px" loading="lazy"
        class="size-full object-cover transition-opacity duration-500" :class="active ? 'opacity-100' : 'opacity-33'" />
      <div class="absolute inset-0 bg-linear-to-b from-transparent to-black to-50% md:to-75%" />
    </div>

    <span class="absolute -top-4 lg:-top-5 -right-2 lg:-right-3 text-8xl lg:text-9xl font-bold leading-none transition-colors duration-500"
      :class="active ? 'text-amarillo/50' : 'text-negro/50'">0{{ index + 1 }}</span>

    <div class="flex flex-col gap-4 relative">
      <div class="flex items-center gap-2">
        <span class="w-3 h-0.5 rounded-full shadow-amarilla transition-colors duration-500"
          :class="active ? 'bg-amarillo' : 'bg-blanco'" />
        <span class="text-xs font-medium transition-colors duration-500"
          :class="active ? 'text-amarillo' : 'text-blanco'">Paso {{ index + 1 }} de 3</span>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="lg:text-xl font-bold transition-colors duration-500"
          :class="active ? 'text-amarillo' : 'text-blanco'">{{ paso.title }}</h3>
        <p class="text-sm lg:text-base text-blanco font-medium">{{ paso.text }}</p>
      </div>
    </div>
  </button>
</template>

<script setup>
defineProps({
  paso: { type: Object, required: true },
  index: { type: Number, required: true },
  active: { type: Boolean, default: false }
})
</script>

<style scoped>
.spin-border::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 20;
  border-radius: inherit;
  padding: 1.5px;
  background: conic-gradient(from var(--angle), transparent 55%, var(--color-amarillo));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: spin-border 4s linear infinite;
}
</style>
