<template>
  <component :is="to ? 'NuxtLink' : 'button'" :to="to" :type="to ? undefined : type" :disabled="!to && disabled"
    class="h-12 inline-flex justify-center items-center gap-2 rounded-full text-sm lg:text-base font-bold transition-colors duration-200 cursor-pointer py-4 px-6"
    :class="disabled ? 'opacity-50 cursor-not-allowed' : variants[variant]">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  to: String,
  variant: { type: String, default: 'solid' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false }
})

const variants = {
  solid: 'bg-amarillo text-negro lg:hover:bg-amarillo/90',
  light: 'bg-blanco text-negro lg:hover:bg-blanco/90',
  outline: 'border border-amarillo text-amarillo lg:hover:bg-amarillo lg:hover:text-negro'
}
</script>
