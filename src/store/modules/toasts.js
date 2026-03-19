export default {
    namespaced: true,
    state: {
        data: [],
        id: 0,
    },
    mutations: {
        addToast(state, toast) {
            state.data.push(toast);
        },
        shiftToast(state) {
            state.data.shift();
        },
        closeToast(state, toastId) {
            state.data = state.data.filter(toast => toast.id !== toastId);
        }
    },
    actions: {
        createToast({commit}, text) {
            commit('addToast', {
                id: this.state.toasts.id++,
                text
            });
            setTimeout(() => {
                commit('shiftToast');
            }, 3000);
        }
    },
    getters: {}
}