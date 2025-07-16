<template>
  <div>
    <base-dialog
      :show="!!submitError"
      title="An error occured!"
      @close="dismissError"
    >
      <p>
        {{ submitError }}
      </p>
    </base-dialog>
    <base-dialog :show="isSubmitting" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label
          ><input
            type="email"
            name="email"
            id="email"
            v-model.trim="email.value"
          />
          <p v-if="email.error" class="error-message">
            Please, enter a valid email
          </p>
        </div>
        <div class="form-control">
          <label for="password">Password</label
          ><input
            type="password"
            name="password"
            id="password"
            v-model.trim="password.value"
          />
          <p v-if="password.error" class="error-message">
            Please, enter a valid password
          </p>
        </div>
        <base-button :disabled="!formIsValid">{{
          submitButtonCaption
        }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthForm"
          >{{ switchModeButtonCaption }} instead</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: { value: '', error: false },
      password: { value: '', error: false },
      formIsValid: false,
      mode: 'login',
      isSubmitting: false,
      submitError: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode.charAt(0).toUpperCase() + this.mode.substring(1);
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup';
      }
      return 'Login';
    },
  },
  watch: {
    'email.value'(newEmail) {
      if (newEmail.includes('@')) {
        this.email.error = false;
        if (
          this.email.error === false &&
          this.password.error === false &&
          this.password.value !== ''
        ) {
          this.formIsValid = true;
        }
      } else {
        this.email.error = true;
        this.formIsValid = false;
      }
    },
    'password.value'(newPassword) {
      if (newPassword.length > 6) {
        this.password.error = false;
        if (
          this.password.error === false &&
          this.email.error === false &&
          this.email.value !== ''
        ) {
          this.formIsValid = true;
        }
      } else {
        this.password.error = true;
        this.formIsValid = false;
      }
    },
  },
  methods: {
    submitForm() {
      this.isSubmitting = true;

      const actionPayload = {
        email: this.email.value,
        password: this.password.value,
      };

      const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
      if (this.mode === 'login') {
        return Promise.race([
          this.$store.dispatch('login', actionPayload),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), 3000)
          ),
        ])
          .then(() => this.$router.push(redirectUrl))
          .catch((error) => (this.submitError = error))
          .finally(() => (this.isSubmitting = false));
      }
      Promise.race([
        this.$store.dispatch('signup', actionPayload),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), 3000)
        ),
      ])
        .then(() => this.$router.push(redirectUrl))
        .catch((error) => (this.submitError = error))
        .finally(() => (this.isSubmitting = false));
    },
    switchAuthForm() {
      this.mode === 'login' ? (this.mode = 'signup') : (this.mode = 'login');
    },
    dismissError() {
      this.submitError = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  resize: none;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
.error-message {
  color: red;
}
</style>

