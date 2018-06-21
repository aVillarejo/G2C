import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  AsyncStorage,
  StatusBar
} from "react-native";
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";

import ServerURL from "../../Config/ServerURL";

export default class ServicioRegistrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      telefono: "",
      correo: "",
      pass: "",
      pass2: "",
      ActivityIndicator_Loading: false
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField(i) {
    this.inputs[i].focus();
  }

  Insert_Data_Into_MySQL = () => {
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch(`${ServerURL}/Registrar_Usuario.php`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: this.state.nombre,
          telefono: this.state.telefono,
          correo: this.state.correo,
          pass: this.state.pass
        })
      })
        .then(response => response.json())
        .then(responseJsonFromServer => {
          if (responseJsonFromServer.res < 0) {
            Alert.alert(
              "Lo sentimos",
              responseJsonFromServer.msg,
              [
                {
                  text: " OK ",
                  onPress: () => console.log("OK Pressed")
                }
              ],
              { cancelable: false }
            );
          } else {
            this.setState({
              id: responseJsonFromServer.id
            });
            Alert.alert(
              "Registro Exitoso ",
              "Bievenido " + this.state.id + " : " + this.state.nombre + ".",
              [
                {
                  text: "OK",
                  onPress: () => {
                    this.props.navigation.navigate("ServiciosList", {
                      id: responseJsonFromServer.id
                    });
                  }
                }
              ],
              { cancelable: false }
            );
          }
          this.setState({
            ActivityIndicator_Loading: false
          });
        })
        .catch(error => {
          console.error(error);
          this.setState({
            ActivityIndicator_Loading: false
          });
        });
    });
  };

  Procesar_Registro = () => {
    if (this.state.pass != this.state.pass2) {
      Alert.alert(
        "Lo sentimos!",
        "Las contraseñas no coinciden",
        [
          {
            text: "Aceptar",
            onPress: () => console.log("OK Pressed")
          }
        ],
        { cancelable: false }
      );
    } else {
      this.Insert_Data_Into_MySQL();
    }
  };

  static navigationOptions = {
    title: "Neva Cuenta",
    headerStyle: { backgroundColor: "rgba(92, 61,123, 0.9)" },
    headerTintColor: "#fff"
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.mainContainer}
      >
        <View style={styles.mainContainer}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#rgba(92, 61,123, 0.9)"
          />
          <KeyboardAvoidingView behavior="padding" style={styles.FormContainer}>
            <View>
              <FormLabel>Name</FormLabel>
              <FormInput
                onChangeText={TextInputValue =>
                  this.setState({ Nombre: TextInputValue })
                }
              />
            </View>
          </KeyboardAvoidingView>

          <View style={styles.buttonContainer}>
            <Button
              title="REGISTRARME"
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={styles.btn}
              containerStyle={{ marginTop: 0 }}
              onPress={this.Procesar_Registro}
            />
          </View>

          <View style={styles.register}>
            <Text style={styles.registertext}>Al registrarte aceptas los</Text>
            <TouchableOpacity
              onPress={
                //   ()=> navigate('id', {id:this.state.id}) }
                // () => this.props.navigation.navigate('DrawerNavigator')

                () => {
                  console.warn("id:" + this.state.id);
                }
              }
            >
              <Text style={styles.bold}>Terminos y Condiciones</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    backgroundColor: "#FFFAD2"
  },
  FormContainer: {
    flexGrow: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  titleApp: {
    // backgroundColor:'rgb(90,61,123)',
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(90,61,123)",
    width: 200,
    margin: 10,
    alignSelf: "center",
    justifyContent: "center"
  },
  logo: {
    marginTop: 10,
    width: 350,
    height: 200
  },
  register: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  registertext: {
    textAlign: "center",
    fontSize: 18,
    color: "rgb(90,61,123)",
    alignSelf: "center",
    justifyContent: "center"
  },
  bold: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(90,61,123)",
    alignSelf: "center",
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "rgba(92, 61,123, 0.9)",
    width: 300,
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
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
    flexGrow: 1,
    marginTop: 0,
    justifyContent: "center",
    paddingTop: 10
  },
  loginbutton: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "700"
  },
  btn: {
    backgroundColor: "rgba(92, 61,123, 0.9)",
    width: 300,
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});
