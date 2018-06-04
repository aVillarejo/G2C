import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class ServiciosDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Container}>
        <Text>ServiciosDetails</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
