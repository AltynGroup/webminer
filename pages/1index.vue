<template>
  <div>
    <p class="lead text-muted">{{ $t('welcome') }}</p>

    <p>Страна: {{ country }}</p>
  </div>

  <partners/>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const country = ref('Loading...');

onMounted(async () => {
  const res = await fetch('/api/country');
  const data = await res.json();
  country.value = data.country;
});
</script>


