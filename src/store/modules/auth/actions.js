import { signupApi, signinApi } from '@/utils/commonData';
let timerId;

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

        const tokenExpirationInMs = Number(responseData.expiresIn) * 1000;
        const tokenExpiration = new Date().getTime() + tokenExpirationInMs;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', tokenExpiration);

        timerId = setTimeout(function () {
          context.dispatch('autoLogout');
        }, tokenExpirationInMs);

        context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
        });
      });
  },
  autoLogin(context) {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = Number(tokenExpiration) - new Date().getTime();

    if (expiresIn < 0) return;

    timerId = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timerId);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};

