import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY, fetchDeckResults } from "./_deck";

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(fetchDeckResults);
}

export function getDeck(id) {}

export function saveDeckTitle(title) {}

export function addCardToDeck(title, card) {}
