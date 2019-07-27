import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { white, blue } from "../utils/colors";

function ActionButton({ onPress, actionText }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
    >
      <Text style={styles.submitBtnText}>{actionText}</Text>
    </TouchableOpacity>
  );
}

class QuizView extends Component {
  state = {
    viewAnswer: false,
    questionIndex: 0,
    numCorrect: null,
    numIncorrect: null
  };

  recordResponse = responseId => {
    if (responseId == 0)
      this.setState(({ viewAnswer }) => ({ viewAnswer: !viewAnswer }));
  };

  render() {
    const { deck } = this.props.navigation.state.params;
    const { questionIndex, viewAnswer } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {!viewAnswer && (
            <Text style={styles.text}>
              {deck.questions[questionIndex].question}
            </Text>
          )}

          {viewAnswer && ( 
            <Text style={styles.text}>
              {deck.questions[questionIndex].answer}
            </Text>
          )}

          <ActionButton
            onPress={() => this.recordResponse(0)}
            actionText={viewAnswer ? "Question" : "Answer"}
          />
          <ActionButton
            onPress={() => this.recordResponse(1)}
            actionText="Correct"
          />
          <ActionButton
            onPress={() => this.recordResponse(2)}
            actionText="Incorrect"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: white,
    borderRadius: 16,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 27,
    padding: 30,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  text: {
    marginBottom: 5,
    fontSize: 25
  },
  container: {
    flex: Platform.OS === "ios" ? null : 1,
    flexDirection: "column",
    backgroundColor: Platform.OS === "ios" ? white : lightGray
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  inputField: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 35,
    paddingLeft: 20,
    alignSelf: "stretch",
    borderRadius: Platform.OS === "ios" ? 16 : 2
  }
});

export default connect()(QuizView);
