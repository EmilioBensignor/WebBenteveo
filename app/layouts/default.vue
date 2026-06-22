<template>
  <div class="min-h-screen flex flex-col bg-black text-blanco">
    <Header />
    <main class="flex flex-col gap-6 md:gap-8 grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>
