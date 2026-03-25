import Cookie from "js-cookie";

export const fetchWithHandler = async (url, options = {}) => {
    const headers = {
        ...options.headers,
        'authorization': Cookie.get('task-flow-token') || '',
    }
    const resp = await fetch(url, {...options, headers});
    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
    return await resp.json();
}

export const withLoading = async (commit, loadingType, fn) => {
    commit('setError', null);
    commit('setLoading', {loadingType, loading: true});
    try {
        return await fn();
    } catch (err) {
        console.error('fetch error:', err);
        commit('setError', err?.message || 'An error occurred');
        throw err;
    } finally {
        commit('setLoading', {loadingType, loading: false});
    }
}