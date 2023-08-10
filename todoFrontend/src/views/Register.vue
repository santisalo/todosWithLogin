<template>
  <div class="d-flex align-center flex-column">
    <v-sheet width="600" class="mx-auto">
      <v-card width="500" title="Register" class="px-4 py-2">
        <v-form ref="form" fast-fail @submit.prevent="register">
          <v-text-field
            v-model="name"
            label="Name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="password2"
            label="Repeat Password"
            type="password"
            :rules="[(value) => password2Rules(value, password)]"
            required
          ></v-text-field>

          <v-btn
            type="submit"
            :loading="loading"
            color="primary"
            block
            class="mt-2"
            >Register Now</v-btn
          >
          <v-btn
            @click="$router.push('/')"
            type="button"
            color="red"
            block
            class="mt-2"
            >Go Back</v-btn
          >
        </v-form>
      </v-card>
    </v-sheet>
    <default-modal ref="defaultModal" />
  </div>
</template>

<script>
import { postRegister } from "@/api/auth";
import { apiBaseUrl } from "@/utils/consts";
import DefaultModal from "@/components/DefaultModal.vue";
export default {
  components: { DefaultModal },
  data: () => ({
    loading: false,
    name: "",
    nameRules: [
      (value) => {
        if (value.length >= 3) return true;
        return "Name must be at least 3 characters.";
      },
    ],
    email: "",
    emailRules: [
      (value) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          return true;
        }
        return "You have to enter a valid email";
      },
    ],
    password: "",
    passwordRules: [
      (value) => {
        if (value.length >= 8) return true;
        return "Password must be at least 8 characters.";
      },
    ],
    password2: "",
    password2Rules: (value, password) => {
      console.log(value, password);
      if (value === password) return true;
      return "Passwords must match.";
    },
  }),
  mounted() {
    console.log(apiBaseUrl);
    console.log(process.env);
    console.log(import.meta.env);
  },
  methods: {
    async register() {
      let validation = await this.$refs.form.validate();
      if (validation.valid) {
        this.loading = true;

        let response = await postRegister(
          this.name,
          this.email,
          this.password,
          this.password2
        );

        console.log(response);
        if (response.status == 201) {
          this.$refs.defaultModal.open({
            color: "green",
            title: "You're ready to go!",
            content: "Now you have to Login",
            buttons: [{ label: "Close", type: "goto", data: "/" }],
          });
        } else {
          this.$refs.defaultModal.open({
            color: "red",
            title: "Oh no!",
            content: "An error occurred while creating the user",
            buttons: [{ label: "Close", type: "close" }],
          });
        }
      }
    },
  },
};
</script>

<style></style>
