import {fetchWithHandler, withLoading} from "@/store/helper/fetchHandler";

export default {
    namespaced: true,
    state: {
        data: {},
        loading: {
            getAll: false,
            delete: false,
            post: false,
            patch: false,
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
                    this.dispatch('toasts/createToast', '專案已刪除');
                }
            });
        },
        async post({commit}, projectData) {
            return await withLoading(commit, 'post', async () => {
                const resp = await fetchWithHandler(`/api/projects`, {
                    method: 'post',
                    body: JSON.stringify(projectData)
                })
                if (resp) {
                    await this.dispatch('projects/getAll');
                    this.dispatch('toasts/createToast', '專案已新增');
                    return resp
                }
            });
        },
        async patch({commit}, {id, projectData}) {
            return await withLoading(commit, 'patch', async () => {
                const resp = await fetchWithHandler(`/api/projects/${id}`, {
                    method: 'patch',
                    body: JSON.stringify(projectData)
                })
                if (resp) {
                    await this.dispatch('projects/getAll');
                    this.dispatch('toasts/createToast', '專案已更新');
                    return resp
                }
            });
        },
    },
    getters: {}
}