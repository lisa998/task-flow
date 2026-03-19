import {fetchWithHandler, withLoading} from "@/store/helper/fetchHandler";

export default {
    namespaced: true,
    state: {
        data: {},
        loading: {
            getAll: false,
            delete: false,
        },
        error: null,
    },
    mutations: {
        setData: (state, payload) => {
            state.data = payload;
        },
        setLoading(state, {loadingType, loading}) {
            state.loading[loadingType] = loading;
        },
        setError(state, error) {
            state.error = error;
        }
    },
    actions: {
        async getAll({commit}) {
            return await withLoading(commit, 'getAll', async () => {
                    const resp = await fetchWithHandler('/api/projects')
                    commit('setData', resp);
                }
            )
        },
        async delete({commit}, id) {
            return await withLoading(commit, 'delete', async () => {
                const resp = await fetchWithHandler(`/api/projects/${id}`, {method: 'delete'})
                if (resp?.success) {
                    await this.dispatch('projects/getAll');
                    console.log(resp)
                    this.dispatch('toasts/createToast', '專案已刪除');
                }
            });
        }
    },
    getters: {}
}