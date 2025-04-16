<script setup>
defineProps({ error: Object });
const handleError = () => clearError({ redirect: '/' });


useHead({
  bodyAttrs: { 'data-bs-theme': 'dark' } // Устанавливаем dark-тему только для ошибки
});


</script>
<template>
  <div class="page page-center" data-bs-theme="dark">
    <div class="container container-tight py-4">
      <div class="empty">
        <div class="empty-header">{{ error.statusCode || 'Ошибка' }}</div>
        <p class="empty-title">{{ error.message || 'Что-то пошло не так...' }}</p>
        <p class="empty-subtitle text-muted">
          Попробуйте перезагрузить страницу или вернуться на главную.
        </p>
        <div class="empty-action">
          <a href="/" class="btn btn-primary">На главную</a>
        </div>
      </div>
    </div>
  </div>
</template>
