import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  const drawingRepeat = ref(3);
  const kanjiApi = ref<'marumori'>('marumori');
  const marumoriApiKey = ref<string>(import.meta.env.VITE_MARUMORI_API_KEY || '');

  return { drawingRepeat, kanjiApi, marumoriApiKey };
});
