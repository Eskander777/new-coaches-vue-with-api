// To use '.env' with vite we should add 'VITE_' to the name of
// selected property. And to access it we should use
// 'import.meta.env.VITE_{selected property name}'
const API_HOST = import.meta.env.VITE_API_HOST;

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

