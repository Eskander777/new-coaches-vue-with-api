export const mutations = {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },
  removeUser(state) {
    state.token = null;
    state.userId = null;
    state.tokenExpiration = null;
  },
};

