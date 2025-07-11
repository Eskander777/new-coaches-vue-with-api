import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const auth = {
  state() {
    return {
      token: null,
      userId: null,
      tokenExpiration: null,
    };
  },
  getters,
  actions,
  mutations,
};

