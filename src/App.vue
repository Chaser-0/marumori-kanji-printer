<template>
  <template v-if="kanjiConnector.selectedKanji && kanjiData">
    <div class="not-print:hidden">
      <PrinterView :selected-kanji="kanjiConnector.selectedKanji" :kanji-data="kanjiData" />
    </div>
    <DisplayView :selected-kanji="kanjiConnector.selectedKanji" :kanji-data="kanjiData" class="print:hidden" />
  </template>

  <span v-else>Loading…</span>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import kanji from 'kanji.js';
import PrinterView from '@/views/PrinterView.vue';
import DisplayView from '@/views/DisplayView.vue';
import { useKanjiConnectorStore } from './stores/kanjiConnector';

const kanjiConnector = useKanjiConnectorStore();

watch(() => kanjiConnector.selectedKanji, v => setKanjiFavicon(v || ''));

const kanjiData = computed(() => {
  if (!kanjiConnector.selectedKanji) {
    return;
  }

  return kanji.getDetails(kanjiConnector.selectedKanji);
});
watch(kanjiData, v => window.document.title = v?.meanings.join(', ') || '');

onMounted(async () => {
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
