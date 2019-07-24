import React, { Component } from "react";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { View, Text, StyleSheet, Platform } from "react-native";
import { white, lightGray } from "../utils/colors";
import { getDecks } from "../utils/api";
import IndividualDeck from "./IndividualDeck";

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  render() {
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deckTitle => (
          <IndividualDeck deck={decks[deckTitle]} key={deckTitle} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: Platform.OS === "ios" ? null : 1,
    flexDirection: "column",
    backgroundColor: Platform.OS === "ios" ? white : lightGray,
    marginTop: Platform.OS === "ios" ? 20 : 0,
    marginLeft: Platform.OS === "ios" ? 30 : 0,
    marginRight: Platform.OS === "ios" ? 30 : 0,
    padding: 15
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
