export const mutations = {
  toggleArea(state, area) {
    const sAreaIndex = state.selectedAreas.findIndex((sArea) => sArea === area);

    if (sAreaIndex === -1) {
      state.selectedAreas.push(area);
      return;
    }

    state.selectedAreas.splice(sAreaIndex, 1);
  },
  addCoach(state, newCoach) {
    state.coaches.push(newCoach);
  },
  setCoaches(state, receivedCoaches) {
    state.coaches = receivedCoaches;
  },
  setError(state, errorState) {
    state.errorFetching = errorState;
  },
  setFetching(state, fetchingState) {
    state.coachesFetching = fetchingState;
  },
};

