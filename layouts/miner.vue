<template>
  <body data-bs-theme="dark">
    <div class="page">
      <!-- Навигация -->
      <header class="navbar navbar-expand-md d-print-none">
        <div class="container-xl">
          <a href="/" class="navbar-brand">AltynWebMiner</a>

             <div v-if="session.loggedIn">

            <MenuProfile/>

          </div>

        </div>
      </header>

      <header class="navbar-expand-md">
      <MenuHead/>
      </header>
      
      <div class="page-wrapper">


<Breadminer/>
      
        
        <div class="page-body">



        <div class="container-xl">
            <div class="row row-cards">

             <WidgetCrypto />


              <div class="col-md-3">
                <div class="card">
                  <div class="card-body">

                  <div class="card-stamp">
                    <div class="card-stamp-icon bg-yellow">
                      <!-- Download SVG icon from http://tabler.io/icons/icon/bell -->
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-dashboard"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2.954a10 10 0 0 1 6.222 17.829a1 1 0 0 1 -.622 .217h-11.2a1 1 0 0 1 -.622 -.217a10 10 0 0 1 6.222 -17.829m4.207 5.839a1 1 0 0 0 -1.414 0l-2.276 2.274a2.003 2.003 0 0 0 -2.514 1.815l-.003 .118a2 2 0 1 0 3.933 -.517l2.274 -2.276a1 1 0 0 0 0 -1.414" /></svg>
                    </div>
                  </div>
                    <div class="subheader">{{ $t('hashpersec') }}</div>
                    <div class="h3 m-0">{{hashesPerSecond}} H/S</div>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="card">
                  <div class="card-body">
                    <div class="subheader">{{ $t('totalhashes') }}</div>
                    <div class="h3 m-0">{{ totalhashes }}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="card">
                  <div class="card-body">
                    <div class="subheader">Shares</div>
                    <div class="h3 m-0">{{acceptedhashes}}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="card">
                  <div class="card-body">
                    <div class="subheader">Bad</div>
                    <div class="h3 m-0">0</div>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">Hash per second</h3>
                    <Hashrate/>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
              <div class="row row-cards">
<div class="col-md-12">
                
                    <h3 class="card-title">For start</h3>

                    
<div class="alert alert-info" role="alert">
                      <div class="alert-icon">
                        <!-- Download SVG icon from http://tabler.io/icons/icon/info-circle -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon alert-icon icon-2">
                          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                          <path d="M12 9h.01"></path>
                          <path d="M11 12h1v4h1"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="alert-heading">{{ $t('Miner_stats') }}</h4>
                        <div class="alert-description">
                        {{ $t('Miner_stats_descr') }}
                        
                        <p>
                        <br/>
                        <a target ="_blank" href="https://c3pool.com/" rel="noopener noreferrer">
                        <span class="avatar avatar-lg" style="background-image: url(./static/logo/c3pool.jpeg)"></span>
                        </a>
                        </p>
                        </div>
                      </div>
                    </div>

                    
                </div>
                <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">Sponsor</h3>

                    <Monetag/>


                    </div>
                  </div>
                </div>
</div>
              </div>

            </div>
          </div>


          <slot/>

        </div>
      </div>

    <Footer/>

    </div>
  </body>
</template>

<script setup>
useHead({ title: "AltynMiner" });

//телеграмавторизация
const { clearSession, session } = useUserSession();


import { useAltyn } from '@/composables/useAltyn';
const { wallet, totalhashes, hashesPerSecond , acceptedhashes } = useAltyn(); // Подключаем композабле


import Breadminer from "~/components/Breadminer.vue";
import WidgetCrypto from "~/components/widgets/WidgetCrypto.vue";
import Hashrate from "~/components/Hashrate.vue";
import Shares from "~/components/Shares.vue";
import Monetag from "~/components/Monetag.vue";


</script>
