<template>
  <svg viewBox="0 0 100 100" aria-hidden="true" fill="currentColor">
    <path v-for="(e, i) in estrellas" :key="i" :d="e" />
  </svg>
</template>

<script setup>
function estrella(cx, cy, r) {
  const puntos = []
  for (let i = 0; i < 10; i++) {
    const radio = i % 2 ? r * 0.4 : r
    const angulo = -Math.PI / 2 + (i * Math.PI) / 5
    puntos.push(`${(cx + radio * Math.cos(angulo)).toFixed(2)},${(cy + radio * Math.sin(angulo)).toFixed(2)}`)
  }
  return `M${puntos.join('L')}Z`
}

const estrellas = Array.from({ length: 12 }, (_, i) => {
  const angulo = (i * Math.PI) / 6
  return estrella(50 + 38 * Math.cos(angulo), 50 + 38 * Math.sin(angulo), 7)
})
</script>
