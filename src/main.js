import './styles/base.css';
import './styles/emodul.css';
import { bindEmodulEvents, renderEmodul } from './modules/views/emodul.js';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('Elemen #app tidak ditemukan.');
}

app.innerHTML = renderEmodul();
bindEmodulEvents(app);
