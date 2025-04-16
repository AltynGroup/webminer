
<template>

<div class="modal modal-blur fade" id="modal-setup" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-1 modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add your XMR wallet</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3 align-items-end">
              <div class="col-auto">
                <span class="bg-green text-white avatar">
                  <!-- Download SVG icon from http://tabler.io/icons/icon/plus -->
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
                              fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-coin-monero">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 11.414v4.586a1 1 0 0 0 1 1l4.66 .001a10 10 0 0 1 -17.32 0l4.66 -.001l.117 -.007a1 1 0 0 0 .883 -.993v-4.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -.083l2.293 -2.293zm2 -8.074a10 10 0 0 1 4.54 11.66h-4.54v-6c0 -.89 -1.077 -1.337 -1.707 -.707l-3.293 3.292l-3.293 -3.292l-.084 -.076c-.637 -.514 -1.623 -.07 -1.623 .783v6h-4.54a9.991 9.991 0 0 1 -.46 -3l.005 -.324a10 10 0 0 1 14.995 -8.336z" /></svg>
                  </span>
                
              </div>
              <div class="col">
              <!-- Уведомление -->
    <div v-if="showAlert" class="alert alert-warning mt-3">
    <div class="alert-icon">
                        <!-- Download SVG icon from http://tabler.io/icons/icon/check -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon alert-icon icon-2">
                          <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                      </div>
      {{ message }}
      <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
    </div>

                <label class="form-label">Monero Wallet</label>


<input v-model="wallet" class="form-control" placeholder="Введите XMR-кошелек" />

              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Pool: <b>C3pool.com</b> </label>
                   
                    {{ $t('Miner_start_descr') }}

            </div>
            
          </div>
          <div class="modal-footer">

            
            <button @click="saveToLocalStorage" class="btn btn-primary">{{ $t('save') }}</button>
          </div>
        </div>
      </div>
    </div>
</template>



<script setup>


const shortWallet = computed(() => {
  if (!wallet.value || wallet.value.length < 10) return wallet.value;
  return `${wallet.value.slice(0, 5)}...${wallet.value.slice(-5)}`;
});



import { ref, onMounted } from 'vue'

const wallet = ref(""); // Переменная для хранения кошелька
const message = ref(""); // Сообщение для предупреждения
const showAlert = ref(false); // Флаг показа предупреждения
const DEFAULT_WALLET = "4BCMDQB1dZV9KN9ZYo4RH3cHTAL9jUocL474pnSDaRJoeUndmWqc8KefKUoFRnczupixisqBy1uiqQES2oSgF9594vrt3St";


// Функция для отображения предупреждения
const showWarning = (msg) => {
  message.value = msg;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 5000); // Скрываем через 3 секунды
};

// Функция для сохранения в localStorage
const saveToLocalStorage = () => {
  if (process.client) {
    localStorage.setItem("wallet", wallet.value);
    showWarning(`Сохранено`);
  }
};

// Функция для загрузки из localStorage
const loadFromLocalStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedWallet = localStorage.getItem("wallet");

    if (storedWallet) {
      wallet.value = storedWallet;
      showWarning(`Загружено: ${shortWallet.value}`);
    } else {
      wallet.value = DEFAULT_WALLET; // Используем значение по умолчанию
      localStorage.setItem("wallet", DEFAULT_WALLET); // Сохраняем в localStorage
      showWarning(`Установлено значение по умолчанию: ${DEFAULT_WALLET}`);
    }
  }

};


// При загрузке страницы сразу подгружаем данные
onMounted(loadFromLocalStorage);
</script>