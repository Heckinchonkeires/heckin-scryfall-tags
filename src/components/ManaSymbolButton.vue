<template>
  <img
    @click="onClick()"
    :src="require(`../assets/${symbolSrc}`)"
    :alt="`A ${symbolName} mana symbol`"
    :class="btnActive ? '' : 'inactive'"
  />
</template>

<script>
export default {
  name: "ManaSymbolButton",
  props: {
    symbolSrc: String,
    symbolName: String,
    id: Number,
  },
  data() {
    return {
      arrayId: this.id,
    };
  },
  methods: {
    onClick() {
      this.$emit("mana-symbol-click");
      this.$store.commit("toggleBtn", this.arrayId);
    },
  },
  computed: {
    btnActive: {
      get() {
        return this.$store.state.manaSymbols[this.arrayId - 1].isActive;
      },
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
