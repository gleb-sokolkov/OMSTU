<script>
import NotNullInput from "@/components/NotNullInput.vue"; 

export default {
  props: {
    addTodo: {
      type: Function,
      required: true,
    }
  },
  components: {
    NotNullInput,
  }
}
</script>

<template>
  <form action="">
    <NotNullInput :callback="addTodo" placeholder="todo..." buttonName="Add"/>
  </form>
</template>
