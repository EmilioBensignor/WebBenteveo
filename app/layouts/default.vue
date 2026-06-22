<template>
  <div class="min-h-screen flex flex-col bg-negro text-blanco">
    <Header />
    <main class="flex flex-col gap-6 grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>
