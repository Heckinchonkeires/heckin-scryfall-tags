<template>
  <button
    @click="onClick()"
    :style="{ background: color }"
    :class="isActive ? '' : 'disabled'"
  >
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
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    onClick() {
      if (this.isActive) {
        this.$emit("submit-card-name");
        this.isActive = false;
        setTimeout(() => {
          this.isActive = true;
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
