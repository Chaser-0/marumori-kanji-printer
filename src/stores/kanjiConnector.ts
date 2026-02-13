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
    const settings = useSettingsStore();

    switch (settings.kanjiApi) {
      case 'marumori': await fetchLearnedKanjisFromMarumori(); break;
    }

    selectRandomKanji();
  };

  const fetchLearnedKanjisFromMarumori = async () => {
    const settings = useSettingsStore();

    let host = '';
    if (!import.meta.env.DEV) {
      host = 'https://public-api.marumori.io';
    }

    const kanjiRes = await fetch(`${host}/api/known/kanji`, {headers: {Authorization: `Bearer ${settings.marumoriApiKey}`}});
    const learnedKanjisData: {
      success: boolean,
      items: {
        _id: string,
        item: string,
        level: number
      }[]
    } = await kanjiRes.json();

    learnedKanjis.value = learnedKanjisData.items.map(i => i.item);
  }

  const selectRandomKanji = () => {
    const index = Math.floor(Math.random() * learnedKanjis.value.length);
    selectedKanji.value = learnedKanjis.value[index]!;
  }

  return { learnedKanjis, selectedKanji, selectRandomKanji };
});
