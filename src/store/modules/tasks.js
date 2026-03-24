import {fetchWithHandler, withLoading} from "@/store/helper/fetchHandler";

export const TaskFilterType = Object.freeze({
    PROJECT_ID: 'projectId',
    STATUS: 'status',
    PRIORITY: 'priority',
    SEARCH: 'search',
    SORT: 'sort',
    ASSIGNEE: 'assignee',
})

export default {
    namespaced: true,
    state: {
        data: {},
        filter: {},
        loading: {
            getAll: false,
            getById: false,
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
        setFilter: (state, payload) => {
            state.filter = payload;
        },
        setLoading(state, {loadingType, loading}) {
            state.loading[loadingType] = loading;
        },
        setError(state, error) {
            state.error = error;
        }
    },
    actions: {
        async getAll({commit, state}, projectId) {
            const params = new URLSearchParams({projectId, ...state.filter});
            return await withLoading(commit, 'getAll', async () => {
                    const resp = await fetchWithHandler(`/api/tasks?${params.toString()}`)
                    commit('setData', resp);
                }
            )
        },
        async getById({commit}, id) {
            return await withLoading(commit, 'getById', async () => {
                    const resp = await fetchWithHandler(`/api/tasks/${id}`)
                    commit('setData', resp);
                }
            )
        },
        async delete({commit}, id) {
            return await withLoading(commit, 'delete', async () => {
                const resp = await fetchWithHandler(`/api/tasks/${id}`, {method: 'delete'})
                if (resp?.success) {
                    await this.dispatch('tasks/getAll');
                    this.dispatch('toasts/createToast', '任務已刪除');
                }
            });
        },
        async post({commit}, taskData) {
            return await withLoading(commit, 'post', async () => {
                const resp = await fetchWithHandler(`/api/tasks`, {
                    method: 'post',
                    body: JSON.stringify(taskData)
                })
                if (resp) {
                    await this.dispatch('tasks/getAll');
                    this.dispatch('toasts/createToast', '任務已新增');
                    return resp
                }
            });
        },
        async patch({commit}, {id, taskData}) {
            return await withLoading(commit, 'patch', async () => {
                const resp = await fetchWithHandler(`/api/tasks/${id}`, {
                    method: 'patch',
                    body: JSON.stringify(taskData)
                })
                if (resp) {
                    await this.dispatch('tasks/getAll');
                    this.dispatch('toasts/createToast', '任務已更新');
                    return resp
                }
            });
        },
    },
    getters: {}
}