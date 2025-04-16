export const useAuth = () => {
    const user = useState('tgUser', () => null)

    const fetchSession = async () => {
        try {
            const { data } = await useFetch('/api/telegram/session')
            user.value = data.value
        } catch (e) {
            user.value = null
        }
    }

    const logout = async () => {
        await $fetch('/api/telegram/logout', { method: 'POST' })
        user.value = null
    }

    return {
        user,
        fetchSession,
        logout,
        isLoggedIn: computed(() => !!user.value)
    }
}
