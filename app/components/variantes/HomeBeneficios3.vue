<template>
  <Section class="py-16 md:py-24 lg:py-32 px-4 md:px-7 lg:px-16 xxl:px-32">
    <div class="max-w-150 lg:max-w-200 flex flex-col items-center gap-2 lg:gap-4 text-center px-4">
      <HeadingH2 class="text-blanco font-bold!">
        Cuando creatividad, tecnología y producción trabajan <span class="text-amarillo">juntos desde el día uno</span>,
        los resultados son mejores.
      </HeadingH2>
      <p class="text-lg lg:text-xl text-blanco/80 font-medium">
        El mismo equipo, el mismo criterio y la misma visión de tu marca.
      </p>
    </div>

    <div class="w-full max-w-300 grid md:grid-cols-3 gap-3 lg:gap-4">
      <article v-for="(b, i) in beneficios" :key="b.title" @mousemove="move"
        class="spot group min-h-64 lg:min-h-80 flex flex-col justify-between gap-10 relative bg-negro border border-blanco/10 hover:border-amarillo/40 rounded-3xl transition-all duration-300 hover:-translate-y-1 overflow-hidden p-6 lg:p-9">
        <Icon :name="b.icon"
          class="size-36! lg:size-44! absolute -bottom-8 -right-8 text-blanco/4 group-hover:text-amarillo/10 -rotate-12 group-hover:rotate-0 transition-all duration-500 pointer-events-none" />
        <div class="flex items-center justify-between relative">
          <span
            class="size-12 lg:size-14 flex items-center justify-center bg-amarillo/10 rounded-full text-amarillo">
            <Icon :name="b.icon" class="size-6! lg:size-7!" />
          </span>
          <span class="text-sm font-semibold tabular-nums text-blanco/25 group-hover:text-amarillo/60 transition-colors duration-300">
            0{{ i + 1 }}
          </span>
        </div>
        <div class="flex flex-col gap-2 lg:gap-3 relative">
          <h3 class="text-amarillo text-xl lg:text-2xl font-bold">{{ b.title }}</h3>
          <p class="max-w-70 text-blanco text-sm lg:text-base font-medium">{{ b.text }}</p>
        </div>
      </article>
    </div>

    <ButtonPrimary to="#servicios">Conoce como trabajamos</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/home'

const move = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<style scoped>
.spot::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(320px circle at var(--mx, 50%) var(--my, -20%), rgba(252, 183, 22, 0.13), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.spot:hover::before {
  opacity: 1;
}
</style>
