import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { white, blue, lightGray, darkBlue, orange } from "../utils/colors";
import { addCard } from "../actions/index";
import { addCardToDeck } from "../utils/api";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  );
}

class NewQuestion extends Component {
  state = {
    questionText: "",
    questionAnswer: "",
    questionIsTrue: null,
    buttonOneStateColor: blue,
    buttonTwoStateColor: blue
  };

  submit = () => {
    const { title } = this.props.navigation.state.params;
    const { questionText, questionAnswer, questionIsTrue } = this.state;
    const cardEntry = {
      question: questionText,
      answer: questionAnswer,
      isTrue: questionIsTrue
    };

    this.props.dispatch(addCard(title, cardEntry));

    this.setState(() => ({
      questionText: "",
      questionAnswer: "",
      questionIsTrue: null,
      buttonOneStateColor: blue,
      buttonTwoStateColor: blue
    }));

    addCardToDeck(title, cardEntry);
  };

  toggleButtonColorState = (answer = false) => {
    answer
      ? this.setState({
          buttonOneStateColor: orange,
          buttonTwoStateColor: blue,
          questionIsTrue: true
        })
      : this.setState({
          buttonTwoStateColor: orange,
          buttonOneStateColor: blue,
          questionIsTrue: false
        });
  };

  handleChange = (fieldId, text) => {
    console.log(fieldId, text);
    if (fieldId == 1) this.setState({ questionText: text });
    if (fieldId == 2) this.setState({ questionAnswer: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Your Question"
            value={this.state.questionText}
            onChangeText={text => this.handleChange(1, text)}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Enter The Answer"
            value={this.state.questionAnswer}
            onChangeText={text => this.handleChange(2, text)}
          />

          <View style={styles.containerTwo}>
            <TouchableOpacity
              onPress={() => this.toggleButtonColorState(true)}
              style={[
                Platform.OS === "ios"
                  ? styles.iosSubmitBtn
                  : styles.androidSubmitBtn,
                { backgroundColor: this.state.buttonOneStateColor }
              ]}
            >
              <Text style={styles.submitBtnText}>True</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.toggleButtonColorState()}
              style={[
                Platform.OS === "ios"
                  ? styles.iosSubmitBtn
                  : styles.androidSubmitBtn,
                { backgroundColor: this.state.buttonTwoStateColor }
              ]}
            >
              <Text style={styles.submitBtnText}>False</Text>
            </TouchableOpacity>
          </View>

          <SubmitBtn onPress={this.submit} />
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
  container: {
    flex: Platform.OS === "ios" ? null : 1,
    flexDirection: "column",
    backgroundColor: Platform.OS === "ios" ? white : lightGray
  },
  containerTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30
  },
  iosSubmitBtn: {
    backgroundColor: darkBlue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: darkBlue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center"
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

export default connect()(NewQuestion);
