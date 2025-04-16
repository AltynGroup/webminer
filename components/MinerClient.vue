<template>
  <div>
    <p v-if="isMining">Майнинг запущен!</p>
    <p>Хэшрейт: {{ totalhashes }}</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const totalhashes = ref(0)
const balance = ref(0)


onMounted(() => {
  if (window.PerfektStart) {
    //window.PerfektStart("4BCMDQB1dZV9KN9ZYo4RH3cHTAL9jUocL474pnSDaRJoeUndmWqc8KefKUoFRnczupixisqBy1uiqQES2oSgF9594vrt3St", "OG",2)
  } 

  // Подключаемся к переменным майнера
  setInterval(() => {
    if (window.totalhashes) totalhashes.value = window.totalhashes
    if (window.balance) balance.value = window.balance
  }, 1000) // Обновляем каждую секунду
})


</script>
