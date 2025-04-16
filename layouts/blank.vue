<template>
<body data-bs-theme="dark">
<div class="page">
  <!-- Навигация -->
<header class="navbar navbar-expand-md d-print-none">
  <div class="container-xl">
          <a href="/" class="navbar-brand">AltynWebMiner</a>
  </div>
</header>

      <header class="navbar-expand-md">
      <MenuHead/>
      </header>
      
<div class="page-wrapper">
      
<div class="page-header d-print-none">
	<div class="container-xl">
		<div class="row g-2 align-items-center">
			<div class="col">
				<!-- Page pre-title -->
				<h2 class="page-title">Frequently Asked Questions</h2>
			</div>
<div class="col-auto ms-auto d-print-none">
                <div class="d-flex">
                  <ol class="breadcrumb breadcrumb-arrows" aria-label="breadcrumbs">
                    <li class="breadcrumb-item"><a href="#">{{ $t('home') }}</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><a href="#">{{ $t('faq') }}</a></li>
                  </ol>
                </div>
              </div>
		</div>
	</div>
</div>

        
        <div class="page-body">



        
          
          <slot />

        

        </div>
      </div>

    <Footer/>

    </div>
  </body>
</template>

<script setup>
useHead({ title: "FAQ" });
</script>
