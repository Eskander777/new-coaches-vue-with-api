import { createStore } from 'vuex';

import { coaches } from './modules/coaches';
import { requests } from './modules/requests';
import { auth } from './modules/auth';

export const store = createStore({
  modules: { coaches, requests, auth },
});

