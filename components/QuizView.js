import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import FlipCard from "react-native-flip-card";
import { white, blue, lightGray } from "../utils/colors";

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
    flip: false,
    questionIndex: 0,
    numCorrect: 0,
    renderStats: false
  };

  goHome = title => {
    this.props.navigation.navigate("IndividualDeck", {
      title: title
    });
  };

  restartQuiz = () => {
    this.setState(() => ({
      questionIndex: 0,
      numCorrect: 0,
      renderStats: false
    }));
  };

  computeAnswer = answer => {
    const { deck } = this.props.navigation.state.params;
    const { questionIndex } = this.state;

    if (answer == deck.questions[questionIndex].isTrue)
      this.setState(({ numCorrect }) => ({ numCorrect: ++numCorrect }));
  };

  computeCardIndex = deck => {
    const nextIndex = this.state.questionIndex + 1;

    this.setState(({ questionIndex }) => ({
      questionIndex:
        nextIndex !== deck.questions.length ? nextIndex : questionIndex,
      renderStats: nextIndex == deck.questions.length ? true : false
    }));
  };

  toggleAnswer = () => {
    this.setState(({ viewAnswer, flip }) => ({
      viewAnswer: !viewAnswer,
      flip: !flip
    }));
  };

  recordResponse = responseId => {
    if (responseId == 1 || responseId == 2) {
      const { deck } = this.props.navigation.state.params;
      const answer = responseId == 1 ? true : false;
      const toggledAnswer = this.state.viewAnswer;

      if (toggledAnswer) this.toggleAnswer();
      this.computeCardIndex(deck);
      this.computeAnswer(answer);
    }
  };

  renderStatsView = () => {
    const { deck } = this.props.navigation.state.params;
    return (
      <View style={styles.card}>
        <Text>
          You've Answered {this.state.numCorrect} correct out of {""}
          {deck.questions.length}
        </Text>
        <TouchableOpacity
          onPress={() => this.goHome(deck.title)}
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
        >
          <Text style={styles.submitBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.restartQuiz}
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
        >
          <Text style={styles.submitBtnText}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderScore = () => {
    const { deck } = this.props.navigation.state.params;

    return (
      <Text style={styles.cardsLeftText}>
        {this.state.questionIndex + 1} / {deck.questions.length}
      </Text>
    );
  };

  renderActionButtons = viewAnswer => {
    return (
      <Fragment>
        <ActionButton
          onPress={this.toggleAnswer}
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
      </Fragment>
    );
  };

  render() {
    const { deck } = this.props.navigation.state.params;
    const { questionIndex, viewAnswer, renderStats, flip } = this.state;

    return (
      <View style={styles.container}>
        {renderStats ? (
          this.renderStatsView()
        ) : (
          <FlipCard
            friction={10}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={flip}
            clickable={false}
          >
            <View style={styles.card}>
              {this.renderScore()}
              <Text style={styles.text}>
                {deck.questions[questionIndex].question}
              </Text>
              {this.renderActionButtons(viewAnswer)}
            </View>
            <View style={styles.card}>
              {this.renderScore()}
              <Text style={styles.text}>
                {deck.questions[questionIndex].answer}
              </Text>
              {this.renderActionButtons(viewAnswer)}
            </View>
          </FlipCard>
        )}
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
    marginLeft: 30,
    marginRight: 30,
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
  cardsLeftText: {
    alignSelf: "flex-start",
    fontSize: 15
  },
  container: {
    flex: 1,
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

export default QuizView;
