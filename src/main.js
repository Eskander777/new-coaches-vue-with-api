// To load components 'lazy' in other words 'only when
// they are needed' we may use 'defineAsyncComponent' method
// imported from Vue package.
import { createApp, defineAsyncComponent } from 'vue';

import { router as browserRouter } from './router';
import { store as appStore } from './store';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
// import BaseDialog from './components/ui/BaseDialog.vue';

// To use 'defineAsyncComponent' we should provide a
// function, that in the end should return a call of
// 'import' function with an address to needed file as
// string as an argument.
const BaseDialog = defineAsyncComponent(() =>
  import('./components/ui/BaseDialog.vue')
);

const app = createApp(App);

app.use(appStore);
app.use(browserRouter);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');

