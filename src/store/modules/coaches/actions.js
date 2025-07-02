import { coachApi, coachesApi } from '@/utils/commonData';
import { adaptCoach } from '@/utils/adapters';

export const actions = {
  toggleArea(context, area) {
    context.commit('toggleArea', area);
  },
  addCoach(context, data) {
    const userId = context.rootGetters.userId;
    const newCoach = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    fetch(coachApi(userId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoach),
    }).then((response) => {
      if (!response.ok) {
        // error ...
      }

      context.commit('addCoach', {
        ...newCoach,
        id: userId,
      });
    });
  },

  getCoaches(context) {
    context.commit('setFetching', true);
    context.commit('setError', false);
    fetch(coachesApi(), {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => {
        if (!resp.ok) {
          context.commit('setError', true);
        }
        return resp.json();
      })
      .then((coachesData) => {
        if (Object.keys(coachesData).length === 0) {
          return;
        }
        const coachesArr = [];
        for (const key in coachesData) {
          const coachObj = adaptCoach(key, coachesData[key]);
          coachesArr.push(coachObj);
        }
        context.commit('setCoaches', coachesArr);
      })
      .catch(() => context.commit('setError', true))
      .finally(() => {
        context.commit('setFetching', false);
      });
  },
};

