import { coachApi, coachesApi } from '@/utils/commonData';
import { adaptCoach } from '@/utils/adapters';

export const actions = {
  toggleArea(context, area) {
    context.commit('toggleArea', area);
  },
  addCoach(context, data) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const newCoach = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    fetch(coachApi(userId) + '?auth=' + token, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoach),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.message || '');
      }
      context.commit('addCoach', {
        ...newCoach,
        id: userId,
      });
    });
  },

  getCoaches(context, payload) {
    if (
      payload.customRefresh === false &&
      context.getters.shouldUpdate === false
    ) {
      return;
    }

    context.commit('setFetching', true);
    context.commit('setError', false);

    return fetch(coachesApi(), {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((coachesData) => {
        if (coachesData.error) {
          throw new Error(coachesData.error || '');
        }
        if (!coachesData || Object.keys(coachesData).length === 0) {
          return;
        }
        const coachesArr = [];
        for (const key in coachesData) {
          const coachObj = adaptCoach(key, coachesData[key]);
          coachesArr.push(coachObj);
        }
        context.commit('setCoaches', coachesArr);
        context.commit('setFetchTimestamp');
      })
      .catch((error) => context.commit('setError', error))
      .finally(() => {
        context.commit('setFetching', false);
      });
  },
};

