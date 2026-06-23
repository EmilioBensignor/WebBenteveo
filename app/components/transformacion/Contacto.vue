<template>
  <Section id="contacto" bg="bg-amarillo" class="md:flex-row md:gap-8 lg:gap-16 py-8 px-4 md:px-7 lg:px-16 xxl:px-30">
    <div
      class="max-w-72 sm:max-w-96 flex flex-col items-center md:items-start gap-3 md:gap-4 text-center md:text-left text-negro">
      <HeadingH2 class="md:text-2xl lg:text-5xl!">¿Listo para el siguiente nivel?</HeadingH2>
      <p class="lg:text-xl font-medium">
        Agenda una sesión de asesoramiento. Sin compromisos, solo pensar juntos.
      </p>
    </div>

    <form class="w-full flex flex-col gap-4 rounded-2xl bg-negro p-4 md:p-6 lg:py-12" @submit.prevent="submit">
      <FormField v-model="form.nombre" placeholder="Nombre" autocomplete="name" :error="errors.nombre"
        @blur="validate('nombre')" />
      <FormField v-model="form.correo" placeholder="Correo" type="email" autocomplete="email" :error="errors.correo"
        @blur="validate('correo')" />
      <FormField v-model="form.empresa" placeholder="Empresa" />
      <FormField v-model="form.sector" placeholder="Sector" />
      <ButtonPrimary type="submit" class="w-full">Enviar mi consulta</ButtonPrimary>
    </form>
  </Section>
</template>

<script setup>
const form = reactive({ nombre: '', correo: '', empresa: '', sector: '' })
const errors = reactive({ nombre: null, correo: null })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (field) => {
  if (field === 'nombre') errors.nombre = form.nombre.trim() ? null : 'El nombre es requerido'
  if (field === 'correo') errors.correo = EMAIL_RE.test(form.correo) ? null : 'Ingresá un correo válido'
}

const submit = () => {
  validate('nombre')
  validate('correo')
  if (errors.nombre || errors.correo) return
  console.log('Formulario enviado:', { ...form })
  Object.assign(form, { nombre: '', correo: '', empresa: '', sector: '' })
  Object.assign(errors, { nombre: null, correo: null })
}
</script>
