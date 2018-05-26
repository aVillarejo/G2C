import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
  TextInput
} from "react-native";

import { Button } from "react-native-elements";

export default class LoginForm extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keycontainer}>
        <TextInput
          placeholder="Username or email"
          placeholderTextColor="#FFF"
          returnKeyType="next"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#FFF"
          secureTextEntry
          autoCorrect={false}
          returnKeyType="done"
          ref={input => (this.passwordInput = input)}
          style={styles.input}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keycontainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    minWidth: 300,
    flexWrap: "wrap",
    height: 50,
    backgroundColor: "rgba(148,114,146,0.8)",
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 10
  },
  buttonContainer: {
    // backgroundColor: "#1980b9",
    backgroundColor: "rgb(90,61,123)",
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 20
  },
  loginbutton: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "700"
  }
});
