<template>
  <div v-if="selectedKanji && kanjiData" class="flex flex-col gap-2 justify-between | h-screen not-print:h-[58mm] p-4 overflow-hidden | bg-white text-black">
    <div class="flex gap-2">
      <span class="text-7xl">{{ selectedKanji }}</span>
      <div class="flex flex-col justify-between">
        <span class="text-xl">{{ kanjiData.meanings.join(', ') }}</span>
        <span class="text-nowrap text-ellipsis overflow-hidden">{{ kanjiData.kunyomi.join(', ') }}</span>
        <span class="text-nowrap text-ellipsis overflow-hidden">{{ kanjiData.onyomi.join(', ') }}</span>
      </div>
    </div>

    <div class="flex gap-4">
      <KanjiBox :kanji="selectedKanji"></KanjiBox>

      <KanjiBox v-for="i in 3"></KanjiBox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import kanji from 'kanji.js';
import KanjiBox from './components/KanjiBox.vue';

const selectedKanji = ref<string|null>(null);
const kanjiData = computed(() => {
  if (!selectedKanji.value) {
    return;
  }

  return kanji.getDetails(selectedKanji.value);
});

onMounted(async () => {
  const kanjiRes = await fetch('https://public-api.marumori.io/known/kanji', {headers: {Authorization: `Bearer ${import.meta.env.VITE_MARUMORI_API_KEY}`}});
  const learnedKanjis: {
    success: boolean,
    items: {
      _id: string,
      item: string,
      level: number
    }[]
  } = await kanjiRes.json();

  const index = Math.floor(Math.random() * learnedKanjis.items.length);
  selectedKanji.value = learnedKanjis.items[index]!.item;
});
</script>
