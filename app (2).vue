<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>

@import '@tabler/core/dist/css/tabler.css';
@import '@tabler/core/dist/css/tabler-flags.css';
</style>


<script setup>

const { locale, setLocale } = useI18n();

import { onMounted } from "vue";

onMounted(async () => {
  if (process.client) {
    await import("@tabler/core/dist/js/tabler.min.js");
  }
});

</script>

