<template>
  <div ref="wrapRef" class="h-[320vh] relative">
    <div class="h-dvh w-full sticky top-0 overflow-hidden">
      <div class="size-full max-w-344 flex flex-col justify-center gap-6 md:gap-10 mx-auto px-4 md:px-7 lg:px-16 xxl:px-30 py-6 md:py-10">
        <HeadingH2 class="max-w-72 sm:max-w-96 md:max-w-none self-center text-center text-blanco">
          Todo empieza con una idea. <span class="text-amarillo">Todo sucede en el mismo equipo.</span>
        </HeadingH2>

        <div class="w-full flex flex-col-reverse md:grid md:grid-cols-2 md:items-center gap-6 md:gap-12 lg:gap-20">
          <div class="flex flex-col gap-3 md:gap-4 relative">
            <span class="absolute -top-6 md:-top-24 -left-2 md:-left-6 text-[7rem] md:text-[13rem] text-blanco/5 font-bold leading-none select-none">
              0{{ active + 1 }}
            </span>

            <Transition name="escena" mode="out-in">
              <div :key="active" class="flex flex-col gap-2 md:gap-3 relative">
                <span class="flex items-center gap-2 text-xs md:text-sm text-amarillo font-medium">
                  <span class="w-3 h-0.5 bg-amarillo rounded-full shadow-amarilla" />
                  Paso {{ active + 1 }} de {{ pasos.length }}
                </span>
                <h3 class="text-3xl md:text-5xl text-blanco font-bold">{{ pasos[active].title }}</h3>
                <p class="max-w-110 text-sm md:text-lg text-blanco/70 font-medium">{{ pasos[active].text }}</p>
              </div>
            </Transition>

            <div class="flex gap-2 mt-2 md:mt-6">
              <div v-for="(_, i) in pasos" :key="i" class="h-1 flex-1 max-w-24 bg-blanco/15 rounded-full overflow-hidden">
                <div class="h-full bg-amarillo rounded-full" :style="{ width: `${segFill(i) * 100}%` }" />
              </div>
            </div>
          </div>

          <div class="relative aspect-16/10 md:aspect-8/7 lg:aspect-16/11 rounded-3xl overflow-hidden">
            <NuxtImg v-for="(paso, i) in pasos" :key="paso.title" :src="paso.image" :alt="paso.title"
              format="avif,webp" sizes="700px" :loading="i ? 'lazy' : undefined"
              class="size-full absolute inset-0 object-cover transition-all duration-700 ease-out"
              :class="active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-110'" />
            <div class="absolute inset-0 rounded-3xl border border-blanco/10" />
            <span class="absolute bottom-3 right-4 text-xs text-blanco/80 font-semibold uppercase tracking-widest">
              {{ pasos[active].title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { pasos } from '~/constants/agencia'

const wrapRef = ref(null)
const progress = useScrollProgress(wrapRef, (r, vh) => -r.top / (r.height - vh))

const active = computed(() => Math.min(pasos.length - 1, Math.floor(progress.value * pasos.length)))
const segFill = (i) => Math.min(1, Math.max(0, progress.value * pasos.length - i))
</script>

<style scoped>
.escena-enter-active,
.escena-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.escena-enter-from {
  opacity: 0;
  transform: translateY(1.25rem);
}

.escena-leave-to {
  opacity: 0;
  transform: translateY(-1.25rem);
}
</style>
