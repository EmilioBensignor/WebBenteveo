<template>
  <Section id="contacto" bg="bg-amarillo" class="py-8 px-4">
    <div class="max-w-72 flex flex-col items-center lg:items-start gap-3 text-center lg:text-left text-negro">
      <HeadingH2>¿Listo para el siguiente nivel?</HeadingH2>
      <p class="font-medium">
        Agenda una sesión de asesoramiento. Sin compromisos, solo pensar juntos.
      </p>
    </div>

    <form class="w-full flex flex-col gap-4 rounded-2xl bg-negro p-4 lg:p-12" @submit.prevent="submit">
      <FormField v-model="form.nombre" placeholder="Nombre" autocomplete="name" :error="errors.nombre" @blur="validate('nombre')" />
      <FormField v-model="form.correo" placeholder="Correo" type="email" autocomplete="email" :error="errors.correo" @blur="validate('correo')" />
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
