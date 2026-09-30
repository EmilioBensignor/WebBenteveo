<template>
  <div v-if="estado !== 'idle'" class="w-full flex flex-col items-center gap-4 text-center text-hueso py-8">
    <span v-if="estado === 'loading'" class="size-10 rounded-full border-2 border-current border-t-transparent animate-spin" />
    <template v-else>
      <Icon name="material-symbols:download-done-rounded" size="56" class="text-amarillo" />
      <p class="text-amarillo text-lg lg:text-xl font-bold">Tu diagnóstico está en camino</p>
      <p class="text-sm lg:text-base font-light">Te enviamos el diagnóstico detallado y la guía a {{ form.correo }}.</p>
    </template>
  </div>

  <form v-else novalidate class="w-full flex flex-col gap-3 lg:gap-4" @submit.prevent="enviar">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
      <div class="flex flex-col gap-1">
        <input v-model="form.nombre" type="text" placeholder="Nombre completo *" autocomplete="name" aria-label="Nombre completo"
          :class="[CAMPO, errores.nombre && 'ring-1 ring-red-400']" @blur="validar('nombre')" />
        <p v-if="errores.nombre" class="text-xs text-red-400 px-1">{{ errores.nombre }}</p>
      </div>

      <div class="flex flex-col gap-1">
        <div class="h-12 flex items-stretch rounded-lg overflow-hidden bg-blanco/10 focus-within:ring-1 focus-within:ring-amarillo"
          :class="errores.web && 'ring-1 ring-red-400'">
          <span class="flex items-center border-r border-blanco/10 font-mono text-hueso/60 text-xs lg:text-sm px-3">https://</span>
          <input v-model="form.web" type="text" placeholder="tuempresa.com *" autocomplete="url" aria-label="Sitio web de la empresa"
            class="min-w-0 flex-1 bg-transparent text-hueso placeholder:text-hueso/50 text-sm lg:text-base font-light outline-none px-3"
            @blur="validar('web')" />
        </div>
        <p v-if="errores.web" class="text-xs text-red-400 px-1">{{ errores.web }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <input v-model="form.correo" type="email" placeholder="Correo corporativo *" autocomplete="email" aria-label="Correo corporativo"
        :class="[CAMPO, errores.correo && 'ring-1 ring-red-400']" @blur="validar('correo')" />
      <p v-if="errores.correo" class="text-xs text-red-400 px-1">{{ errores.correo }}</p>
    </div>

    <label class="group flex items-start gap-3 cursor-pointer text-hueso/70 text-xs lg:text-sm font-light leading-normal mt-1">
      <input v-model="form.acepto" type="checkbox" class="peer sr-only" />
      <span class="size-5 flex justify-center items-center shrink-0 border rounded-md transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-amarillo/50"
        :class="form.acepto ? 'bg-amarillo border-amarillo text-negro' : errores.acepto ? 'border-red-400' : 'border-blanco/30 lg:group-hover:border-amarillo/70'">
        <Icon name="material-symbols:check-rounded" size="16" class="transition-transform duration-200" :class="form.acepto ? 'scale-100' : 'scale-0'" />
      </span>
      <span class="pt-px">
        Acepto la <a href="#" class="text-hueso underline underline-offset-2 decoration-amarillo/60 transition-colors duration-200 lg:hover:text-amarillo">política de privacidad</a>. Datos tratados según el RGPD, con absoluta confidencialidad.
      </span>
    </label>
    <p v-if="errores.acepto" class="-mt-2 text-xs text-red-400 pl-8">{{ errores.acepto }}</p>

    <UiButtonPrimary type="submit" class="w-full gap-2 font-semibold mt-1">
      <Icon name="material-symbols:download-rounded" size="20" class="shrink-0" />
      Descargar diagnóstico y guía
    </UiButtonPrimary>
  </form>
</template>

<script setup>
const CAMPO = 'w-full h-12 rounded-lg bg-blanco/10 text-hueso placeholder:text-hueso/50 text-sm lg:text-base font-light outline-none focus:ring-1 focus:ring-amarillo p-4 transition-shadow'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEB_RE = /^\S+\.\S{2,}$/

const form = reactive({ nombre: '', web: '', correo: '', acepto: false })
const errores = reactive({ nombre: null, web: null, correo: null, acepto: null })
const estado = ref('idle')

const REGLAS = {
  nombre: () => form.nombre.trim() ? null : 'Ingresa tu nombre',
  web: () => WEB_RE.test(form.web.trim()) ? null : 'Ingresa el sitio de tu empresa',
  correo: () => EMAIL_RE.test(form.correo.trim()) ? null : 'Ingresa un correo válido',
  acepto: () => form.acepto ? null : 'Necesitamos tu consentimiento para enviarte el diagnóstico'
}

function validar(campo) {
  errores[campo] = REGLAS[campo]()
}

watch(() => form.acepto, () => validar('acepto'))

function enviar() {
  Object.keys(REGLAS).forEach(validar)
  if (Object.values(errores).some(Boolean)) return
  estado.value = 'loading'
  setTimeout(() => (estado.value = 'enviado'), 1200)
}
</script>

