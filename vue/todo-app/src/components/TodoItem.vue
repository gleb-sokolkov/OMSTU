<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      deleted: false,
    };
  },
  methods: {
    setDeleted(value) {
      this.deleted = value;
    },
  },
};
</script>

<template>
  <div
    :class="`todo card card_b_md card_sh_sm ${deleted ? 'todo_deleted' : ''}`"
  >
    <div class="todo__check-container">
      <input
        class="checkbox todo__checkbox"
        type="checkbox"
        :id="`checkbox-${todo.index}`"
        :checked="todo.data.completed"
        @click="$emit('toggle', todo.data.id)"
      />
      <label class="todo__num" :for="`checkbox-${todo.index}`">
        {{ todo.index }}
      </label>
    </div>
    <div class="todo__title-container">
      <span
        :class="`todo__title ${
          todo.data.completed ? 'todo__title_checked' : ''
        }`"
      >
        {{ todo.data.title }}
      </span>
    </div>
    <div class="todo__actions-container">
      <button
        class="btn todo__btn"
        type="button"
        @click="
          setDeleted(true);
          $emit('remove', todo.data.id);
        "
      >
        &times;
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/blocks";

.todo {
  display: flex;
  gap: var(--offset-md);
  align-items: stretch;

  padding: var(--offset-md) 0;
  padding-left: var(--offset-lg);

  &::after {
    @extend .opacity-0;

    content: "";
    position: absolute;
    inset: 0px;
    border-radius: inherit;
    z-index: 1;
    @extend .lines, .lines_size_sm, .lines_rot_m45, .lines_theme_red;
  }

  &_deleted::after {
    --opacity-val: 0.5;
    @extend .opacity-val;
  }

  &__check-container {
    display: flex;
    align-items: center;
    border-right: var(--border-secondary);
    flex: 0 0 3rem;
  }

  &__checkbox {
    margin-right: var(--offset-sm);
  }

  &__num {
  }

  &__title {
    &_checked {
      text-decoration: line-through;
    }
  }

  &__title-container {
    flex: 1 1 auto;
    word-break: break-word;
  }

  &__actions-container {
    margin: calc(var(--offset-md) * -1) 0;
  }

  &__btn {
    width: 3rem;
    min-height: 3rem;
    height: 100%;
    font-weight: 700;
    box-shadow: var(--b-shadow-sm);
    margin: calc(var(--offset) * -1) 0 0 calc(var(--offset) * -1);
    z-index: 2;
  }
}
</style>
