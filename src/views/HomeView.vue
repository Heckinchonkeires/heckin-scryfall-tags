<template>
  <div>
    <CardNameInput />
    <SubmitButton
      @submit-btn-click="submitBtnClick"
      :text="'submit'"
      :color="'lightblue'"
    />
    <RandomButton
      @random-btn-click="randomBtnClick"
      :text="'random'"
      :color="'purple'"
    />
    <div class="mana-symbols">
      <ManaSymbolButton
        v-for="symbol in this.$store.state.manaSymbols"
        :key="symbol.id"
        :id="symbol.id"
        :symbolSrc="symbol.src"
        :symbolName="symbol.name"
      />
    </div>
    <div>
      <img :src="this.$store.state.cardDisplay" alt="" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ManaSymbolButton from "@/components/ManaSymbolButton.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import CardNameInput from "@/components/CardNameInput.vue";
import RandomButton from "@/components/RandomButton.vue";

export default {
  name: "HomeView",
  components: {
    ManaSymbolButton,
    SubmitButton,
    CardNameInput,
    RandomButton,
  },
  methods: {
    submitBtnClick() {
      this.$store.dispatch("getCard", this.$store.state.cardName);
    },
    randomBtnClick() {
      this.$store.dispatch("setRandomCard");
    },
  },
};
</script>
