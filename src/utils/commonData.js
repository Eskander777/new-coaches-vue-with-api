// To use '.env' with vite we should add 'VITE_' to the name of
// selected property. And to access it we should use
// 'import.meta.env.VITE_{selected property name}'
const API_HOST = import.meta.env.VITE_API_HOST;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_AUTH = import.meta.env.VITE_API_AUTH;

export function coachApi(userId) {
  return API_HOST + '/coaches/' + userId + '.json';
}

export function coachesApi() {
  return API_HOST + '/coaches.json';
}

export function requestApi(coachId) {
  return API_HOST + '/requests/' + coachId + '.json';
}

export function requestsApi(coachId) {
  return API_HOST + '/requests/' + coachId + '.json';
}

export function signupApi() {
  return API_AUTH + 'signUp?key=' + API_KEY;
}

export function signinApi() {
  return API_AUTH + 'signInWithPassword?key=' + API_KEY;
}

