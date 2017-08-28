const state = {
    loggedUser: null,
    history   : [],
    users     : []
};

// mutations
const mutations = {
    UPDATELOGGEDUSER(state_, loggedUser) {
        state_.loggedUser = loggedUser;
    },
    ADDHISTORY(state_, data) {
        state_.history.push(...data);
    },
    CLEARHISTORY(state_) {
        state_.history = [];
    },
    CHANGEUSERS(state_, users) {
        state_.users = users;
    }
};

export default {
    state,
    mutations
};
