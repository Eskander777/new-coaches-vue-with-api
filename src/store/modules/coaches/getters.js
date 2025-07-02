export const getters = {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
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
};

