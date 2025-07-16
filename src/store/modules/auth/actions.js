import { signupApi, signinApi } from '@/utils/commonData';

export const actions = {
  login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'login' });
  },
  signup(context, payload) {
    return context.dispatch('auth', payload);
  },
  auth(context, payload) {
    const apiMethod = payload.mode === 'login' ? signinApi : signupApi;
    const methodName = payload.mode === 'login' ? 'Login' : 'Signup';

    return fetch(apiMethod(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, returnSecureToken: true }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error) {
          throw new Error(responseData.error.message || `${methodName} error`);
        }

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);

        context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn,
        });
      });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      });
    }
  },

  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};

