import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@/assets/css/main.css'
import VueRouter from "vue-router";

import {routes} from "@/router";
import store from "@/store";


Vue.config.productionTip = false

const router = new VueRouter({
    routes,
    mode: 'history'
})

Vue.use(VueRouter)

async function bootstrap() {
    const {worker} = await import('@/mocks/browser.js')
    await worker.start({onUnhandledRequest: 'bypass'})

    new Vue({
        render: h => h(App),
        router,
        vuetify,
        store
    }).$mount('#app')
}

bootstrap()


