import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import { loadFonts } from './plugins/webfontloader'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './override.css'

import ca from './locales/ca.json';
import es from './locales/es.json';


loadFonts()
library.add(fas);

const messages = {
  ca,
  es
};

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages,
});

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(i18n);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');

