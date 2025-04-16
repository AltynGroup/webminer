<script setup>
import { ref, onMounted } from "vue";

const powerUsed = ref(0); // Потраченная энергия (Вт⋅ч)
const startTime = Date.now(); // Время старта
const CPU_MAX_WATT = 65; // Максимальная мощность CPU (из спецификаций)
const CPU_LOAD = 80; // Примерная загрузка (можно менять)

onMounted(() => {
  setInterval(() => {
    const elapsedTime = (Date.now() - startTime) / 3600000; // Время в часах
    powerUsed.value = (CPU_LOAD / 100) * CPU_MAX_WATT * elapsedTime;
  }, 1000);
});
</script>

<template>
  <div>
    <p>Потребленная энергия: {{ powerUsed.toFixed(2) }} Вт⋅ч</p>
  </div>
</template>
