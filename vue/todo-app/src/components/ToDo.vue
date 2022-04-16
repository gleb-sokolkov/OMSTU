<script>
import TodoItem from "@/components/TodoItem.vue";
import TodoBuilder from "@/components/TodoBuilder.vue";
import TodoFilter from "@/components/TodoFilter.vue";
export default {
  components: {
    TodoItem,
    TodoBuilder,
    TodoFilter,
  },
  data() {
    return {
      todos: [
        { id: 1, title: "Сделать РВП", completed: false },
        { id: 2, title: "Купить молоко", completed: false },
        { id: 3, title: "Купить пыво", completed: false },
        { id: 4, title: "Сделать чай", completed: false },
        { id: 5, title: "Выучить эльфийский", completed: false },
        { id: 6, title: "Сходить в больницу", completed: false },
      ],
      filterFunc: null,
    };
  },
  mounted() {
    this.filterFunc = () => this.All;
  },
  methods: {
    getTodoById(id) {
      return this.todos.find((t) => t.id === id);
    },
    toggleTodo(id) {
      const todo = this.getTodoById(id);
      todo.completed = !todo.completed;
    },
    removeTodo(id) {
      const todo = this.getTodoById(id);
      this.todos = this.todos.filter((item) => item !== todo);
    },
    addTodo(title) {
      this.todos.push({
        completed: false,
        id: Date.now(),
        title,
      });
    },
    setFilterFunc(todos) {
      this.filterFunc = todos;
    },
  },
  computed: {
    All() {
      return this.todos;
    },
    Completed() {
      return this.todos.filter((todo) => todo.completed === true);
    },
    NotCompleted() {
      return this.todos.filter((todo) => todo.completed !== true);
    },
    notEmpty() {
      return this.filterFunc && this.filterFunc().length !== 0;
    },
  },
};
</script>

<template>
  <div class="todos">
    <h1 class="h1 h1_theme_fancy todos__title">todo</h1>
    <div class="todos__header">
      <TodoBuilder :addTodo="addTodo" class="todos__form" />
      <TodoFilter
        :filters="[
          { name: 'All', data: () => All },
          { name: 'Completed', data: () => Completed },
          { name: 'Not completed', data: () => NotCompleted },
        ]"
        @setFilter="setFilterFunc"
      />
    </div>
    <div class="todos__list" v-if="notEmpty">
      <TodoItem
        v-for="(data, index) in filterFunc?.() || []"
        :todo="{ data, index: index + 1 }"
        :key="data.id"
        @toggle="toggleTodo"
        @remove="removeTodo"
        class="todos__todo"
      />
    </div>
    <h4 class="h4 h4_theme_fancy todos__message-on-empty" v-else>
      There are no todos!
    </h4>
  </div>
</template>

<style lang="scss">
.todos {
  display: flex;
  flex-direction: column;
  gap: var(--offset-md);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--offset-md) var(--offset-xl);
    flex-wrap: wrap;
    margin-bottom: var(--offset-md);
  }

  &__list {
    display: contents;
  }

  &__title {
    margin-bottom: var(--offset-lg);
    text-transform: uppercase;
  }

  &__form {
  }

  &__todo {
  }

  &__message-on-empty {
    margin: 3em auto;
    max-width: fit-content;
    letter-spacing: 0.1em;
    word-spacing: 0.3em;
    text-align: center;
    text-transform: uppercase;
  }

  @media (max-width: $bp-sm) {
    &__form {
      flex-grow: 1;
    }
  }

  @media (min-width: $bp-sm) {
  }
}
</style>
