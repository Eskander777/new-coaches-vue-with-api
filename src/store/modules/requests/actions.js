import { requestApi, requestsApi } from '@/utils/commonData';

export const actions = {
  contactCoach(context, { coachId, message, email: userEmail }) {
    const newRequest = {
      userEmail,
      message,
    };
    return fetch(requestApi(coachId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest),
    })
      .then((response) => {
        if (response.ok === false) {
          const error = new Error(
            response.message || 'Failed to send request.'
          );
          throw error;
        }

        return response.json();
      })
      .then((responseData) => {
        newRequest.id = responseData.name;
        newRequest.coachId = coachId;
        context.commit('addRequest', newRequest);
      })
      .catch((error) => console.log(error));
  },

  getRequests(context) {
    const coachId = context.rootState.userId;

    return fetch(requestsApi(coachId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok === false) {
          throw new Error(response.message || 'Error fetching requests.');
        }

        return response.json();
      })
      .then((responseData) => {
        const requestsArr = [];
        for (let reqId in responseData) {
          const fetchedRequest = {
            coachId,
            id: reqId,
            message: responseData[reqId].message,
            userEmail: responseData[reqId].userEmail,
          };
          requestsArr.push(fetchedRequest);
        }
        context.commit('setRequests', requestsArr);
      })
      .catch((error) => error);
  },
};

