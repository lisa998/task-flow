import {fetchWithHandler, withLoading} from "@/store/helper/fetchHandler";

export default {
    namespaced: true,
    state: {
        notifications: [],
        loading: {
            fetch: false,
            markRead: false,
            markAllRead: false
        },
        error: null,
    },
    mutations: {
        setAllNotifications(state, notifications) {
            state.notifications = notifications;
        },
        setNotification(state, notification) {
            state.notifications = state.notifications.map((n) => n.id === notification.id ? notification : n);
        },
        markAllNotificationsRead(state) {
            state.notifications = state.notifications.map(n => ({
                ...n,
                read: true
            }))
        },
        setLoading(state, {loadingType, loading}) {
            state.loading[loadingType] = loading;
        },
        setError(state, error) {
            state.error = error;
        }
    },
    actions: {
        async fetchNotifications({commit}) {
            await withLoading(commit, 'fetch', async () => {
                    const resp = await fetchWithHandler('/api/notifications');
                    commit('setAllNotifications', resp);
                }
            )
        },
        async markRead({commit}, id) {
            await withLoading(commit, 'markRead', async () => {
                    const resp = await fetchWithHandler(`/api/notifications/${id}/read`, {method: 'PATCH'});
                    commit('setNotification', resp);
                }
            )
        },
        async markAllRead({commit}) {
            await withLoading(commit, 'markAllRead', async () => {
                    const resp = await fetchWithHandler('/api/notifications/mark-all-read', {method: 'POST'});
                    if (resp?.success) commit('markAllNotificationsRead')
                }
            )
        }
    },
    getters: {}
}