<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full py-7 px-10">
      <img
        src="../assets/logo-qr-generator.svg"
        @click="$router.push({ name: 'home' })"
        class="cursor-pointer"
        alt="pattern"
      />
    </div>

    <div class="w-full flex-grow relative z-20 flex items-center justify-center flex-col">
      <div
        class="max-w-96 max-h-96 flex justify-center relative z-20 items-center p-10 rounded-full bg-secondary"
      >
        <div id="placeHolder" class="w-full h-full rounded-3xl overflow-hidden"></div>
      </div>
      <div class="mt-8 w-full md:w-1/2 flex justify-center flex-wrap gap-x-10 gap-y-8">
        <a class="my-button py-5 px-10 flex gap-8" :href="qrImageUrl" :download="$route.params.url">
          Download
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </a>
        <button
          class="my-button py-5 px-10 flex gap-8 transition-all"
          :class="!isCopied ? '' : 'bg-green-600'"
          @click="copyToClipboard"
        >
          {{ !isCopied ? 'Share' : 'Copied' }}
          <svg
            v-if="!isCopied"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            v-else
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import qrcode from 'qrcode-generator'
import { useRoute } from 'vue-router'

const qrImageUrl = ref()
const isCopied = ref(false)
const route = useRoute()

function extractSrcImage(imageTag) {
  let re = /data(.*?)"/g
  let str = imageTag
  const imageURL = str.match(re)[0].slice(0, -1)
  return imageURL
}

function buildQRCode() {
  var typeNumber = 4
  var errorCorrectionLevel = 'L'
  var qr = qrcode(typeNumber, errorCorrectionLevel)
  qr.addData(route.params.url)
  qr.make()
  const imgTag = qr.createImgTag(10)
  qrImageUrl.value = extractSrcImage(imgTag)
  document.getElementById('placeHolder').innerHTML = imgTag
}

function changeGifToPng(image) {
  let re = /data:image\/gif/g
  return image.replace(re, 'data:image/png')
}
async function copyToClipboard() {
  const canWriteToClipboard = await askWritePermission()
  if (!canWriteToClipboard) return

  const response = await fetch(changeGifToPng(qrImageUrl.value))
  const blob = await response.blob()
  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob
    })
  ])
  changeIsCopied()
}

function changeIsCopied() {
  isCopied.value = true

  setTimeout(() => {
    isCopied.value = false
  }, 1500)
}
async function askWritePermission() {
  try {
    const { state } = await navigator.permissions.query({ name: 'clipboard-write' })

    return state === 'granted'
  } catch (error) {
    return false
  }
}
onMounted(() => {
  buildQRCode()
})
</script>
