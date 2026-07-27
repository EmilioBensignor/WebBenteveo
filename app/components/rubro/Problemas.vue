<template>
  <Section class="overflow-visible! px-4 md:px-7 lg:px-16 xxl:px-30" inner="gap-6">
    <p
      class="max-w-72 sm:max-w-96 tab:max-w-120 md:max-w-146 lg:max-w-236 text-center lg:text-xl text-blanco font-medium"
      v-html="parrafo" />

    <div class="w-full max-w-220 flex flex-col gap-6 lg:gap-8 pb-10 [--card-offset:6rem] lg:[--card-offset:8rem]">
      <HeadingH2 class="max-w-64 md:max-w-full self-center sticky top-6 lg:top-10 text-center">
        <span class="text-blanco">Todo lo que necesitás,</span> <span class="text-amarillo">resuelto en un solo
          lugar</span>
      </HeadingH2>

      <TransformacionCardNumero v-for="(p, i) in problemas" :key="p.titulo" :index="i" :icon="p.icon"
        :number="String(i + 1).padStart(2, '0')" :title="p.titulo" :text="p.texto" />
    </div>

    <p
      class="max-w-72 sm:max-w-96 tab:max-w-120 md:max-w-146 lg:max-w-236 text-center lg:text-xl text-blanco font-medium">
      Estos son algunos de los desafíos que resolvemos. Cada empresa de {{ nombre }} es distinta:
      <span class="block text-amarillo">nos sentamos con vos, entendemos tu operación y diseñamos la solución que
        necesitás.</span>
    </p>
  </Section>
</template>

<script setup>
defineProps({
  parrafo: { type: String, required: true },
  problemas: { type: Array, required: true },
  nombre: { type: String, required: true }
})
</script>
