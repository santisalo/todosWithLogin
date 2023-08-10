<template>
  <div class="text-center">
    <v-dialog
      transition="dialog-top-transition"
      v-model="dialog"
      width="auto"
      :title="title"
    >
      <v-card>
        <v-toolbar :color="color" :title="title"></v-toolbar>
        <v-card-text>
          <div class="pa-6">{{ content }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-for="(b, i) in buttons"
            :key="i"
            color="primary"
            block
            @click="handleButtonClick(b)"
            >{{ b.label }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      buttons: [],
      color: "primary",
      dialog: false,
    };
  },
  methods: {
    handleButtonClick(b) {
      if (b.type == "close") {
        this.dialog = false;
      } else if (b.type == "goto") {
        this.dialog = false;
        this.$router.push(b.data);
      }
    },
    open(data) {
      this.refreshData();
      this.title = data.title;
      this.content = data.content;
      this.buttons = data.buttons;
      this.color = data.color;
      this.dialog = true;
    },
    refreshData() {
      this.title = "";
      this.content = "";
      this.buttons = [];
      this.color = "primary";
    },
  },
};
</script>

<style></style>
