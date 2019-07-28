import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { white, blue, lightGray } from "../utils/colors";
import { addDeck } from "../actions/index";
import { saveDeckTitle } from "../utils/api";

class NewDeck extends Component {
  state = {
    deckTitle: ""
  };

  handleChange = text => {
    this.setState({ deckTitle: text });
  };

  renderDeckProfile(deckTitle) {
    const navigation = this.props.navigation;
    navigation.navigate("IndividualDeck", {
      title: deckTitle
    });
  }

  submitDeck = () => {
    const { dispatch } = this.props;
    const { deckTitle } = this.state;
    dispatch(addDeck(deckTitle));

    this.setState(({ deckTitle }) => ({
      deckTitle: ""
    }));

    saveDeckTitle(deckTitle);
    this.renderDeckProfile(deckTitle);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>What is the title of your new deck</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Your Title"
            value={this.state.deckTitle}
            onChangeText={this.handleChange}
          />
          <TouchableOpacity
            onPress={this.submitDeck}
            style={
              Platform.OS === "ios"
                ? styles.iosSubmitBtn
                : styles.androidSubmitBtn
            }
          >
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === "ios" ? white : lightGray,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15
  },
  card: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: white,
    borderRadius: 16,
    padding: 20,
    marginTop: 50,
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
    marginBottom: 25,
    fontSize: 25
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    marginTop: 40,
    alignSelf: "center",
    justifyContent: "center"
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

export default connect()(NewDeck);
