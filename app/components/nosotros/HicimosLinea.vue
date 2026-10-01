<template>
  <section ref="root" class="w-full relative z-10 overflow-hidden bg-negro px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14">
    <div class="w-full max-w-362 mx-auto flex flex-col items-center gap-10 lg:gap-16 xxl:gap-20">
      <UiHeadingH2 class="text-center">Lo que ya hicimos</UiHeadingH2>

      <div class="w-full flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-8 lg:gap-x-12 xl:gap-x-16">
        <div class="w-full flex flex-col gap-8 lg:gap-12">
          <div class="w-full flex items-center gap-4">
            <span class="flex-1 h-px bg-linear-to-r from-transparent to-blanco/30" />
            <UiHeadingH3 class="text-sm glass bg-negro/50! rounded-full text-hueso font-normal! px-5 py-2 lg:px-6">Premios</UiHeadingH3>
            <span class="flex-1 h-px bg-linear-to-l from-transparent to-blanco/30" />
          </div>

          <ol ref="linea" class="w-full relative flex flex-col gap-7 tab:max-md:gap-6">
            <li class="absolute left-1.25 top-2 bottom-2 w-px bg-blanco/15" aria-hidden="true">
              <span ref="relleno" class="absolute inset-0 origin-top bg-amarillo" />
            </li>
            <li v-for="(p, i) in premios" :key="i" class="relative flex flex-col tab:max-md:flex-row tab:max-md:items-center gap-1.5 tab:max-md:gap-8 md:gap-2 pl-8 lg:pl-10">
              <span class="punto size-2.75 absolute left-0 top-1.5 tab:max-md:top-1/2 tab:max-md:-translate-y-1/2 md:top-3 lg:top-4.5 rounded-full border border-blanco/40 bg-negro" />
              <span class="text-hueso text-2xl tab:max-md:text-3xl md:text-4xl lg:text-5xl font-bold leading-none tabular-nums tab:max-md:w-20 shrink-0">{{ p.anio }}</span>
              <span class="flex flex-col gap-1.5 lg:gap-2">
                <span class="text-hueso text-sm md:text-base font-medium leading-[1.3]">{{ p.premio }}</span>
                <span v-if="p.categoria" class="text-hueso/60 text-xs md:text-sm font-light leading-[1.3]">{{ p.categoria }}</span>
              </span>
            </li>
          </ol>
        </div>

        <div class="w-full flex flex-col gap-8 lg:gap-12">
          <div class="w-full flex items-center gap-4">
            <span class="flex-1 h-px bg-linear-to-r from-transparent to-blanco/30" />
            <UiHeadingH3 class="text-sm glass bg-negro/50! rounded-full text-hueso font-normal! px-5 py-2 lg:px-6">Sectores</UiHeadingH3>
            <span class="flex-1 h-px bg-linear-to-l from-transparent to-blanco/30" />
          </div>

          <ul ref="listaSectores" class="w-full flex flex-wrap justify-center gap-2 md:gap-3 md:flex-1 md:flex-col md:flex-nowrap">
            <li v-for="s in sectores" :key="s.nombre"
              class="group w-[calc(50%-0.25rem)] tab:w-[calc(33.333%-0.34rem)] md:w-full h-24 md:h-auto md:min-h-14 md:flex-1 relative rounded-2xl border border-blanco/33 bg-linear-to-b from-blanco/5 to-transparent md:bg-linear-to-r overflow-hidden p-3 md:py-0 md:px-5 lg:px-6 md:flex md:justify-between md:items-center md:gap-4 md:transition-[border-color,box-shadow] md:duration-300 md:hover:border-amarillo md:hover:shadow-amarilla">
              <span class="relative z-1 text-hueso text-sm md:text-base lg:text-lg font-semibold leading-tight">{{ s.nombre }}</span>
              <Icon :name="s.icono"
                class="absolute md:static -right-3 -bottom-4 text-amarillo size-16! md:size-7! lg:size-8! shrink-0 md:transition-transform md:duration-500 md:ease-out md:group-hover:scale-115" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { premios, sectores } from '~/constants/nosotros'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const linea = useTemplateRef('linea')
const relleno = useTemplateRef('relleno')
const listaSectores = useTemplateRef('listaSectores')

useGsapContext(root, (ctx, gsap) => {
  const puntos = linea.value.querySelectorAll('.punto')
  const encender = (el) => gsap.set(el, { backgroundColor: '#FCB716', borderColor: '#FCB716', boxShadow: '0 0 18px 0 rgba(252,183,22,0.6)' })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    puntos.forEach(encender)
    return
  }

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: linea.value, start: 'top 70%', end: 'bottom 55%', scrub: 0.5 }
  })
  tl.fromTo(relleno.value, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
  puntos.forEach((p, i) => {
    const t = i / (puntos.length - 1)
    tl.to(p, { backgroundColor: '#FCB716', borderColor: '#FCB716', boxShadow: '0 0 18px 0 rgba(252,183,22,0.6)', duration: 0.05 }, Math.max(0, t - 0.03))
    tl.from([...p.parentElement.children].slice(1), { autoAlpha: 0.25, duration: 0.08 }, Math.max(0, t - 0.06))
  })

  gsap.from(listaSectores.value.children, {
    autoAlpha: 0, y: 30, duration: 0.8, ease: 'power3.out', stagger: 0.06,
    scrollTrigger: { trigger: listaSectores.value, start: 'top 80%', once: true }
  })
})
</script>
