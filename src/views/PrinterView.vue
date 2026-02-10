<template>
  <div class="portrait:hidden flex flex-col gap-2 justify-between | h-screen py-[6mm] px-2 | bg-white text-black">
    <div class="flex gap-2">
      <span class="text-6xl">{{ selectedKanji }}</span>
      <div class="flex flex-col justify-between">
        <span class="text-sm text-nowrap text-ellipsis overflow-hidden">{{ kanjiData.meanings.join(', ') }}</span>
        <span class="text-nowrap text-ellipsis overflow-hidden">{{ kanjiData.kunyomi.join(', ') }}</span>
        <span class="text-nowrap text-ellipsis overflow-hidden">{{ kanjiData.onyomi.join(', ') }}</span>
      </div>
    </div>

    <div class="flex gap-4 text-8xl">
      <KanjiBox :kanji="selectedKanji"></KanjiBox>
      <KanjiBox v-for="i in settings.drawingRepeat"></KanjiBox>
    </div>
  </div>

  <div class="hidden portrait:flex flex-col gap-4 justify-between | w-screen px-[6mm] py-2 | bg-white text-black">
    <span class="text-9xl mx-auto">{{ selectedKanji }}</span>
    <div class="flex flex-col">
      <span>{{ kanjiData.meanings.join(', ') }}</span>
      <span>{{ kanjiData.kunyomi.join(', ') }}</span>
      <span>{{ kanjiData.onyomi.join(', ') }}</span>
    </div>

    <div class="flex flex-col gap-4 mx-auto text-[calc(100vw-12mm)]">
      <KanjiBox :kanji="selectedKanji"></KanjiBox>
      <KanjiBox v-for="i in settings.drawingRepeat"></KanjiBox>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Word } from 'kanji.js';
import KanjiBox from '@/components/KanjiBox.vue';
import { useSettingsStore } from '@/stores/settings';

defineProps<{
  selectedKanji: string;
  kanjiData: Word;
}>();

const settings = useSettingsStore();
</script>
