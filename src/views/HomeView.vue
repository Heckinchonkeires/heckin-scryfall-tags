<template>
  <div>
    <CardNameInput @submit-card-name="submitCardName" />
    <SubmitButton
      @submit-card-name="submitCardName"
      :text="'submit'"
      :color="'lightblue'"
    />
    <br />
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
    <!-- <p>{{ this.$store.state.currentCardData }}</p> -->
    <p>{{ this.$store.state.currentTags }}</p>
    <div>
      <img
        v-for="card in this.$store.state.foundCards"
        :key="card.oracle_id"
        :src="card.image_uris.small"
      />
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
    submitCardName() {
      this.$store.dispatch("getCardByName", this.$store.state.cardName);
    },
    randomBtnClick() {
      this.$store.dispatch("setRandomCard");
    },
  },
};
</script>
