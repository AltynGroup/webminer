<template>
<div class="collapse navbar-collapse" id="navbar-menu">
			<div class="navbar">
				<div class="container-xl">
					<div class="row flex-fill align-items-center">
						<div class="col">
<ul class="navbar-nav">
		<li class="nav-item active">
		
			<a class="nav-link" href="./">
			<span class="nav-link-icon d-md-none d-lg-inline-block">
                          <!-- Download SVG icon from http://tabler.io/icons/icon/home -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1">
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                          </svg>
                        </span>	
				<span class="nav-link-title">
					{{ $t('home') }}
				</span>
				
			</a>
		</li>
</ul>
						</div>
						<div class="col-2 d-none d-xxl-block">
<div class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
	
	<Lang/>
	
	</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>


<script setup>
import Lang from "~/components/widgets/Lang.vue";
</script>
