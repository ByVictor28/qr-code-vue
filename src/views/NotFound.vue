<template>
  <div class="w-full h-full flex justify-center items-center flex-col">
    <div class="w-10/12 lg:w-1/3 relative">
      <div class="flex justify-center items-center flex-col">
        <p class="text-7xl mb-4">Pagina no encontrada</p>
        <button class="my-button" @click="$router.push({ name: 'home' })">Ir al inicio</button>
      </div>
    </div>
  </div>
</template>
<script setup></script>
