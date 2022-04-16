<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
    },
    buttonName: {
      type: String,
      required: false,
    },
    callback: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    clearInput() {
      this.title = "";
    },
  },
  computed: {
    checkNull() {
      return this.title === "";
    },
  },
};
</script>

<template>
  <div class="input-group">
    <input
      class="input"
      type="text"
      :placeholder="placeholder"
      v-model="title"
    />
    <button
      @click.prevent="
        callback(title);
        clearInput();
      "
      class="btn"
      type="submit"
      :disabled="checkNull"
    >
      {{ buttonName }}
    </button>
  </div>
</template>
