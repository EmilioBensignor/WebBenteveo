<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <HeadingH2 class="text-center text-blanco">
      Todo lo que necesitás, <span class="text-amarillo">resuelto en un solo lugar</span>
    </HeadingH2>

    <div ref="listRef" class="w-full max-w-260 grid md:grid-cols-2 gap-x-16 gap-y-6 lg:gap-y-10">
      <div v-for="(n, i) in necesidades" :key="n.title" class="flex items-start gap-4 lg:gap-5">
        <span
          class="size-8 lg:size-10 flex items-center justify-center shrink-0 border-2 rounded-full transition-all duration-500"
          :class="visible ? 'border-amarillo bg-amarillo/10' : 'border-blanco/20'"
          :style="`transition-delay: ${i * 120}ms`">
          <Icon name="material-symbols:check-rounded" class="size-5! lg:size-6! text-amarillo transition-all duration-500"
            :class="visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
            :style="`transition-delay: ${i * 120 + 150}ms`" />
        </span>
        <div class="flex flex-col gap-1 lg:gap-2 transition-all duration-500"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="`transition-delay: ${i * 120}ms`">
          <h3 class="text-amarillo text-base lg:text-xl font-bold">{{ n.title }}</h3>
          <p class="text-sm lg:text-base text-blanco font-medium">{{ n.text }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-4">
      <p class="lg:text-xl text-blanco font-medium">¿Ya tenés algo en mente?</p>
      <ButtonPrimary to="#contacto">Hablemos de tu evento</ButtonPrimary>
    </div>
  </Section>
</template>

<script setup>
import { necesidades } from '~/constants/eventos'

const listRef = ref(null)
const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.25 })
  observer.observe(listRef.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>
