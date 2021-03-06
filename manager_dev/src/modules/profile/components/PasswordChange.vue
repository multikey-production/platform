<template lang="pug">
  v-expansion-panels
    v-expansion-panel
      v-expansion-panel-header {{d.change_password}}
      v-expansion-panel-content
        v-layout.wrap
          v-flex.md6.pr-3
            v-text-field(
              v-model="oldPassword"
              :label="`${d.enter_old_password}:`"
              :type="showOldPassword ? 'text' : 'password'"
              :append-icon="showOldPassword ? 'visibility' : 'visibility_off'"
              @click:append="showOldPassword = !showOldPassword"
              :error-messages="oldPasswordErrors"
              @input="$v.oldPassword.$touch()"
              @blur="$v.oldPassword.$touch()"
            )
          v-flex.md6
            v-text-field(
              v-model="newPassword"
              :label="`${d.enter_new_password}:`"
              :type="showNewPassword ? 'text' : 'password'"
              :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
              @click:append="showNewPassword = !showNewPassword"
              :error-messages="newPasswordErrors"
              @input="$v.newPassword.$touch()"
              @blur="$v.newPassword.$touch()"
            )
          v-flex.md6.pr-3
            v-text-field(
              v-model="confirmNewPassword"
              :label="`${d.confirm_password}:`"
              :type="showConfirmNewPassword ? 'text' : 'password'"
              :append-icon="showConfirmNewPassword ? 'visibility' : 'visibility_off'"
              @click:append="showConfirmNewPassword = !showConfirmNewPassword"
              :error-messages="confirmNewPasswordErrors"
              @input="$v.confirmNewPassword.$touch()"
              @blur="$v.confirmNewPassword.$touch()"
            )
        v-layout
          v-btn.mr-2(color="primary" @click="changePassword") {{d.change}}
          v-btn(color="primary" @click="clearPassword") {{d.cancel}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { helpers, required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "PasswordChange",

  mixins: [validationMixin],

  props: {
    userId: {
      type: Number,
      default: 0
    }
  },

  validations: {
    oldPassword: {
      required,
      minLength: minLength(6)
    },
    newPassword: {
      required,
      minLength: minLength(6)
    },
    confirmNewPassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs("newPassword")
    }
  },

  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      showOldPassword: false,
      showNewPassword: false,
      showConfirmNewPassword: false
    };
  },

  computed: {
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.oldPassword.$dirty) return errors;
      !this.$v.oldPassword.required && errors.push("Обязательное поле");
      !this.$v.oldPassword.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.required && errors.push("Обязательное поле");
      !this.$v.newPassword.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      return errors;
    },
    confirmNewPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmNewPassword.$dirty) return errors;
      !this.$v.confirmNewPassword.required && errors.push("Обязательное поле");
      !this.$v.confirmNewPassword.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      !this.$v.confirmNewPassword.sameAsPassword &&
        errors.push("Пароли не совпадают!");
      return errors;
    }
  },

  methods: {
    async changePassword() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      const data = {
        userId: this.userId,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };

      if (this.userId === this.$store.getters["profile/get"].id) {
        await this.$store.dispatch("profile/changePassword", { body: data });
      } else {
        await this.$store.dispatch("user/changePassword", { body: data });
      }

      this.clearPassword();
    },

    clearPassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";
    }
  }
};
</script>
