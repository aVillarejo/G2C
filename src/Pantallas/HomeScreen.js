import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";
import { StackNavigator, SwitchNavigator } from "react-navigation"; // Version can be specified in package.json

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      telefono: "",
      correo: "",
      pass: ""
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

  static navigationOptions = {
    title: "Servicios"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Mi Perfil"
          onPress={() => this.props.navigation.navigate("Perfil")}
        />

        <Button title="Ir a Detalles" onPress={this._showMoreApp} />
        <Button title="Cerrar Sesion" onPress={this._signOutAsync} />
      </View>
    );
  }
  _showMoreApp = () => {
    this.props.navigation.navigate("DetallesServicio");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
