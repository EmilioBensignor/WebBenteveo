<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <HeadingH2 class="text-center text-blanco">
      Todo lo que necesitás, <span class="text-amarillo">resuelto en un solo lugar</span>
    </HeadingH2>

    <div class="w-full max-w-300 flex flex-col">
      <article v-for="n in necesidades" :key="n.title"
        class="group relative border-t border-blanco/15 last:border-b overflow-hidden">
        <span
          class="absolute inset-0 bg-amarillo origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
        <div class="grid md:grid-cols-2 md:items-center gap-2 md:gap-10 relative px-2 md:px-4 py-6 lg:py-8">
          <div class="flex items-center gap-4">
            <Icon :name="n.icon" size="24"
              class="shrink-0 text-amarillo group-hover:text-negro-puro transition-colors duration-500" />
            <div class="grid *:col-start-1 *:row-start-1 overflow-hidden">
              <h3
                class="text-blanco text-lg lg:text-2xl font-bold transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                {{ n.title }}
              </h3>
              <h3
                class="text-negro-puro text-lg lg:text-2xl font-bold translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                aria-hidden="true">
                {{ n.title }}
              </h3>
            </div>
          </div>
          <p
            class="text-sm lg:text-base text-blanco/60 md:text-negro-puro font-medium md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400 delay-100 pl-10 md:pl-0">
            {{ n.text }}
          </p>
        </div>
      </article>
    </div>

    <div class="flex flex-col items-center gap-4">
      <p class="lg:text-xl text-blanco font-medium">¿Ya tenés algo en mente?</p>
      <ButtonPrimary to="#contacto">Hablemos de tu evento</ButtonPrimary>
    </div>
  </Section>
</template>

<script setup>
import { necesidades } from '~/constants/eventos'
</script>
