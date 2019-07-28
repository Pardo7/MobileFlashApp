import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { white, blue } from "../utils/colors";

function IndividualDeck(props) {
  const { deck, navigation } = props;

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{deck.title}</Text>
      <Text>{deck.questions.length} cards</Text>

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewQuestion", {
              title: deck.title
            });
          }}
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
        >
          <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (deck.questions.length == 0) return;

            navigation.navigate("QuizView", { deck });
          }}
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
        >
          <Text style={styles.submitBtnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 5,
    fontSize: 25
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40
  },
  androidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    marginTop: 40,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
});

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params;
  return {
    deck: decks[title],
    navigation
  };
}

export default connect(mapStateToProps)(IndividualDeck);
