import {fetchWithHandler, withLoading} from "@/store/helper/fetchHandler";

export default {
    namespaced: true,
    state: {
        data: {},
        loading: {
            fetch: false,
        },
        error: null,
    },
    mutations: {
        setDashboard(state, data) {
            state.data = data;
        },
        setLoading(state, {loadingType, loading}) {
            state.loading[loadingType] = loading;
        },
        setError(state, error) {
            state.error = error;
        }
    },
    actions: {
        async fetchDashboard({commit}) {
            await withLoading(commit, 'fetch', async () => {
                    const resp = await fetchWithHandler('/api/dashboard')
                    commit('setDashboard', resp);
                }
            )
        },
    },
    getters: {
        recentActivities(state) {
            return state.data.recentActivities || [];
        }

    }
}