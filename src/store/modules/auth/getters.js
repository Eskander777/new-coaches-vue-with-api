export const getters = {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuth(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};

