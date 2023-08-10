<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-list-box-outline" />
      Todo List
    </v-app-bar-title>

    <template v-slot:append v-if="showLogout">
      <v-btn color="red" @click="logout">
        <v-icon>mdi-logout</v-icon>
        Log out
      </v-btn>
    </template>
  </v-app-bar>
</template>
<script>
export default {
  computed: {
    showLogout() {
      if (this.$route.path === "/home") return true;
      return false;
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
