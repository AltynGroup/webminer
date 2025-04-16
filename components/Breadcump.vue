<template>


<div class="page-header d-print-none">
	<div class="container-xl">
		<div class="row g-2 align-items-center">
			<div class="col">
				<!-- Page pre-title -->
				<div class="page-pretitle">
					Overview
				</div>
				<h2 class="page-title"> 			</h2>
			</div>
				<!-- Page title actions -->
				<div class="col-auto ms-auto d-print-none">
					<div class="btn-list">


<div v-if="session.loggedIn">
        
</div>

<div v-else>
        <TelegramLoginWidget telegram-login="tokenrebate_bot"/>
      </div>
    


</div>



				</div>
		</div>
	</div>
</div>

</template>





<script setup>
const { clearSession, session } = useUserSession();
const logout = () => clearSession();

const sendSessionToServer = async () => {
  if (!session.value) return;

  const { data, error } = await useFetch("/api/auth", {
    method: "POST",
    body: session.value,
  });

/*
  if (error.value) {
    //console.error("Ошибка API:", error.value);
  } else {
    //console.log("✅ Данные сохранены:", data.value);
  }
*/

};

watch(session, (newSession) => {
  if (newSession) {
    sendSessionToServer();
  }
});

</script>