import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import DeckList from "./components/DeckList";
import NewDeck from "./components/NewDeck";
import {
  createBottomTabNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import reducer from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

const router = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks"
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "New Deck"
    }
  }
};

const navigationOptions = {
  navigationOptions: {
    header: null,
    headerBackTitle: null
  },
  tabBarOptions: {
    style: {
      height: 56,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(router, navigationOptions)
    : createMaterialTopTabNavigator(router, navigationOptions);

const MainNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Tabs
    }
  })
);

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
