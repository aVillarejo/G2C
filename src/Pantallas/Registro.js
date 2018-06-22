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
import { Button } from "react-native-elements";
import ServerURL from "../Config/ServerURL";

export default class Register extends Component {
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

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    await AsyncStorage.setItem("id", this.state.id);
    await AsyncStorage.setItem("nombre", this.state.nombre);
    await AsyncStorage.setItem("telefono", this.state.telefono);
    await AsyncStorage.setItem("correo", this.state.correo);
    await AsyncStorage.setItem("pass", this.state.pass);
    this.props.navigation.navigate("App");
  };

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
            this.setState({ id: responseJsonFromServer.id });
            Alert.alert(
              "Registro Exitoso ",
              "Bievenido " + this.state.id + " : " + this.state.nombre + ".",
              [
                {
                  text: "OK",
                  onPress: this._signInAsync
                  // onPress: () => {
                  //   this.props.navigation.navigate("DrawerNavigator", {
                  //     id: responseJsonFromServer.id
                  //   });
                  // }
                }
              ],
              { cancelable: false }
            );
          }
          this.setState({ ActivityIndicator_Loading: false });
        })
        .catch(error => {
          console.error(error);
          this.setState({ ActivityIndicator_Loading: false });
        });
    });
  };

  validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  Procesar_Registro = () => {
    if (
      this.state.correo &&
      this.state.nombre &&
      this.state.telefono &&
      this.state.pass &&
      this.state.pass2
    ) {
      let email_prueba = this.state.correo;
      if (this.validar_email(email_prueba)) {
        //alert("El email es correcto");
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
      } else {
        alert("El email no es valido");
      }
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  static navigationOptions = {
    title: "Nueva Cuenta",
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
            <TextInput
              placeholder="Nombre"
              placeholderTextColor="#FFF"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              maxLength={50}
              onChangeText={TextInputText =>
                this.setState({ nombre: TextInputText })
              }
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField("telefono");
              }}
              returnKeyType={"next"}
              blurOnSubmit={false}
              ref={input => {
                this.inputs["nombre"] = input;
              }}
            />
            <TextInput
              placeholder="Telefono"
              placeholderTextColor="#FFF"
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              maxLength={10}
              onChangeText={TextInputText =>
                this.setState({ telefono: TextInputText })
              }
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField("email");
              }}
              returnKeyType={"send"}
              blurOnSubmit={false}
              ref={input => {
                this.inputs["telefono"] = input;
              }}
            />
            <TextInput
              placeholder="email"
              placeholderTextColor="#FFF"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              maxLength={50}
              onChangeText={TextInputText =>
                this.setState({ correo: TextInputText })
              }
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField("pass1");
              }}
              returnKeyType={"next"}
              blurOnSubmit={false}
              ref={input => {
                this.inputs["email"] = input;
              }}
            />
            <TextInput
              secureTextEntry
              clearTextOnFocus
              placeholder="Contraseña"
              placeholderTextColor="#FFF"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              maxLength={50}
              onChangeText={TextInputText =>
                this.setState({ pass: TextInputText })
              }
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField("pass2");
              }}
              returnKeyType={"next"}
              blurOnSubmit={false}
              ref={input => {
                this.inputs["pass1"] = input;
              }}
            />
            <TextInput
              secureTextEntry
              clearTextOnFocus
              placeholder="Confirmar Contraseña"
              placeholderTextColor="#FFF"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              maxLength={50}
              blurOnSubmit={true}
              returnKeyType={"done"}
              ref={input => {
                this.inputs["pass2"] = input;
              }}
              onChangeText={TextInputText =>
                this.setState({
                  pass2: TextInputText
                })
              }
            />
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
