export function useSmoothScroll() {
  let lenis = null
  let killTicker = null

  onMounted(async () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    const Lenis = (await import('lenis')).default
    gsap.registerPlugin(ScrollTrigger)

    lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    killTicker = () => gsap.ticker.remove(raf)

    window.__lenis = lenis
  })

  onBeforeUnmount(() => {
    killTicker?.()
    lenis?.destroy()
    lenis = null
    delete window.__lenis
  })
}

export function scrollToEl(target, offset = 0) {
  if (typeof window === 'undefined') return

  const el = typeof target === 'string' ? document.getElementById(target) : target
  if (!el) return

  if (window.__lenis) window.__lenis.scrollTo(el, { offset, duration: 1.2 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
