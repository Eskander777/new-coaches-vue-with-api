import { createRouter, createWebHistory } from 'vue-router';

import Coaches from '@/pages/coaches/Coaches.vue';
import SingleCoach from '@/pages/coaches/SingleCoach.vue';
import RegisterCoach from '@/pages/coaches/RegisterCoach.vue';
import ContactCoach from '@/pages/requests/ContactCoach.vue';
import Requests from '@/pages/requests/Requests.vue';
import Error from '@/pages/Error.vue';
import Signup from '@/pages/Signup.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/signup', component: Signup },
    { path: '/coaches', component: Coaches },
    {
      props: true,
      path: '/coaches/:id',
      component: SingleCoach,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    { path: '/register', component: RegisterCoach },
    { path: '/requests', component: Requests },
    { path: '/:notFound(.*)', component: Error },
  ],
});

