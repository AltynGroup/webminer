<template>
  <div class="container-xl">
    <div class="card">
      <div class="row g-0">
        <div class="col-12 col-md-3 border-end">
          <div class="card-body">
            <h4 class="subheader">Business settings</h4>
            <div class="list-group list-group-transparent">
              <a href="./settings.html" class="list-group-item list-group-item-action d-flex align-items-center active">
                My Account
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-9 d-flex flex-column">
          <div class="card-body">
            <h2 class="mb-4">My Account</h2>

            <!-- Сообщение об успешном сохранении -->
            <div v-if="savedMessage" class="alert alert-success" role="alert">
             <div class="alert-icon">
                        <!-- Download SVG icon from http://tabler.io/icons/icon/check -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon alert-icon icon-2">
                          <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                      </div>
              {{ savedMessage }}
              
            </div>

            <h3 class="card-title">Profile Details</h3>

            <div class="row align-items-center">
              <div class="col-auto">
                <span class="avatar avatar-xl"
                  :style="{ backgroundImage: `url('https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${session.id}')` }">
                </span>
              </div>
            </div>

            <h3 class="card-title mt-4">XMR Wallet</h3>
            <div class="row g-9">
              <div class="col-md">
                <input
                  v-model="wallet"
                  id="wallet"
                  type="text"
                  class="form-control"
                  placeholder="Введите ваш кошелек"
                />
              </div>
            </div>

            <h3 class="card-title mt-4">Type of mining</h3>
            <p class="card-subtitle">
              Coming soon for option
            </p>
            <div>
              <label class="form-check form-switch form-switch-lg">
                <input class="form-check-input" type="checkbox">
                <span class="form-check-label form-check-label-on">Pool</span>
                <span class="form-check-label form-check-label-off">Solo</span>
              </label>
            </div>
          </div>
          <div class="card-footer bg-transparent mt-auto">
            <div class="btn-list justify-content-end">
              <button @click="saveSettings" class="btn btn-primary btn-2">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '@/composables/useSupabase'
const { session } = useUserSession()

const sessionData = computed(() => session.value)
const wallet = ref('')
const settingsData = ref({})
const savedMessage = ref('')
const saving = ref(false)

const supabase = useSupabase()

const fetchSettings = async () => {
  if (session.value) {
    const userId = session.value.id
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', userId)

    if (error) {
      console.error('Ошибка при загрузке настроек:', error.message)
    } else {
      settingsData.value = data ? data[0] : {}
      wallet.value = settingsData.value.wallet || ''
    }
  }
}

const saveSettings = async () => {
  saving.value = true
  if (session.value) {
    const userId = session.value.id
    const { error } = await supabase
      .from('settings')
      .upsert({
        id: userId,
        wallet: wallet.value,
      })

    if (error) {
      console.error('Ошибка при сохранении настроек:', error.message)
    } else {
      savedMessage.value = 'Настройки успешно сохранены!'
      setTimeout(() => (savedMessage.value = ''), 3000)
    }
  }
  saving.value = false
}

onMounted(fetchSettings)

definePageMeta({
  layout: "profile"
});
</script>
