<template>


</template>


<script setup>
definePageMeta({
  layout: 'miner' // название вашего layout-файла
});



//проверяем ссылку на параметры.
//import { useRoute } from 'vue-router';
import { useRoute, navigateTo } from '#app';

const route = useRoute();

// Параметры маршрута (например, /user/:id)
const params = route.params;
// Query-параметры (например, /user?id=123)
const query = route.query;

// Проверяем, есть ли параметры в URL
const hasParams = Object.keys(route.params).length > 0;

// Если параметров нет, перенаправляем пользователя

/*

if (!hasParams) {
  navigateTo('/'); // Перенаправляем на главную страницу (или другую страницу)
}

*/

import MinerClient from "@/components/MinerClient.vue";


</script>