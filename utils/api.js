import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY, fetchDeckResults } from "./_deck";

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(fetchDeckResults);
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(fetchDeckResults)
    .then(decks => decks[id]);
}

export function saveDeckTitle(title) {}

export function addCardToDeck(title, card) {
  return getDeck(title).then(deckResults => {
    const updatedDeck = {
      ...deckResults,
      questions: [deckResults.questions, card]
    };

    AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [title]: updatedDeck
      })
    );
  });
}
