import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { white } from "../utils/colors";

function IndividualDeck(props) {
  const { title, questions } = props.deck;

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{title}</Text>
      <Text>{questions.length} cards</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  text: {
    marginBottom: 5
  }
});

export default IndividualDeck;
