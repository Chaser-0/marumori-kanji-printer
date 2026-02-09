<template>
  <PrinterView v-if="selectedKanji && kanjiData" :selected-kanji="selectedKanji" :kanji-data="kanjiData" class="" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import kanji from 'kanji.js';
import PrinterView from './views/PrinterView.vue';

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
