<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        name="frontend"
        id="frontend"
        :checked="frontendIsSelected"
        @click="toggleArea('frontend')"
      /><label for="frontend">frontend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        name="backend"
        id="backend"
        :checked="backendIsSelected"
        @click="toggleArea('backend')"
      /><label for="backend">backend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        name="career"
        id="career"
        :checked="careerIsSelected"
        @click="toggleArea('career')"
      /><label for="career">career</label>
    </span>
  </base-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('coaches', ['toggleArea']),
  },
  computed: {
    ...mapGetters('coaches', ['selectedAreas']),
    careerIsSelected() {
      return this.selectedAreas.includes('career');
    },
    frontendIsSelected() {
      return this.selectedAreas.includes('frontend');
    },
    backendIsSelected() {
      return this.selectedAreas.includes('backend');
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
  text-transform: capitalize;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>

