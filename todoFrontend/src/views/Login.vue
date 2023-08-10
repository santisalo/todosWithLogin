<template>
  <div class="d-flex align-center flex-column">
    <v-sheet width="600" class="mx-auto">
      <v-card width="500" title="Login" class="px-4 py-2">
        <v-form ref="form" fast-fail @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
          ></v-text-field>

          <v-btn
            type="submit"
            color="success"
            :loading="loading"
            block
            class="mt-2"
            >Login</v-btn
          >
          <v-btn
            type="button"
            @click="$router.push('/register')"
            color="primary"
            block
            class="mt-2"
            >Register</v-btn
          >
        </v-form>
      </v-card>
    </v-sheet>
    <default-modal ref="defaultModal" />
  </div>
</template>

<script>
import { postLogin } from "@/api/auth";
import DefaultModal from "@/components/DefaultModal.vue";
export default {
  components: { DefaultModal },
  data: () => ({
    email: "",
    password: "",
    emailRules: [
      (value) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          return true;
        }
        return "You have to enter a valid email";
      },
    ],

    passwordRules: [
      (value) => {
        if (value !== "") return true;
        return "You must enter your password.";
      },
    ],
    loading: false,
  }),
  methods: {
    async login() {
      let validation = await this.$refs.form.validate();
      if (validation.valid) {
        this.loading = true;
        let response = await postLogin(this.email, this.password);
        this.loading = false;
        if (response.status === 200 && response.data?.data?.token) {
          localStorage.setItem("token", response.data.data.token);
          this.$router.push("/home");
        } else {
          this.$refs.defaultModal.open({
            color: "red",
            title: "Error!",
            content: "Invalid credentials",
            buttons: [{ label: "Close", type: "close" }],
          });
        }
      }
    },
  },
};
</script>

<style></style>
