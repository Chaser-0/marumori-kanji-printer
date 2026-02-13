<template>
  <template v-if="selectedKanji && kanjiData">
    <div class="not-print:hidden">
      <PrinterView :selected-kanji="selectedKanji" :kanji-data="kanjiData" />
    </div>
    <DisplayView :selected-kanji="selectedKanji" :kanji-data="kanjiData" class="print:hidden" />
  </template>

  <span v-else>Loading…</span>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import kanji from 'kanji.js';
import PrinterView from '@/views/PrinterView.vue';
import DisplayView from '@/views/DisplayView.vue';

const selectedKanji = ref<string|null>(null);
watch(selectedKanji, v => setKanjiFavicon(v || ''));

const kanjiData = computed(() => {
  if (!selectedKanji.value) {
    return;
  }

  return kanji.getDetails(selectedKanji.value);
});
watch(kanjiData, v => window.document.title = v?.meanings.join(', ') || '');

onMounted(async () => {
  const kanjiRes = await fetch('/api/known/kanji', {headers: {Authorization: `Bearer ${import.meta.env.VITE_MARUMORI_API_KEY}`}});
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

const setKanjiFavicon = (kanji: string) => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const color = isDark ? '#ffffff' : '#000000';

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  ctx.font = 'bold 54px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(kanji, canvas.width / 2, canvas.height / 2 + 4);

  let link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL();

  if (!link.parentNode) {
    document.head.appendChild(link);
  }
};
</script>
