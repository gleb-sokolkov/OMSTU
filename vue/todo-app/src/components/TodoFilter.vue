<script>
export default {
  props: {
    filters: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    setCurrentIndex(index) {
      this.currentIndex = index;
    }
  },
};
</script>

<template>
  <div class="todo-filter">
    <button
      v-for="(item, index) in filters"
      :class="`btn ${currentIndex === index ? 'btn_active' : '' } todo-filter__btn`"
      :key="item.name"
      @click="$emit('setFilter', item.data); setCurrentIndex(index);"
    >
      {{ item.name }}
    </button>
  </div>
</template>

<style lang="scss">
.todo-filter {
  display: flex;
  gap: var(--offset-sm);
  font-size: 0.8rem;

  &__btn {
  }
}
</style>
