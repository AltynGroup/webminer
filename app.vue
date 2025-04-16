<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

</template>

<script setup>
const { locale, setLocale } = useI18n();

import { onMounted } from "vue";

onMounted(async () => {
  if (process.client) {
    await import("@tabler/core/dist/js/tabler.min.js");
    
  }
});



const { clearSession, session } = useUserSession();
const logout = () => clearSession();

const sendSessionToServer = async () => {
  if (!session.value) return;

  const { data, error } = await useFetch("/api/auth", {
    method: "POST",
    body: session.value,
  });

/*
  if (error.value) {
    //console.error("Ошибка API:", error.value);
  } else {
    //console.log("✅ Данные сохранены:", data.value);
  }
*/


};

watch(session, (newSession) => {
  if (newSession) {
    sendSessionToServer();
  }
});


</script>


<style>

@import '@tabler/core/dist/css/tabler.css';
@import '@tabler/core/dist/css/tabler-flags.css';
</style>