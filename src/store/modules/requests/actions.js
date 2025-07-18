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
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error) {
          throw new Error(responseData.error || 'Failed to send request.');
        }
        newRequest.id = responseData.name;
        newRequest.coachId = coachId;
        context.commit('addRequest', newRequest);
      })
      .catch((error) => console.log(error));
  },

  getRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    return fetch(requestsApi(coachId) + '?auth=' + token, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData && responseData.error) {
          throw new Error(responseData.error || 'Error fetching requests.');
        }
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

