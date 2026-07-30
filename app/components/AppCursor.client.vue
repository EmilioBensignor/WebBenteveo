<template>
  <div
    v-if="enabled"
    ref="cursor"
    class="w-4.5 h-4.5 fixed top-0 left-0 z-200 bg-blanco box-border rounded-full opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2"
    style="transition:width .18s,height .18s,background .18s"
    aria-hidden="true"
  />
</template>

<script setup>
const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-hover]'

const AMARILLO = '#FCB716'
const BLANCO = '#F8F8F8'
const NEGRO = '#131313'

const cursor = ref(null)
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
        if (isHover) {
          el.style.transform = 'translate(-50%,-50%)'
        } else {
          const dx = lag.x - lastX
          const dy = lag.y - lastY
          const v = Math.min(Math.hypot(dx, dy) / 14, 1)
          const ang = (Math.atan2(dy, dx) * 180) / Math.PI
          el.style.transform = `translate(-50%,-50%) rotate(${ang}deg) scale(${1 + v * 0.9},${1 - v * 0.4})`
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
