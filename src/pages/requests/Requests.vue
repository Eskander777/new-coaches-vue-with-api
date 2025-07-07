<template>
  <section>
    <base-dialog
      :show="!!errorFetching"
      title="An error occured!"
      @close="closeDialog"
    >
      <p>{{ errorFetching }}</p>
    </base-dialog>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="requestsIsLoading === true"></base-spinner>
      <ul v-else-if="hasRequests">
        <request-item
          v-for="request in requests"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import RequestItem from '@/components/requests/RequestItem.vue';
import { requests } from '@/store/modules/requests';

export default {
  components: { RequestItem },
  data() {
    return {
      requestsIsLoading: false,
      errorFetching: '',
    };
  },
  computed: {
    ...mapGetters('requests', ['requests', 'hasRequests']),
  },
  methods: {
    closeDialog() {
      this.errorFetching = '';
    },
  },
  created() {
    this.requestsIsLoading = true;
    this.$store
      .dispatch('requests/getRequests')
      .then((error) => (this.errorFetching = error))
      .finally(() => {
        this.requestsIsLoading = false;
      });
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>

