import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { white } from "../utils/colors";

class DeckList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Deck List View</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: white,
    padding: 15
  }
});

export default DeckList;
