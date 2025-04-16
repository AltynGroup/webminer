<template>
  <div>
 <a @click="setLocale('en')" class="btn btn-sm"><span class="flag flag-xs flag-country-us"></span></a>
 <a @click="setLocale('ru')" class="btn btn-sm"><span class="flag flag-xs flag-country-ru"></span></a>
  </div>
</template>

<script setup>
const { setLocale } = useI18n();
</script>