<template>
<div class="page-header d-print-none">
          <div class="container">
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <span class="status-indicator status-green status-indicator-animated">
                  <span class="status-indicator-circle"></span>
                  <span class="status-indicator-circle"></span>
                  <span class="status-indicator-circle"></span>
                </span>
              </div>
              <div class="col">
                <h2 class="page-title">AltynMiner</h2>
                <p class="fs-6">Wallet:{{shortWallet}}</p>
                
                <div class="text-secondary">
                  <ul class="list-inline list-inline-dots mb-0">
                    <li class="list-inline-item"><span class="text-green">Up</span></li>
                    <li class="list-inline-item">Checked every 5 seconds</li>
                  </ul>
                </div>
              </div>
              <div class="col-md-auto ms-auto d-print-none">
                <div class="btn-list">


<div v-if="session.loggedIn">
        
</div>

<div v-else>
        <TelegramLoginWidget telegram-login="tokenrebate_bot"/>
      </div>


                  <a href="#" class="btn btn-2" data-bs-toggle="modal" data-bs-target="#modal-setup">
                    <!-- Download SVG icon from http://tabler.io/icons/icon/settings -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-2">
                      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    </svg>
                    {{ $t('getstart') }}
                  </a>

    <ModalSet/>

                </div>
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

import { useAltyn } from '@/composables/useAltyn';

const { wallet, id } = useAltyn(); // Подключаем композабле

const { clearSession, session } = useUserSession();
const logout = () => clearSession();

const sendSessionToServer = async () => {
  if (!session.value) return;

  const { data, error } = await useFetch("/api/auth", {
    method: "POST",
    body: session.value,
  });

  if (error.value) {
    //console.error("Ошибка API:", error.value);
  } else {
    //console.log("✅ Данные сохранены:", data.value);
  }
};

watch(session, (newSession) => {
  if (newSession) {
    sendSessionToServer();
  }
});


import { ref, onMounted } from 'vue'

//const wallet = ref("");

// Загружаем кошелек из localStorage
const loadWallet = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    wallet.value = localStorage.getItem("wallet") || "4BCMDQB1dZV9KN9ZYo4RH3cHTAL9jUocL474pnSDaRJoeUndmWqc8KefKUoFRnczupixisqBy1uiqQES2oSgF9594vrt3St";
  }
};

onMounted(loadWallet);

import Modalset from "~/components/modal/ModalSet.vue";
</script>