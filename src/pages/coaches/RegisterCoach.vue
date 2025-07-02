<template>
  <section>
    <base-card>
      <h2>Register a coach now</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';

export default {
  components: { CoachForm },
  methods: {
    saveData(formData) {
      this.$store.dispatch('coaches/addCoach', formData);
      // 'replace' is a special method of 'this.$router' of
      // 'vue-router'. It is used to forward user to defined url
      // as parameter. It works the same as 'push' method, except
      // it doesn't allow user to return back to previous url.
      this.$router.replace('/coaches');
    },
  },
};
</script>

