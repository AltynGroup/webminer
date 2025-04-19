
//мидл на проверку авторизваонности для страниц. Чтобы использовать ждя страниц, ставь метку мидла аут в дефайне

export default defineNuxtRouteMiddleware(async () => {
    const { session } = useUserSession();

    // Дождаться загрузки данных, если нужно
    while (session.value === null || session.value.loggedIn === undefined) {
        await new Promise((resolve) => setTimeout(resolve, 50));
    }

    if (!session.value.loggedIn) {
      //  console.log('❌ Не авторизован. Session:', session.value);
        return navigateTo('/login');
    }

    //console.log('✅ Авторизован:', session.value);
});



