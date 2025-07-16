import { createRouter, createWebHistory } from 'vue-router';

// We may use vuex store outside of components inside of
// vue applictation for that we just need to import it
// from main vuex store file. All properties are available
// inside of {imported storeName} property like inside of
// components. It may be used, for example to check whether
// user is authenticated or not.
import { store } from '@/store';
import Coaches from '@/pages/coaches/Coaches.vue';
import SingleCoach from '@/pages/coaches/SingleCoach.vue';
import RegisterCoach from '@/pages/coaches/RegisterCoach.vue';
import ContactCoach from '@/pages/requests/ContactCoach.vue';
import Requests from '@/pages/requests/Requests.vue';
import Error from '@/pages/Error.vue';
import UserAuth from '@/pages/UserAuth.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: Coaches },
    {
      props: true,
      path: '/coaches/:id',
      component: SingleCoach,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    {
      path: '/register',
      component: RegisterCoach,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/requests',
      component: Requests,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnauth: true,
      },
    },
    { path: '/:notFound(.*)', component: Error },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth === true && store.getters.isAuth === false) {
    return next('/auth');
  } else if (to.meta.requiresUnauth === true && store.getters.isAuth === true) {
    return next('/coaches');
  }
  next();
});

