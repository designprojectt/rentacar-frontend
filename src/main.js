import './assets/main.css';
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Pinia
import { createPinia } from 'pinia';

// GrillePain
import GrillePain, {GpPosition} from "vue-grille-pain";

const grillePainOptions = {
    position: GpPosition.BOTTOM_RIGHT,
    fadeAfter: 1000,
};

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark'
    }
});

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(GrillePain, grillePainOptions)
app.use(router);

app.mount('#app');
