<template>
  <component :is="to ? NuxtLink : 'button'" :to="to" :type="to ? undefined : type" :disabled="!to && disabled"
    class="inline-flex justify-center items-center gap-2 rounded-full text-sm lg:text-base transition-colors duration-200 cursor-pointer"
    :class="[sizes[size], disabled ? 'opacity-50 cursor-not-allowed' : variants[variant]]">
    <slot />
  </component>
</template>

<script setup>
import { NuxtLink } from '#components'

defineProps({
  to: String,
  variant: { type: String, default: 'solid' },
  size: { type: String, default: 'md' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false }
})

const sizes = {
  md: 'h-12 py-4 px-6',
  glass: 'py-3 px-6'
}

const variants = {
  solid: 'bg-amarillo text-negro lg:hover:bg-amarillo/90',
  light: 'bg-blanco text-negro lg:hover:bg-blanco/90',
  dark: 'bg-negro text-amarillo lg:hover:bg-negro/90',
  outline: 'border border-amarillo text-amarillo lg:hover:bg-amarillo lg:hover:text-negro',
  glass: 'glass-boton text-hueso [text-shadow:2px_2px_8px_rgba(0,0,0,0.08)] lg:hover:text-amarillo'
}
</script>
