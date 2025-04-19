<template>
  <div>
    <h1 v-if="idExists">ID найдено: {{ id }} - {{ wallet }} </h1>
    <h1 v-else>ID не найдено</h1>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useSupabase } from '~/composables/useSupabase';

const route = useRoute();
const id = route.params.id;

const supabase = useSupabase();
const idExists = ref(false);
const wallet = ref(null);


const fetchData = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('id, wallet')
    .eq('id', id)
    .single();

  if (data) {
    idExists.value = true;
    wallet.value = data.wallet;

  } else {
    idExists.value = false;
    //wallet.value = null;
    router.push('/'); // Редирект на корень, если ID не найден


  }
};

onMounted(() => {
  fetchData();
});


definePageMeta({
  layout: "miner"
});
</script>
