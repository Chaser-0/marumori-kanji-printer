<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="inline-flex gap-2 | px-4 py-2 rounded-xl | border border-amber-700 | bg-linear-150 from-amber-900 to-violet-900 text-cyan-500 | hover:from-amber-800 hover:to-violet-800">
      <span>Repeat drawings</span>
      <input
        type="number"
        v-model="settings.drawingRepeat"
        class="w-8 text-cyan-300"
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