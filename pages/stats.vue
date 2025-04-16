<script setup>
import { ref, onMounted } from "vue";

const totalHashrate = ref(0);
const totalShares = ref(0);

async function fetchStats() {
  const res = await fetch("/api/stats");
  const data = await res.json();
  totalHashrate.value = data.totalHashrate;
  totalShares.value = data.totalShares;
}

async function sendTestData() {
  await fetch("/api/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hashrate: 50, shares: 1 }), // Тестовые данные
  });
  fetchStats(); // Обновить данные после отправки
}

onMounted(fetchStats);
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold">Тестовая страница</h1>
    <p>🌐 Общий хешрейт: {{ totalHashrate }}</p>
    <p>💎 Найденные шары: {{ totalShares }}</p>
    <button @click="sendTestData" class="mt-4 p-2 bg-blue-500 text-white rounded">
      Отправить тестовые данные
    </button>
  </div>
</template>
