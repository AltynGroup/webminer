<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

// Разбиваем путь на части
const paths = route.path.split('/').filter(p => p);

const breadcrumbs = paths.map((segment, index) => {
  const fullPath = '/' + paths.slice(0, index + 1).join('/');
  return {
    title: segment, // Можно заменить на нормальные названия
    path: fullPath
  };
});
</script>

<template>
  <nav>
    <ul class="flex space-x-2 text-gray-600">
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
        <NuxtLink :to="crumb.path" class="text-blue-500 hover:underline">
          {{ crumb.title }}
        </NuxtLink>
        <span v-if="index < breadcrumbs.length - 1"> / </span>
      </li>
    </ul>
  </nav>
</template>
