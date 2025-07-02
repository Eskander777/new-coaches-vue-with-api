export const getters = {
  requests(state, _, _2, rootGetters) {
    return state.requests.filter(
      (request) => request.coachId === rootGetters.userId
    );
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};

