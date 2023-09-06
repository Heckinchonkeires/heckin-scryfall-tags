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
    foundCards: [],
    currentTags: [],
    currentCardData: null,
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
    setCurrentCardData(state, data) {
      state.currentCardData = data;
    },
    addCards(state, cards) {
      state.foundCards = [];
      for (let i = 0; i < 10; i++) {
        state.foundCards.push(cards[i]);
      }
      // cards.forEach((card) => {
      //   state.foundCards.push(card);
      // });
    },
    addTags(state, tags) {
      state.currentTags = [];
      tags.forEach((tag) => {
        state.currentTags.push(tag);
      });
    },
  },
  actions: {
    setRandomCard({ commit, state }) {
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
      CardService.getRandom(colors)
        .then((res) => {
          commit("setCurrentCardData", res);
          commit("setCardDisplay", res.image_uris.small);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setCardName({ commit }, newValue) {
      commit("setCardName", newValue);
    },
    async getCardByName({ commit, dispatch, state }, cardName) {
      if (cardName === null) {
        alert("Please input a card name");
        return;
      }
      const card = await CardService.getByName(cardName);
      const symbolsArray = JSON.parse(JSON.stringify(state.manaSymbols));
      if (card.color_identity.length === 0) {
        symbolsArray.forEach((symbol, index) => {
          if (symbol.shortName === "C") {
            commit("setBtn", { id: index, isActive: true });
          } else {
            commit("setBtn", { id: index, isActive: false });
          }
        });
      } else {
        symbolsArray.forEach((symbol, index) => {
          if (card.color_identity.includes(symbol.shortName)) {
            commit("setBtn", { id: index, isActive: true });
          } else {
            commit("setBtn", { id: index, isActive: false });
          }
        });
      }
      commit("setCardDisplay", card.image_uris.small);
      await dispatch("updateCurrentCardData", card);
      await dispatch("getCardTags", {
        set: state.currentCardData.set,
        number: state.currentCardData.collector_number,
      });
      dispatch("getCardsByTags", state.currentTags);
    },
    updateCurrentCardData({ commit }, data) {
      commit("setCurrentCardData", data);
    },
    async getCardTags({ commit }, { set, number }) {
      const tags = await CardService.getTags(set, number);
      commit("addTags", tags.tags);
    },
    async getCardsByTags({ commit }, tags) {
      const cards = await CardService.getByTags(tags);
      commit("addCards", cards.data);
    },
  },
  modules: {},
});
