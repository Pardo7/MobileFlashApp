import React, { Component } from "react";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { white, lightGray } from "../utils/colors";
import { getDecks } from "../utils/api";

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  renderDeck = (deck, title) => (
    <View key={title}>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("IndividualDeck", {
            deck: deck,
            title: title
          });
        }}
      >
        <View style={styles.card}>
          <Text style={styles.text}>{title}</Text>
          <Text>{deck.questions.length} cards</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deckTitle =>
          this.renderDeck(decks[deckTitle], deckTitle)
        )}
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
  },
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
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
