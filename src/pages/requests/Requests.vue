<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequests">
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

export default {
  components: { RequestItem },
  computed: {
    ...mapGetters('requests', ['requests', 'hasRequests']),
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

