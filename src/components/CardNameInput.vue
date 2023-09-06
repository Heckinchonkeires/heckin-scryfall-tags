<template>
  <div>
    <input
      @keyup.enter="onEnter()"
      v-model="cardName"
      placeholder="Enter a card name"
      type="text"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onEnter() {
      console.log("enter pressed");
      this.$emit("submit-card-name");
    },
  },
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
