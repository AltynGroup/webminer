export default defineNuxtPlugin((nuxtApp) => {
    const route = useRoute();


});


onMounted(() => {
    if (process.client) {
        // Проверяем, является ли текущий путь числовым ID
        if (/^\d+$/.test(route.params.id)) {
            const referrerId = route.params.id;
            localStorage.setItem("partner", referrerId);
        }
    }
});
