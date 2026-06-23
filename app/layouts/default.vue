<template>
  <div class="min-h-screen flex flex-col bg-black text-blanco">
    <Header />
    <main class="flex flex-col gap-6 md:gap-8 lg:gap-12 xxl:gap-16 grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>
