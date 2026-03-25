import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@/assets/css/main.css'
import VueRouter from "vue-router";
import PortalVue from 'portal-vue'

import {routes} from "@/router";
import store from "@/store";


Vue.config.productionTip = false
Vue.use(PortalVue)

export const router = new VueRouter({
    routes,
    mode: 'history'
})

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from, next) => {
    try {
        await store.dispatch("auth/getUser");
    } catch (error) {
        console.log("Error fetching user:", error);
    }

    const user = store.state.auth.user
    const isAuthenticated = !!user?.id

    if (to.matched.some(record => record.meta?.requiresAuth) && !isAuthenticated) {
        return next({
            path: '/login',
            query: {redirect: to.fullPath},
        })
    }
    if (to.matched.some(record => record.meta?.guestOnly) && isAuthenticated) {
        return next('/')
    }

    next()
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


