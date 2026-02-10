<template>
  <main class="relative| flex | w-screen h-screen">
    <PrintConfigSection class="absolute top-2 right-2" />

    <div class="portrait:hidden flex flex-col gap-4 m-auto justify-center items-center | w-full h-full">
      <div class="flex gap-8 justify-center items-center">
        <span class="text-9xl">{{ selectedKanji }}</span>
        <div class="flex flex-col justify-between text-5xl">
          <span>{{ kanjiData.meanings.join(', ') }}</span>
          <span>{{ kanjiData.kunyomi.join(', ') }}</span>
          <span>{{ kanjiData.onyomi.join(', ') }}</span>
        </div>
      </div>
    </div>

    <div class="hidden portrait:block container mx-auto p-4">
      <div class="flex flex-col gap-4 justify-center items-center text-center | h-full w-full">
        <span class="text-9xl mx-auto">{{ selectedKanji }}</span>
        <div class="flex flex-col">
          <span>{{ kanjiData.meanings.join(', ') }}</span>
          <span>{{ kanjiData.kunyomi.join(', ') }}</span>
          <span>{{ kanjiData.onyomi.join(', ') }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import PrintConfigSection from '@/components/PrintConfigSection.vue';
import type { Word } from 'kanji.js';

defineProps<{
  selectedKanji: string;
  kanjiData: Word;
}>();
</script>
