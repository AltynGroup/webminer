
<template>
  <iframe 
   class="color-filter"
    id="simpleswap-frame"
    name="SimpleSwap Widget"
    src="https://simpleswap.io/widget/99edb8e3-6845-4d9e-8dec-02cf0a74fd84" 
    width="520px" 
    height="392px" 
    frameborder="0">
  </iframe>
</template>


<style scoped>
.iframe-wrapper {
  width: 100%;
  max-width: 500px; /* Ширина виджета */
  height: 400px; /* Высота */
  border-radius: 20px; /* Закругляем углы */
  overflow: hidden; /* Обрезаем углы iframe */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Добавляем тень для красоты */
}

.iframe-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
