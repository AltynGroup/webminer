export default defineNuxtRouteMiddleware(() => {
    const { session } = useUserSession()

    if (!session.value) {
        return navigateTo('/')
    }
})
