<template>
  <div class="flex justify-center items-center flex-col w-full">
    <h1 class="mb-8"><img src="../assets/logo-qr-generator.svg" alt="pattern" /></h1>

    <div class="w-10/12 lg:w-1/3 relative">
      <div
        class="border border-primary w-full bg-black rounded-xl py-1 pr-1 pl-5 flex relative z-40"
      >
        <input
          type="text"
          class="w-full bg-transparent text-text text-opacity-55"
          placeholder="Enter url"
          v-model="url"
        />
        <button
          class="my-button flex-shrink-0"
          @click="$router.push({ name: 'result', params: { url: url } })"
        >
          QR code
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const url = ref('facebook.com')
</script>
