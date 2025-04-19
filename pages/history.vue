<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">Журнал коммитов</h1>

    <div v-if="pending" class="text-gray-500">Загрузка...</div>
    <div v-else-if="error" class="text-red-500">Ошибка загрузки коммитов</div>

    <div v-else>
      <div v-for="commit in commits" :key="commit.sha" class="mb-6 border-b pb-4">
        <div class="flex items-center justify-between text-sm text-gray-400">
          <span>{{ formatDate(commit.commit.committer.date) }}</span>
          <a
            :href="commit.html_url"
            target="_blank"
            class="font-mono text-blue-500 hover:underline"
          >
            {{ commit.sha.slice(0, 7) }}
          </a>
        </div>
        <p class="mt-1 font-semibold">{{ commit.commit.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: commits, pending, error } = await useFetch(
  'https://api.github.com/repos/AltynGroup/webminer/commits'
)

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
