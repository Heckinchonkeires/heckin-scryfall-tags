<template>
  <div>
    <input v-model="cardName" placeholder="Enter a card name" type="text" />
  </div>
</template>

<script>
export default {
  computed: {
    cardName: {
      get() {
        return this.$store.state.cardName;
      },
      set(newValue) {
        this.$store.dispatch("setCardName", newValue);
      },
    },
  },
};
</script>
