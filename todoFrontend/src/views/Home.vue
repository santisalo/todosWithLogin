<template>
  <v-card class="ma-12 px-4 py-2" title="The todos" :loading="loading">
    <v-list>
      <template v-for="todo in todos" :key="todo.id">
        <todo-item
          :content="todo.content"
          :id="todo.id"
          @editComplete="handleEditTodo"
          @deleteComplete="handleDeleteTodo"
        />
      </template>
    </v-list>
    <v-divider class="my-3" thickness="4"></v-divider>
    <p class="text-h6">Create new Todo:</p>
    <v-text-field
      v-model="newTodoContent"
      append-icon="mdi-plus"
      placeholder="Enter here the content of the new todo..."
      :loading="newTodoLoading"
      @click:append="addTodo"
    ></v-text-field>
    <default-modal ref="defaultModal" />
  </v-card>
</template>

<script>
import { getAllTodos, postCreateTodo } from "@/api/todos";
import TodoItem from "@/components/TodoItem.vue";
import DefaultModal from "@/components/DefaultModal.vue";
export default {
  components: { TodoItem, DefaultModal },
  data: () => ({
    todos: [{ id: 1, content: "Mi todo mock" }],
    loading: true,
    newTodoLoading: false,
    newTodoContent: "",
  }),
  mounted() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      this.loading = true;
      let response = await getAllTodos();
      this.loading = false;
      if (response.status === 200) {
        this.todos = response.data.data;
      }
    },
    handleEditTodo(response) {
      console.log(response);
      if (!response) {
        this.$refs.defaultModal.open({
          color: "red",
          title: "Oh no!",
          content: "An error occurred while updating the todo",
          buttons: [{ label: "Close", type: "close" }],
        });
      } else {
        this.getTodos();
      }
    },
    handleDeleteTodo(response) {
      console.log(response);
      if (!response) {
        this.$refs.defaultModal.open({
          color: "red",
          title: "Oh no!",
          content: "An error occurred while updating the todo",
          buttons: [{ label: "Close", type: "close" }],
        });
      } else {
        this.getTodos();
      }
    },
    async addTodo() {
      this.newTodoLoading = true;
      let response = await postCreateTodo(this.newTodoContent);
      this.newTodoLoading = false;
      if (response.status === 201) {
        this.newTodoContent = "";
        this.getTodos();
      } else {
        this.$refs.defaultModal.open({
          color: "red",
          title: "Oh no!",
          content: "An error occurred while creating the todo",
          buttons: [{ label: "Close", type: "close" }],
        });
      }
    },
  },
};
</script>

<style></style>
