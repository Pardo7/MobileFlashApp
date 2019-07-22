import React, { Component } from "react";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { View, Text, StyleSheet } from "react-native";
import { white } from "../utils/colors";
import { getDecks } from "../utils/api";

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  render() {
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        <Text>Deck List View</Text>
        <Text>{JSON.stringify(decks)}</Text>
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

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
