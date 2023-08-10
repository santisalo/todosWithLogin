<template>
  <v-list-item>
    <v-list-item-title>
      <p v-if="!editable">{{ content }}</p>
      <v-text-field class="pr-5" v-else v-model="newContent"></v-text-field>
    </v-list-item-title>
    <template v-slot:append>
      <v-btn
        v-if="!editable"
        class="mr-2"
        @click="handleShowEditField"
        color="primary"
        icon="mdi-pencil"
      ></v-btn>
      <v-btn
        :loading="loading"
        v-if="editable"
        class="mr-2"
        @click="editTodo"
        color="success"
        icon="mdi-check"
      ></v-btn>
      <v-btn
        v-if="!editable"
        color="red"
        @click="deleteTodo"
        icon="mdi-delete"
        :loading="loading"
      ></v-btn>
      <v-btn
        v-if="editable"
        color="red"
        @click="editable = false"
        icon="mdi-close"
      ></v-btn>
    </template>
  </v-list-item>
</template>

<script>
import { deleteRemoveTodo, putEditTodo } from "@/api/todos";
export default {
  data: () => ({
    editable: false,
    newContent: "",
    loading: false,
  }),
  props: {
    content: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleShowEditField() {
      this.newContent = this.content;
      this.editable = true;
    },
    async editTodo() {
      this.loading = true;
      let response = await putEditTodo(this.id, this.newContent);
      this.loading = false;
      this.editable = false;
      if (response.status === 202) {
        this.$emit("editComplete", true);
      } else {
        this.$emit("editComplete", false);
      }
    },
    async deleteTodo() {
      this.loading = true;
      let response = await deleteRemoveTodo(this.id);
      this.loading = false;
      if (response.status === 201) {
        this.$emit("deleteComplete", true);
      } else {
        this.$emit("deleteComplete", false);
      }
    },
  },
};
</script>

<style></style>
