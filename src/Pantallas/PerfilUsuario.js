import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import {
  Container,
  Item,
  Input,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";

export default class PerfilUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = { id: "", nombre: "a", telefono: "", correo: "", pass: "" };
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

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: " Mis Datos",
      headerStyle: { backgroundColor: "rgba(92, 61,123, 0.9)" },
      headerTintColor: "#fff",
      headerRight: (
        <Button
          transparent
          light
          iconLeft
          style={styles.btn}
          onPress={navigation.getParam("NuevoServicio")}
        >
          <Icon name="ios-log-out-outline" />
        </Button>
      )
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ NuevoServicio: this._signOutAsync });
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.Container}>
      <StatusBar
          barStyle="light-content"
          backgroundColor="#rgba(92, 61,123, 0.9)"
        />
        <Text>Datos</Text>
        <Text>id: {this.state.id}</Text>
        <Text>nombre: {this.state.nombre}</Text>
        <Text>correo: {this.state.correo}</Text>
        <Text>telefono: {this.state.telefono}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bold: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(90,61,123)",
    alignSelf: "center",
    justifyContent: "center"
  },
  btn: {
    //backgroundColor: "rgba(92, 61,123, 0.9)",

    //justifyContent: "center"
    // width: 300,
    // height: 40,
    // borderColor: "transparent",
    // borderWidth: 0,
    // borderRadius: 5
    flex: 1,
    paddingRight: 12
  }
});
