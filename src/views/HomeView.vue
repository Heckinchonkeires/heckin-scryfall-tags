<template>
  <div class="home">
    <ManaSymbolButton
      v-for="symbol in manaSymbols"
      :key="symbol.id"
      :symbolName="symbol.src"
    />
  </div>
  <SubmitButton
    @submit-btn-click="submitBtnClick"
    :text="'submit'"
    :color="'lightblue'"
  />
  <img :src="randomCard" alt="" />
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
  data() {
    return {
      manaSymbols: [
        {
          id: 1,
          src: "W.png",
          name: "white",
        },
        {
          id: 2,
          src: "U.png",
          name: "white",
        },
        {
          id: 3,
          src: "B.png",
          name: "white",
        },
        {
          id: 4,
          src: "R.png",
          name: "white",
        },
        {
          id: 5,
          src: "G.png",
          name: "white",
        },
        {
          id: 6,
          src: "C.png",
          name: "white",
        },
      ],
      randomCard: null,
    };
  },
  methods: {
    async submitBtnClick() {
      const res = await fetch(
        "https://api.scryfall.com/cards/random?pretty=true"
      );
      const data = await res.json();
      this.randomCard = data.image_uris.small;
    },
  },
};
</script>
