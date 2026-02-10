import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const drawingRepeat = ref(3);

  return { drawingRepeat }
})
