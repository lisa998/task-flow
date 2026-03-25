import {fetchWithHandler, withLoading} from "@/store/helper/fetchHandler";
import Cookie from 'js-cookie';
import {router} from "@/main";

export default {
    namespaced: true,
    state: {
        user: {},
        loading: {
            login: false,
        },
        error: null,
    },
    mutations: {
        setUser: (state, payload) => {
            state.user = payload;
        },
        setLoading(state, {loadingType, loading}) {
            state.loading[loadingType] = loading;
        },
        setError(state, error) {
            state.error = error;
        }
    },
    actions: {
        async login({commit}, payload) {
            return await withLoading(commit, 'login', async () => {
                    const resp = await fetchWithHandler('/api/login', {method: 'POST', body: JSON.stringify(payload)});
                    if (resp?.user) {
                        commit('setUser', resp?.user);
                        Cookie.set('task-flow-token', `Bearer ${resp?.token}`, {expires: 7});
                        this.dispatch('toasts/createToast', '登入成功');
                        await router.push(router.currentRoute.query?.redirect || '/');
                    }
                }
            )
        },
        async logout({commit}) {
            commit('setUser', {});
            Cookie.remove('task-flow-token');
            this.dispatch('toasts/createToast', '已登出');
            await router.push('/login');
        },
        async getUser({commit}) {
            const token = Cookie.get('task-flow-token');
            if (!token) return
            console.log('get user /me')
            return await withLoading(commit, 'user', async () => {
                    const resp = await fetchWithHandler('/api/me',);
                    if (resp?.user) {
                        commit('setUser', resp?.user);
                    }
                }
            )
        }
    },
    getters: {}
}