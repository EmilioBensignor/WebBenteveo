<template>
  <div
    v-if="enabled"
    ref="cursor"
    class="w-4.5 h-4.5 flex justify-center items-center fixed top-0 left-0 z-200 box-border rounded-full text-hueso text-sm font-medium whitespace-nowrap opacity-0 overflow-hidden pointer-events-none"
    style="background:#F8F8F8;transition:width .5s cubic-bezier(0.4,0,0.2,1),height .5s cubic-bezier(0.4,0,0.2,1)"
    aria-hidden="true"
  >
    <span ref="etiqueta"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-150" />
  </div>
</template>

<script setup>
const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-hover]'

const AMARILLO = '#FCB716'
const BLANCO = '#F8F8F8'
const NEGRO = '#131313'

const cursor = ref(null)
const etiqueta = ref(null)
const enabled = ref(false)

const hoverColor = (el) => {
  if (el.classList.contains('bg-amarillo')) return NEGRO
  if (el.classList.contains('bg-blanco')) return AMARILLO
  return BLANCO
}

onMounted(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  enabled.value = true

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  const lag = { x: mouse.x, y: mouse.y }
  let isHover = false
  let etiquetaActual = ''
  let salida = null
  let visible = false
  let raf = null
  let lastX = lag.x
  let lastY = lag.y

  document.documentElement.classList.add('custom-cursor')

  const onMove = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    const el = cursor.value
    if (!el) return
    if (!visible) {
      visible = true
      lag.x = lastX = mouse.x
      lag.y = lastY = mouse.y
      el.style.opacity = '1'
    }
    const conEtiqueta = e.target.closest?.('[data-cursor-label]')
    const texto = conEtiqueta?.dataset.cursorLabel || ''

    if (texto !== etiquetaActual) {
      etiquetaActual = texto
      const caja = etiqueta.value

      if (texto && caja) {
        clearTimeout(salida)
        caja.textContent = texto
        const ancho = caja.offsetWidth + 48
        el.classList.add('glass-boton', 'activo')
        el.style.background = 'rgb(221 221 221 / 0.24)'
        el.style.width = `${ancho}px`
        el.style.height = '44px'
        caja.style.opacity = '1'
      } else if (caja) {
        caja.style.opacity = '0'
        el.style.width = '18px'
        el.style.height = '18px'
        clearTimeout(salida)
        salida = setTimeout(() => {
          if (etiquetaActual) return
          el.classList.remove('glass-boton', 'activo')
          el.style.background = BLANCO
          caja.textContent = ''
        }, 500)
      }
    }

    if (texto) {
      isHover = true
      return
    }

    const target = e.target.closest?.(HOVER_SELECTOR)
    const nextHover = !!target

    if (nextHover !== isHover || nextHover) {
      isHover = nextHover
      el.style.width = isHover ? '26px' : '18px'
      el.style.height = isHover ? '26px' : '18px'
      el.style.background = isHover ? hoverColor(target) : BLANCO
    }
  }

  const onLeave = () => {
    if (cursor.value) cursor.value.style.opacity = '0'
    visible = false
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)

  const loop = () => {
    const el = cursor.value
    if (el) {
      if (reduce) {
        el.style.left = mouse.x + 'px'
        el.style.top = mouse.y + 'px'
      } else {
        lag.x += (mouse.x - lag.x) * 0.35
        lag.y += (mouse.y - lag.y) * 0.35
        el.style.left = lag.x + 'px'
        el.style.top = lag.y + 'px'
        const mitadX = el.offsetWidth / 2
        const mitadY = el.offsetHeight / 2

        if (etiquetaActual || isHover || el.classList.contains('glass-boton')) {
          el.style.transform = `translate(${-mitadX}px,${-mitadY}px)`
        } else {
          const dx = lag.x - lastX
          const dy = lag.y - lastY
          const v = Math.min(Math.hypot(dx, dy) / 14, 1)
          const ang = (Math.atan2(dy, dx) * 180) / Math.PI
          el.style.transform = `translate(${-mitadX}px,${-mitadY}px) rotate(${ang}deg) scale(${1 + v * 0.9},${1 - v * 0.4})`
        }
        lastX = lag.x
        lastY = lag.y
      }
    }
    raf = requestAnimationFrame(loop)
  }
  loop()

  onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerleave', onLeave)
    document.documentElement.classList.remove('custom-cursor')
  })
})
</script>
