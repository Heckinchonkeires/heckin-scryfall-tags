<template>
  <div class="home">
    <ManaSymbolButton
      v-for="symbol in this.$store.state.manaSymbols"
      :key="symbol.id"
      :id="symbol.id"
      :symbolSrc="symbol.src"
      :symbolName="symbol.name"
    />
  </div>
  <SubmitButton
    @submit-btn-click="submitBtnClick"
    :text="'submit'"
    :color="'lightblue'"
  />
  <div>
    <img :src="this.$store.state.randomCard" alt="" />
  </div>
</template>

<script>
// @ is an alias to /src
import ManaSymbolButton from "@/components/ManaSymbolButton.vue";
import SubmitButton from "@/components/SubmitButton.vue";

export default {
  name: "HomeView",
  components: {
    ManaSymbolButton,
    SubmitButton,
  },
  methods: {
    submitBtnClick() {
      this.$store.dispatch("setRandomCard");
    },
  },
};
</script>
