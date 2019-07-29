import { AsyncStorage } from "react-native";

export const DECK_STORAGE_KEY = "MobileFlashApp:deck";

function setDummyData() {
  let dummyData = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces",
          isTrue: true
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event",
          isTrue: true
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared.",
          isTrue: true
        }
      ]
    }
  };

  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

export function fetchDeckResults(results) {
  return results === null ? setDummyData() : JSON.parse(results);
}
