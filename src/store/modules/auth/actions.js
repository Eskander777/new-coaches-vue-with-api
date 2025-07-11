const API_KEY = import.meta.env.VITE_API_KEY;

export const actions = {
  login(context) {},
  signup(context, payload) {
    return fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, returnSecureToken: true }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.message || 'Signup error!');
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
};

