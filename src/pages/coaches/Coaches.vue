<template>
  <section><coach-filter></coach-filter></section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach" link to="/register"
          >Register a Coach</base-button
        >
      </div>
      <p v-if="isFetching">Coaches Fetching ...</p>
      <p v-else-if="isErrorFetching">Fetching Error</p>
      <ul
        v-else-if="
          hasCoaches === true &&
          isFetching === false &&
          isErrorFetching === false
        "
      >
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
      <h3
        v-else-if="
          hasCoaches === false &&
          isFetching === false &&
          isErrorFetching === false
        "
      >
        No coaches found.
      </h3>
    </base-card>
  </section>
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
    isFetching() {
      return this.$store.getters['coaches/isFetching'];
    },
    isErrorFetching() {
      return this.$store.getters['coaches/isErrorFetching'];
    },
  },
  methods: {
    loadCoaches() {
      this.$store.dispatch('coaches/getCoaches');
    },
  },
  created() {
    this.loadCoaches();
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

