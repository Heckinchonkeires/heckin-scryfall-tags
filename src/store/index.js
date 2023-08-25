import { createStore } from "vuex";

export default createStore({
  state: {
    manaSymbols: [
      {
        id: 1,
        src: "W.png",
        name: "white",
        shortName: "W",
        isActive: false,
      },
      {
        id: 2,
        src: "U.png",
        name: "blue",
        shortName: "U",
        isActive: false,
      },
      {
        id: 3,
        src: "B.png",
        name: "black",
        shortName: "B",
        isActive: false,
      },
      {
        id: 4,
        src: "R.png",
        name: "red",
        shortName: "R",
        isActive: false,
      },
      {
        id: 5,
        src: "G.png",
        name: "green",
        shortName: "G",
        isActive: false,
      },
      {
        id: 6,
        src: "C.png",
        name: "colorless",
        shortName: "C",
        isActive: false,
      },
    ],
    randomCard: null,
  },
  getters: {},
  mutations: {
    toggleBtn(state, id) {
      state.manaSymbols[id - 1].isActive = !state.manaSymbols[id - 1].isActive;
    },
    setRandomCard(state, newCard) {
      state.randomCard = newCard;
    },
  },
  actions: {
    setRandomCard({ commit, state }) {
      let queryString = "?q=f%3Acommander%20commander%3A";
      let countActive = 0;
      const symbolsArray = JSON.parse(JSON.stringify(state.manaSymbols));
      symbolsArray.forEach((symbol) => {
        if (symbol.isActive) {
          queryString += symbol.shortName;
          countActive++;
        }
      });
      if (countActive === 0) {
        alert("Please select at least one color");
        return;
      }
      if (countActive > 1 && symbolsArray[5].isActive) {
        alert("Colorless may not be included in color combinations");
        return;
      }
      fetch(`https://api.scryfall.com/cards/random${queryString}`)
        .then((res) => res.json())
        .then((res) => {
          commit("setRandomCard", res.image_uris.small);
        });
    },
  },
  modules: {},
});
