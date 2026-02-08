<template>
  <div class="relative | inline-flex justify-center items-center | border-2 border-black min-w-24 min-h-24">
    <span v-if="kanji" class="relative z-10 text-8xl font-[kso]">{{ kanji }}</span>
    <div class="crossedBorder | absolute top-0 left-0 w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  kanji?: string
}>();
</script>

<style scoped>
.crossedBorder:after {
  content: '';
  position: absolute;
  border-right: 2px gray solid;
  height: 100%;
  width: 100%;
  transform: translateX(-50%);
}
.crossedBorder:before {
  content: '';
  position: absolute;
  border-bottom: 2px gray solid;
  height: 100%;
  width: 100%;
  transform: translateY(-50%);
}
</style>