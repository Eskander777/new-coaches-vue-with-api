<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactCoachUrl">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/singleCoach'](this.id);
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    contactCoachUrl() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    areas() {
      return this.selectedCoach.areas;
    },
  },
};
</script>

