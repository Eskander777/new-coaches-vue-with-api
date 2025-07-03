// To use '.env' with vite we should add 'VITE_' to the name of
// selected property. And to access it we should use
// 'import.meta.env.VITE_{selected property name}'
export const API_HOST = import.meta.env.VITE_API_HOST;

export function coachApi(userId) {
  return API_HOST + '/' + userId + '.json';
}

export function coachesApi() {
  return API_HOST + '.json';
}

