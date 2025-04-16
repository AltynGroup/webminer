import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 100, // 100 пользователей
  duration: '30s', // 30 секунд теста
};

export default function () {
  http.get('https://altyn.nuxt.dev/mining');
  sleep(1);
}
