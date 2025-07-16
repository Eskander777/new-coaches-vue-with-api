<template>
  <div>
    <base-dialog
      :show="isErrorFetching"
      title="An error occured!"
      @close="closeDialog"
    >
      <p>{{ errorMsg }}</p>
    </base-dialog>
    <section><coach-filter></coach-filter></section>
    <section>
      <base-card>
        <div class="controls">
          <base-button
            mode="outline"
            @click="loadCoaches({ customRefresh: true })"
            >Refresh</base-button
          >
          <base-button v-if="isAuth === false" link to="/auth?redirect=register"
            >Login into register as coach</base-button
          >
          <base-button
            v-if="!isCoach && isFetching === false && isAuth === true"
            link
            to="/register"
            >Register a Coach</base-button
          >
        </div>
        <p v-if="isFetching"><base-spinner></base-spinner></p>
        <ul v-else-if="hasCoaches === true">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
            :id="coach.id"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';

export default {
  components: { CoachItem, CoachFilter },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      return this.$store.getters['coaches/selectedCoaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
    noCoaches() {
      return this.$store.getters['coaches/noCoaches'];
    },
    isFetching() {
      return this.$store.getters['coaches/isFetching'];
    },
    isErrorFetching() {
      return !!this.$store.getters['coaches/isErrorFetching'];
    },
    errorMsg() {
      return this.$store.getters['coaches/isErrorFetching'];
    },
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    loadCoaches(customUpdate) {
      this.$store.dispatch('coaches/getCoaches', customUpdate);
    },
    closeDialog() {
      this.$store.commit('coaches/setError', false);
    },
  },
  created() {
    this.loadCoaches({ customRefresh: false });
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

