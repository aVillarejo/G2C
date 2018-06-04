import React, { Component } from "react";
import { StyleSheet, Text, View, Button, AsyncStorage } from "react-native";

export default class AdminHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      telefono: "",
      correo: "",
      pass: "",
      tipo: ""
    };
    try {
      AsyncStorage.getItem("id").then(value => {
        this.setState({ id: value });
      });
      AsyncStorage.getItem("nombre").then(value => {
        this.setState({ nombre: value });
      });
      AsyncStorage.getItem("correo").then(value => {
        this.setState({ correo: value });
      });
      AsyncStorage.getItem("pass").then(value => {
        this.setState({ pass: value });
      });
      AsyncStorage.getItem("tipo").then(value => {
        this.setState({ tipo: value });
      });
      AsyncStorage.getItem("telefono").then(value => {
        this.setState({ telefono: value });
      });
    } catch (err) {
      console.warn(err);
    }
  }

  static navigationOptions = { headerTitle: "Mis Datos" };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.Container}>
        <Text>Datos</Text>
        <Text>id: {this.state.id}</Text>
        <Text>nombre: {this.state.nombre}</Text>
        <Text>correo: {this.state.correo}</Text>
        <Text>telefono: {this.state.telefono}</Text>
        <Text>pass: {this.state.pass}</Text>
        <Text>tipo: {this.state.tipo}</Text>
        <Text>AdminHomeScreen</Text>
        <Button title="Cerrar Sesion" onPress={this._signOutAsync} />
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
