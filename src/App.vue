<template>
  <div class="w-full h-screen bg-backgound flex justify-center items-center relative text-text">
    <RouterView class="" />

    <div class="absolute opacity-40 z-10">
      <div
        class="w-[32rem] h-[32rem] rotate-45 -top-56 left-60 rounded-xl bg-gradient-to-br from-diamond2 to-70% absolute"
      ></div>
      <div
        class="w-[32rem] h-[32rem] rotate-45 -top-36 left-60 rounded-xl bg-gradient-to-br from-diamond2 to-70% absolute"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
