<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <div class="flex flex-col items-center gap-3 lg:gap-4 text-center">
      <HeadingH2 class="max-w-64 md:max-w-full">
        <span class="text-blanco">Cuatro cosas que cambian en tu empresa</span>
        <span class="text-amarillo"> cuando integras IA a tus procesos</span>
      </HeadingH2>
      <p class="max-w-64 sm:max-w-80 md:max-w-full lg:text-xl text-blanco font-medium">
        Deja de apagar incendios y empieza a crecer
      </p>
    </div>

    <div class="w-full max-w-240 flex flex-col">
      <article v-for="(b, i) in beneficios" :key="b.number" class="border-t border-blanco/15 last:border-b">
        <button type="button" class="w-full flex items-center gap-4 lg:gap-8 text-left cursor-pointer py-6 lg:py-8"
          :aria-expanded="active === i" @click="active = active === i ? -1 : i">
          <span class="text-3xl lg:text-5xl font-bold tabular-nums transition-colors duration-300"
            :class="active === i ? 'text-amarillo' : 'text-blanco/30'">
            {{ b.number }}
          </span>
          <HeadingH3 class="flex-1 font-bold transition-colors duration-300"
            :class="active === i ? 'text-amarillo' : 'text-blanco'">
            <span v-html="b.title" />
          </HeadingH3>
          <Icon name="material-symbols:add-rounded" size="28"
            class="shrink-0 text-amarillo transition-transform duration-300" :class="active === i ? 'rotate-45' : ''" />
        </button>
        <div class="grid transition-[grid-template-rows] duration-400 ease-out"
          :class="active === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
          <div class="overflow-hidden">
            <div class="flex items-start gap-4 pb-6 lg:pb-8 pl-12 lg:pl-21">
              <span class="flex items-center justify-center shrink-0 bg-amarillo/10 rounded-full text-amarillo p-2.5">
                <Icon :name="b.icon" size="20" />
              </span>
              <p class="max-w-150 text-sm lg:text-base text-blanco font-medium">{{ b.text }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>

    <ButtonPrimary>Quiero aplicarlo a mi empresa</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/transformacion'

const active = ref(0)
</script>
