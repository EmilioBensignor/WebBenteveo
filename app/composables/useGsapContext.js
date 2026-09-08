export function useGsapContext(root, setup) {
  let ctx = null

  onMounted(async () => {
    if (!root.value) return

    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    if (!root.value) return

    ctx = gsap.context(() => {}, root.value)
    ctx.add(() => setup(ctx, gsap, ScrollTrigger))
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })
}
