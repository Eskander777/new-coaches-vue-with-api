import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';

export const coaches = {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [],
      selectedAreas: ['frontend', 'backend', 'career'],
      coachesFetching: false,
      errorFetching: false,
    };
  },
  mutations,
  actions,
  getters,
};

