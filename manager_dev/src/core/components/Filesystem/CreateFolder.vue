 
<template lang="pug">
  v-card
    v-card-title {{d.directory}}: {{folderName}}
    v-card-text
      v-text-field(
        v-model="folderName"
        :label="d.enter_dir_name"
        :error-messages="folderNameErrors"
        @input="$v.folderName.$touch()"
        @blur="$v.folderName.$touch()"
      )
    v-card-actions
      v-btn.ml-2(@click="createFolder" color="primary") {{d.create}}
      v-btn(@click="cancel") {{d.cancel}}
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  name: "CreateFolder",

  mixins: [validationMixin],

  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },

  validations: {
    folderName: { required, minLength: minLength(3) }
  },

  data() {
    return {
      folderName: ""
    };
  },

  computed: {
    folderNameErrors() {
      const errors = [];
      if (!this.$v.folderName.$dirty) return errors;
      !this.$v.folderName.minLength &&
        errors.push("Directory name must be at least 3 characters");
      !this.$v.folderName.required && errors.push("Required field");
      return errors;
    }
  },

  methods: {
    createFolder() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      this.$emit("createFolder", this.folderName);
      this.folderName = "";
    },
    cancel() {
      this.folderName = "";
      this.$emit("update:isActive", false);
    }
  }
};
</script>
