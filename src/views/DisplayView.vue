<template>
  <main class="relative| flex flex-col | w-screen min-h-screen">
    <PrintConfigSection class="md:absolute top-2 right-2" />

    <div class="portrait:hidden flex flex-col gap-8 m-auto justify-center items-center | w-full h-full">
      <div class="flex gap-8 justify-center items-center">
        <span class="text-9xl">{{ selectedKanji }}</span>
        <div class="flex flex-col justify-between text-5xl">
          <span>{{ kanjiData.meanings.join(', ') }}</span>
          <span>{{ kanjiData.kunyomi.join(', ') }}</span>
          <span>{{ kanjiData.onyomi.join(', ') }}</span>
        </div>
      </div>

      <div v-if="hasPen" class="flex flex-row gap-4 text-9xl">
        <KanjiBox :kanji="selectedKanji"></KanjiBox>
        <KanjiBox v-for="i in settings.drawingRepeat" :allow-ink-mode="true"></KanjiBox>
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

        <div v-if="hasPen" class="flex flex-col gap-4 text-[min(calc(100vw-4rem),20rem)]">
          <KanjiBox :kanji="selectedKanji"></KanjiBox>
          <KanjiBox v-for="i in settings.drawingRepeat" :allow-ink-mode="true"></KanjiBox>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import KanjiBox from '@/components/KanjiBox.vue';
import PrintConfigSection from '@/components/PrintConfigSection.vue';
import { useSettingsStore } from '@/stores/settings';
import type { Word } from 'kanji.js';
import { onMounted, onUnmounted, ref } from 'vue';

defineProps<{
  selectedKanji: string;
  kanjiData: Word;
}>();

const settings = useSettingsStore();
const hasPen = ref(false);

const handlePointerMove = (e: PointerEvent) => {
  if (e.pointerType === 'pen') {
    hasPen.value = true;
    window.removeEventListener('pointermove', handlePointerMove);
  }
};

onMounted(() => {
  window.addEventListener('pointermove', handlePointerMove);
});

onUnmounted(() => {
  window.removeEventListener('pointermove', handlePointerMove);
});
</script>
