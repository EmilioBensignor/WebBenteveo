<template>
  <input :id="id" v-model.number="modelo" type="range" :min="MONTO_MIN" :max="MONTO_MAX" :step="MONTO_PASO"
    class="rango" :style="{ '--p': `${relleno}%` }">
</template>

<script setup>
import { MONTO_MIN, MONTO_MAX, MONTO_PASO } from '~/composables/useCalculoKit'

defineProps({ id: { type: String, required: true } })

const modelo = defineModel({ type: Number, required: true })
const relleno = computed(() => ((modelo.value - MONTO_MIN) / (MONTO_MAX - MONTO_MIN)) * 100)
</script>

<style scoped>
.rango {
  width: 100%;
  height: 8px;
  appearance: none;
  background: linear-gradient(90deg, var(--color-amarillo) 0 var(--p), rgb(248 248 248 / 0.18) var(--p) 100%);
  border-radius: 999px;
  outline: none;
  cursor: pointer;
}

.rango::-webkit-slider-thumb {
  appearance: none;
  width: 26px;
  height: 26px;
  background: var(--color-amarillo);
  border: 3px solid var(--color-negro);
  border-radius: 50%;
  box-shadow: var(--shadow-amarilla);
  cursor: grab;
  transition: transform 0.15s ease-out;
}

.rango::-moz-range-thumb {
  width: 26px;
  height: 26px;
  background: var(--color-amarillo);
  border: 3px solid var(--color-negro);
  border-radius: 50%;
  box-shadow: var(--shadow-amarilla);
  cursor: grab;
}

.rango:active::-webkit-slider-thumb {
  transform: scale(1.15);
}

.rango:focus-visible::-webkit-slider-thumb {
  outline: 2px solid var(--color-blanco);
  outline-offset: 2px;
}

.rango:focus-visible::-moz-range-thumb {
  outline: 2px solid var(--color-blanco);
  outline-offset: 2px;
}
</style>
