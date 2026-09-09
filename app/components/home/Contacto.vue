<template>
  <DefaultSection id="contacto" bg="bg-negro"
    class="sobre-amarillo relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14"
    inner="max-w-410!">
    <div
      class="w-full max-w-410 flex flex-col items-center gap-4 md:gap-8 xxl:gap-12 bg-amarillo rounded-3xl md:rounded-[3rem] md:flex-row md:items-center px-3 py-6 md:px-5 md:py-8 lg:px-10 lg:py-16 xxl:px-24 xxl:py-20">
      <div
        class="w-full md:flex-1 md:min-w-0 flex flex-col items-center md:items-start gap-2 md:gap-4 text-center md:text-left text-negro">
        <p v-if="eyebrow" class="text-xs md:text-base lg:text-xl font-light">{{ eyebrow }}</p>

        <h2 class="text-negro-puro text-xl md:text-2xl lg:text-[2rem] xxl:text-4xl font-bold" v-html="title" />

        <p class="text-xs md:text-sm lg:text-xl font-light" v-html="subtitle" />
      </div>

      <div class="w-full md:flex-1 md:min-w-0 flex justify-center">
        <SharedFormContacto :submit-label="submitLabel" />
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  submitLabel: { type: String, default: 'Agendar cita' }
})
</script>
