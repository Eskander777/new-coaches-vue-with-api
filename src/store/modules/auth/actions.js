import { signupApi, signinApi } from '@/utils/commonData';

export const actions = {
  login(context, payload) {
    return fetch(signinApi(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, returnSecureToken: true }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);

          throw new Error(response.message || 'Signin error!');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn,
        });
      });
  },
  signup(context, payload) {
    return fetch(signupApi(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, returnSecureToken: true }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.message || 'Signup error!');
        }
        return response.json();
      })
      .then((responseData) => {
        context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn,
        });
      });
  },
  logout(context) {
    console.log('Logout action');
    context.commit('removeUser');
  },
};

