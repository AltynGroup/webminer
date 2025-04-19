<template>

        <div class="navbar-nav flex-row order-md-last">
            <div class="nav-item dropdown">
              <a href="#" class="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown" aria-label="Open user menu">

                <span 
  class="avatar avatar-sm" 
  :style="`background-image: url(https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${session.id})`">
</span>

                <div class="d-none d-xl-block ps-2">
                  <div>{{session.first_name}}</div>
                  <div class="mt-1 small text-secondary">{{session.id}}</div>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <NuxtLink to="/profile" class="dropdown-item">Profile</NuxtLink>
                <div class="dropdown-divider"></div>
                <NuxtLink @click="logout" to="/" class="dropdown-item">Logout</NuxtLink>
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

</script>