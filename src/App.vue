<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <!-- For transition to work, all child elements should -->
    <!-- always have one root element, otherwise transition -->
    <!-- won't work. -->
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue';

export default {
  components: { TheHeader },
  created() {
    this.$store.dispatch('autoLogin');
  },
  // 'computed' properties should always return value with
  // 'return' keyword
  computed: {
    isAutoLoggedOut() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    isAutoLoggedOut(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/coaches');
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.1s linear;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

