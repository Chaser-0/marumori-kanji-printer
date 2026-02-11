<template>
  <div class="relative | inline-flex justify-center items-center | border-2 print:border-black border-amber-700 w-[1em] h-[1em] min-w-[1em] min-h-[1em] max-w-[1em] max-h-[1em] aspect-square | overflow-hidden">
    <span v-if="kanji" class="relative z-10 font-[kso]">{{ kanji }}</span>
    <div class="crossedBorder print:before:border-gray-500! print:after:border-gray-500! before:border-amber-900! after:border-amber-900! | absolute top-0 left-0 w-full h-full"></div>
    <canvas v-if="allowInkMode" ref="inkCanvas" class="absolute top-0 left-0 w-full h-full | touch-none"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  kanji?: string;
  allowInkMode?: boolean
}>();

const inkCanvas = ref<HTMLCanvasElement>();

onMounted(async () => {
  if (props.allowInkMode && inkCanvas.value) {
    const ctx = inkCanvas.value.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    inkCanvas.value.addEventListener('contextmenu', (e) => e.preventDefault());

    let presenter = null;
    if (window.navigator.ink) {
      try {
        presenter = await window.navigator.ink.requestPresenter({ presentationArea: inkCanvas.value });
      } catch (e) {}
    }

    inkCanvas.value.width = inkCanvas.value.offsetWidth;
    inkCanvas.value.height = inkCanvas.value.offsetHeight;

    let lastPressure = 0.5;
    let currentColor = '#000000'; 

    inkCanvas.value.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'pen') return;

      const computedStyle = getComputedStyle(inkCanvas.value!);
      currentColor = computedStyle.color;
      ctx.strokeStyle = currentColor;
      
      lastPressure = e.pressure > 0 ? e.pressure : 0.5;
      
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    });

    inkCanvas.value.addEventListener('pointermove', (e) => {
      const isPen = e.buttons === 1;
      const isEraser = e.buttons === 2 || e.buttons === 32;

      if (e.pointerType !== 'pen' || (!isPen && !isEraser)) return;

      ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';

      const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      const targetPressure = (e.pressure === 0) ? lastPressure : e.pressure;

      lastPressure = lastPressure * 0.7 + targetPressure * 0.3;
      
      const baseSize = isEraser ? 30 : 12;
      const thickness = Math.max(1, lastPressure * baseSize);
      
      ctx.lineWidth = thickness;
      if (!isEraser) {
          ctx.strokeStyle = currentColor;
      }

      events.forEach((event) => {
        ctx.lineTo(event.offsetX, event.offsetY);
      });
      
      ctx.stroke();

      ctx.beginPath();
      const lastEvent = events[events.length - 1]!;
      ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);

      if (presenter && isPen) {
        presenter.updateInkTrailStartPoint(e, { 
          color: currentColor,
          diameter: thickness 
        });
      }
    });

    inkCanvas.value.addEventListener('pointerup', () => {
      ctx.beginPath();
      ctx.globalCompositeOperation = 'source-over';
    });
  }
});
</script>

<style scoped>
.crossedBorder:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-right: 2px gray solid;
  height: 100%;
  width: 100%;
  transform: translateX(-50%);
}
.crossedBorder:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 2px gray solid;
  height: 100%;
  width: 100%;
  transform: translateY(-50%);
}
</style>