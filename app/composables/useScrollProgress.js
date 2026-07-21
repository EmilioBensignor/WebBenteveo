export function useScrollProgress(targetRef, map, smooth = 0.12) {
  const progress = ref(0)
  let raf = null
  let target = 0

  const defaultMap = (r, vh) => (vh - r.top) / (r.height + vh)

  const update = () => {
    const el = targetRef.value?.$el || targetRef.value
    if (el) {
      const raw = (map || defaultMap)(el.getBoundingClientRect(), window.innerHeight)
      target = Math.min(1, Math.max(0, raw))
      const next = progress.value + (target - progress.value) * smooth
      progress.value = Math.abs(target - next) < 0.001 ? target : next
    }
    raf = requestAnimationFrame(update)
  }

  onMounted(() => { raf = requestAnimationFrame(update) })
  onUnmounted(() => cancelAnimationFrame(raf))

  return progress
}
