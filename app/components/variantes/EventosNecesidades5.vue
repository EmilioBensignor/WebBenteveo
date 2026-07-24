<template>
  <Section class="px-0" inner="gap-8 lg:gap-12 overflow-hidden py-1">
    <HeadingH2 class="text-center text-blanco px-4">
      Todo lo que necesitás, <span class="text-amarillo">resuelto en un solo lugar</span>
    </HeadingH2>

    <div class="w-screen flex flex-col gap-3 lg:gap-4 group">
      <div v-for="(row, r) in rows" :key="r" class="flex w-max" :class="r === 1 ? 'marquee-reverse' : 'marquee'">
        <div v-for="n2 in 2" :key="n2" class="flex gap-3 lg:gap-4 shrink-0 pr-3 lg:pr-4">
          <div v-for="n in row" :key="n.title"
            class="flex items-center gap-3 bg-negro border border-blanco/20 hover:border-amarillo rounded-full transition-colors duration-300 whitespace-nowrap px-5 lg:px-6 py-3 lg:py-4">
            <Icon :name="n.icon" size="20" class="shrink-0 text-amarillo" />
            <span class="text-blanco text-sm lg:text-base font-semibold">{{ n.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <p class="max-w-150 text-center text-sm lg:text-base text-blanco/70 font-medium px-4">
      Estrategia, identidad, operativa, contenido, convocatoria y métricas. Todo bajo el mismo techo.
    </p>

    <div class="flex flex-col items-center gap-4">
      <p class="lg:text-xl text-blanco font-medium">¿Ya tenés algo en mente?</p>
      <ButtonPrimary to="#contacto">Hablemos de tu evento</ButtonPrimary>
    </div>
  </Section>
</template>

<script setup>
import { necesidades } from '~/constants/eventos'

const rows = [necesidades.slice(0, 3), necesidades.slice(3)]
</script>

<style scoped>
.marquee {
  animation: marquee 26s linear infinite;
}

.marquee-reverse {
  animation: marquee 22s linear infinite reverse;
}

.group:hover .marquee,
.group:hover .marquee-reverse {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
