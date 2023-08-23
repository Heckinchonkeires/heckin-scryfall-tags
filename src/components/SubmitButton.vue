<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$emit("submit-btn-click");
    },
  },
};
</script>
