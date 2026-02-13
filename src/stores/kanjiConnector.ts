import { ref, onMounted, watch } from 'vue';
import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';

export const useKanjiConnectorStore = defineStore('kanjiConnector', () => {
  const learnedKanjis = ref<string[]>([]);
  const selectedKanji = ref('');

  onMounted(() => {
    fetchLearnedKanjis();

    const settings = useSettingsStore();
    watch(() => settings.kanjiApi, () => fetchLearnedKanjis()); 
  });

  const fetchLearnedKanjis = async () => {
    const kanjiRes = await fetch('/api/known/kanji', {headers: {Authorization: `Bearer ${import.meta.env.VITE_MARUMORI_API_KEY}`}});
    const learnedKanjisData: {
      success: boolean,
      items: {
        _id: string,
        item: string,
        level: number
      }[]
    } = await kanjiRes.json();

    learnedKanjis.value = learnedKanjisData.items.map(i => i.item);

    selectRandomKanji();
  };

  const selectRandomKanji = () => {
    const index = Math.floor(Math.random() * learnedKanjis.value.length);
    selectedKanji.value = learnedKanjis.value[index]!;
  }

  return { learnedKanjis, selectedKanji, selectRandomKanji };
});
