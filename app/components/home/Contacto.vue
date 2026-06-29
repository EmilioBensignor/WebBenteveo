<template>
  <Section id="contacto" bg="bg-amarillo" class="py-6 px-4 md:px-7 lg:px-16 xxl:px-30"
    inner="lg:justify-between md:flex-row gap-6 md:gap-0! lg:gap-16">
    <div
      class="max-w-136 flex flex-col items-center md:items-start gap-3 md:gap-4 text-center md:text-left text-negro md:pr-8 lg:pr-16">
      <p v-if="eyebrow" class="text-xs lg:text-sm font-medium">{{ eyebrow }}</p>
      <HeadingH2 :class="titleClass">{{ title }}</HeadingH2>
      <p class="lg:text-xl font-medium">{{ subtitle }}</p>
    </div>

    <FormContacto :submit-label="submitLabel" />
  </Section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  submitLabel: { type: String, default: 'Agendar cita' },
  titleClass: { type: String, default: '' },
})
</script>
