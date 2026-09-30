import { START_LOCATION } from 'vue-router'

export default {
  scrollBehavior(to, from, savedPosition) {
    const samePage = to.path.replace(/\/$/, '') === from.path.replace(/\/$/, '')
    if (samePage) return to.hash ? { el: to.hash, behavior: 'smooth' } : false

    const position = () => {
      const top = savedPosition?.top ?? 0
      window.__lenis?.scrollTo(top, { immediate: true, force: true })
      return to.hash ? { el: to.hash } : { left: 0, top }
    }

    if (from === START_LOCATION) return position()

    return new Promise((resolve) => {
      useNuxtApp().hooks.hookOnce('page:loading:end', () => {
        requestAnimationFrame(() => resolve(position()))
      })
    })
  }
}
