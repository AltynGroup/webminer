<script setup>
defineProps({
  botUsername: {
    type: String,
    default: 'tokenrebate_bot' // 🔥 Замени на логин своего бота!
  }
})
</script>

<template>
  <div>
    <client-only>
      <div
        v-html="`<script async src='https://telegram.org/js/telegram-widget.js?21' 
        data-telegram-login='${botUsername}' 
        data-size='large' 
        data-auth-url='javascript:void(0);' 
        data-request-access='write'></script>`"
      ></div>
    </client-only>
  </div>
</template>
