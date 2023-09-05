import { createStore } from "vuex";
import CardService from "@/CardService";

export default createStore({
  state: {
    manaSymbols: [
      {
        id: 0,
        src: "W.png",
        name: "white",
        shortName: "W",
        isActive: false,
      },
      {
        id: 1,
        src: "U.png",
        name: "blue",
        shortName: "U",
        isActive: false,
      },
      {
        id: 2,
        src: "B.png",
        name: "black",
        shortName: "B",
        isActive: false,
      },
      {
        id: 3,
        src: "R.png",
        name: "red",
        shortName: "R",
        isActive: false,
      },
      {
        id: 4,
        src: "G.png",
        name: "green",
        shortName: "G",
        isActive: false,
      },
      {
        id: 5,
        src: "C.png",
        name: "colorless",
        shortName: "C",
        isActive: false,
      },
    ],
    cardDisplay: null,
    cardName: null,
  },
  getters: {},
  mutations: {
    toggleBtn(state, id) {
      state.manaSymbols[id].isActive = !state.manaSymbols[id].isActive;
    },
    setBtn(state, { id, isActive }) {
      state.manaSymbols[id].isActive = isActive;
    },
    setCardDisplay(state, newCard) {
      state.cardDisplay = newCard;
    },
    setCardName(state, newValue) {
      state.cardName = newValue;
    },
  },
  actions: {
    setRandomCard({ commit, state }) {
      // let queryString = "?q=f%3Acommander%20commander%3A";
      let colors = "";
      let countActive = 0;
      const symbolsArray = JSON.parse(JSON.stringify(state.manaSymbols));
      symbolsArray.forEach((symbol) => {
        if (symbol.isActive) {
          colors += symbol.shortName;
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
      // fetch(`https://api.scryfall.com/cards/random${queryString}`)
      //   .then((res) => {
      //     if (!res.ok) {
      //       throw new Error("Network error");
      //     }
      //     return res.json();
      //   })
      //   .then((res) => {
      //     commit("setCardDisplay", res.image_uris.small);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      CardService.getRandom(colors)
        // .then((res) => {
        //   // if (!res.ok) {
        //   //   throw new Error("Network error");
        //   // }
        //   return res.json();
        // })
        .then((res) => {
          commit("setCardDisplay", res.image_uris.small);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setCardName({ commit }, newValue) {
      commit("setCardName", newValue);
    },
    getCard({ commit, state }, cardName) {
      if (cardName === null) {
        alert("Please input a card name");
        return;
      }
      CardService.getByName(cardName)
        .then((res) => {
          const symbolsArray = JSON.parse(JSON.stringify(state.manaSymbols));
          //there's probably a cleaner way to do this
          if (res.color_identity.length === 0) {
            symbolsArray.forEach((symbol, index) => {
              if (symbol.shortName === "C") {
                commit("setBtn", { id: index, isActive: true });
              } else {
                commit("setBtn", { id: index, isActive: false });
              }
            });
          } else {
            symbolsArray.forEach((symbol, index) => {
              if (res.color_identity.includes(symbol.shortName)) {
                commit("setBtn", { id: index, isActive: true });
              } else {
                commit("setBtn", { id: index, isActive: false });
              }
            });
          }
          commit("setCardDisplay", res.image_uris.small);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  modules: {},
});
