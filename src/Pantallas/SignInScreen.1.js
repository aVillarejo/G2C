import React from "react";
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { StackNavigator, SwitchNavigator } from "react-navigation"; // Version can be specified in package.json

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "29",
      nombre: "Alfredo",
      telefono: "12321321",
      correo: "a.villarejo19@gmail.com",
      pass: "12345",
      tipo: "0"
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login!" onPress={this._signInAsync} />

        <View style={{ justifyContent: "flex-end" }}>
          <Button
            title="Registro"
            onPress={() => this.props.navigation.navigate("Registro")}
          />
        </View>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    await AsyncStorage.setItem("id", this.state.id);
    await AsyncStorage.setItem("nombre", this.state.nombre);
    await AsyncStorage.setItem("telefono", this.state.telefono);
    await AsyncStorage.setItem("correo", this.state.correo);
    await AsyncStorage.setItem("pass", this.state.pass);
    //this.props.navigation.navigate('App');
    //this.props.navigation.navigate(this.state.tipo>0 ?'Admin':'App');
    this.props.navigation.navigate(this.state.tipo > 0 ? "Admin" : "Home");
  };
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
