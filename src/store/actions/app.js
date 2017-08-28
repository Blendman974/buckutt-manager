import { get, post, updateBearer } from '../../lib/fetch';

/**
 * Global actions
 */

export function updateLoggedUser({ commit }, loggedUser) {
    sessionStorage.setItem('user', JSON.stringify(loggedUser));
    commit('UPDATELOGGEDUSER', loggedUser);
}

export function updateLoggedUserField({ state, dispatch }, payload) {
    const newUser          = state.app.loggedUser;
    newUser[payload.field] = payload.value;
    dispatch('updateLoggedUser', newUser);
}

export function createNeededData({ commit, dispatch }) {
    if (sessionStorage.hasOwnProperty('token')) {
        commit('UPDATELOGGEDUSER', JSON.parse(sessionStorage.getItem('user')));
        dispatch('load');
    }
}

export function loadHistory({ commit, getters }) {
    if (getters.logged) {
        get('history').then(results => commit('ADDHISTORY', results));
    }
}

export function clearHistory({ commit }) {
    commit('CLEARHISTORY');
}

export function load({ dispatch }) {
    dispatch('initSocket', sessionStorage.getItem('token'));
    dispatch('loadHistory');
}

export function login({ dispatch }, credentials) {
    return new Promise((resolve, reject) => {
        post('login', credentials)
            .then((result) => {
                if (!result.isAPIError && result.user) {
                    sessionStorage.setItem('token', result.token);
                    dispatch('updateLoggedUser', result.user);
                    updateBearer(result.token);

                    dispatch('load');
                    resolve(result.user);
                } else {
                    reject();
                }
            });
    });
}
