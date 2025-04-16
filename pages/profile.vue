<script setup lang="ts">
import { useUserSession } from '#imports'
const { session, clearSession } = useUserSession()
const router = useRouter()

watchEffect(() => {
  if (session.value) {
    router.push('/')
  }
})

const wallet = ref('')
</script>

<template>
  <div class="container py-5">
    <div class="card shadow-sm p-4 max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Настройки профиля</h1>

      <div v-if="session" class="space-y-4">
        <div class="flex items-center space-x-4">
          <img :src="session.photo_url" alt="avatar" class="w-16 h-16 rounded-full" />
          <div>
            <div class="font-semibold">{{ session.id }}</div>
            <div class="text-sm text-gray-500">@{{ session.username }}</div>
            <div class="text-xs text-gray-400">ID: {{ session.id }}</div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Monero-кошелёк</label>
          <input v-model="wallet" type="text" placeholder="48...abc" class="input w-full" />
        </div>

        <button class="btn btn-primary" @click="saveSettings">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
function saveSettings() {
  // Здесь можно сохранить в Supabase или отправить на API
  alert('Сохранили Monero-кошелёк: ' + wallet.value)
}
</script>
