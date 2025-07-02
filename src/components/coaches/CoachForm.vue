<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: firstName.isValid === false }">
      <label for="firstname">first name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.value"
        @blur="clearValidity('firstName')"
      />
      <p v-if="firstName.isValid === false">First Name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: lastName.isValid === false }">
      <label for="lastname">last name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.value"
        @blur="clearValidity('lastName')"
      />
      <p v-if="lastName.isValid === false">Last Name must not be empty</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: description.isValid === false }"
    >
      <label for="description">description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model.trim="description.value"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="description.isValid === false">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: rate.isValid === false }">
      <label for="rate">hourly rate $</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.value"
        @blur="clearValidity('rate')"
      />
      <p v-if="rate.isValid === false">Rate must not be empty or below zero</p>
    </div>
    <div class="form-control" :class="{ invalid: areas.isValid === false }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">frontend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="backend">backend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="career">career advisory</label>
      </div>
      <p v-if="areas.isValid === false">At least one must be selected</p>
    </div>
    <p v-if="formIsValid === false">
      Please fix above errors and submit again!
    </p>
    <base-button>Submit</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: { value: '', isValid: true },
      lastName: { value: '', isValid: true },
      description: { value: '', isValid: true },
      rate: { value: null, isValid: true },
      areas: { value: [], isValid: true },
      formIsValid: true,
    };
  },
  emits: ['save-data'],
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      for (let property in this.$data) {
        switch (property) {
          case 'formIsValid':
            continue;
          case 'areas':
            if (this[property].value.length === 0) {
              this[property].isValid = false;
              this.formIsValid = false;
            }
            break;
          case 'rate':
            if (!this[property].value || this[property].value < 0) {
              this[property].isValid = false;
              this.formIsValid = false;
            }
            break;
          default:
            if (!this[property].value) {
              this[property].isValid = false;
              this.formIsValid = false;
            }
            break;
        }
      }
    },
    submitForm() {
      this.validateForm();
      if (this.formIsValid === false) return;

      const formData = {
        first: this.firstName.value,
        last: this.lastName.value,
        desc: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };

      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped="">
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>

