export const getters = {
  coaches(state) {
    return state.coaches;
  },
  loadingDone(_, getters) {
    return getters.isFetching === false && getters.isErrorFetching === false;
  },
  hasCoaches(state, getters) {
    return getters.loadingDone && state.coaches.length > 0;
  },
  // To use payload with getters with vuex store we should
  // return a function, that receive selected payload. And
  // returns needed values.
  singleCoach(state) {
    return function (coachId) {
      return state.coaches.find((coach) => coach.id === coachId);
    };
  },
  isCoach(_, getters, _2, rootGetters) {
    return getters.coaches.some((coach) => coach.id === rootGetters.userId);
  },
  selectedAreas(state) {
    return state.selectedAreas;
  },
  selectedCoaches(state) {
    return state.coaches.filter((coach) => {
      for (let i = 0; i < state.selectedAreas.length; i++) {
        if (coach.areas.includes(state.selectedAreas[i])) {
          return true;
        }
      }
    });
  },
  isFetching(state) {
    return state.coachesFetching;
  },
  isErrorFetching(state) {
    return state.errorFetching;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (lastFetch === null) {
      return true;
    }
    return new Date().getTime() - lastFetch > 60_000;
  },
};

