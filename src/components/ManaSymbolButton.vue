<template>
  <img
    @click="onClick()"
    :src="require(`../assets/${symbolName}`)"
    alt="A mana symbol"
    :class="btnActive ? '' : 'inactive'"
  />
</template>

<script>
export default {
  name: "ManaSymbolButton",
  props: {
    symbolName: String,
    active: Boolean,
  },
  data() {
    return {
      btnActive: false,
    };
  },
  methods: {
    onClick() {
      this.$emit("mana-symbol-click");
      this.btnActive = !this.btnActive;
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}

.inactive {
  opacity: 50%;
}
</style>
