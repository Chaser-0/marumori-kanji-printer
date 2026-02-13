<template>
  <div class="flex flex-col md:flex-row gap-2 md:gap-4">
    <div class="inline-flex gap-2 | px-4 py-2 rounded-xl | border border-amber-700 | bg-linear-150 from-amber-900 to-violet-900 text-cyan-500 | hover:from-amber-800 hover:to-violet-800 | not-print:contrast-more:from-white not-print:contrast-more:to-white not-print:contrast-more:text-black not-print:contrast-more:border-black not-print:contrast-more:hover:from-white not-print:contrast-more:hover:to-white not-print:contrast-more:hover:text-black">
      <span>Repeat drawings</span>
      <input
        type="number"
        v-model="settings.drawingRepeat"
        class="w-8 text-cyan-300 not-print:contrast-more:text-black not-print:contrast-more:font-bold"
        >
      <span>times</span>
    </div>
    <PrimaryButton @click="print">Print</PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useSettingsStore } from '@/stores/settings';

const settings = useSettingsStore();
const print = () => window.print();
</script>