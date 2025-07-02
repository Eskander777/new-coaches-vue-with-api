export const actions = {
  contactCoach(context, { coachId, message, email: userEmail }) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId,
      userEmail,
      message,
    };
    context.commit('addRequest', newRequest);
  },
};

