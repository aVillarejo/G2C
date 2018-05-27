import React, { Component } from "react";
import LoginForm from "./LoginForm";
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import ServerURL from "../Config/ServerURL";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      telefono: "",
      correo: "",
      pass: "",
      tipo: "",
      ActivityIndicator_Loading: false
    };
  }

  static navigationOptions = { header: null };

  render() {
    if (this.state.ActivityIndicator_Loading) {
      return (
        <View
          style={styles.container}
        >
          <View
            style={styles.container}
          >
            <Text>Cargando</Text>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.logoConten}>
            <Text style={styles.titleApp}>Government App</Text>
            <Image
              style={styles.logo}
              source={{
                uri:
                  "https://cdn.dribbble.com/users/827697/screenshots/2456153/arcos-vallarta.jpg"
              }}
            />
          </View>
          <KeyboardAvoidingView behavior="padding" style={styles.keycontainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#FFF"
              returnKeyType="next"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onSubmitEditing={() => this.passwordInput.focus()}
              style={styles.input}
              onChangeText={TextInputText =>
                this.setState({ correo: TextInputText })
              }
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#FFF"
              secureTextEntry
              autoCorrect={false}
              returnKeyType="done"
              ref={input => (this.passwordInput = input)}
              style={styles.input}
              onChangeText={TextInputText =>
                this.setState({ pass: TextInputText })
              }
            />
          </KeyboardAvoidingView>

          <Button
            title="LOGIN"
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={styles.btn}
            containerStyle={{ marginTop: 0 }}
            onPress={this._Procesar_Login}
          />

          <View style={styles.register}>
            <Text style={styles.registertext}>¿Necesitas una cuenta?</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Registro")}
            >
              <Text style={styles.bold}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    await AsyncStorage.setItem("id", this.state.id);
    await AsyncStorage.setItem("nombre", this.state.nombre);
    await AsyncStorage.setItem("telefono", this.state.telefono);
    await AsyncStorage.setItem("correo", this.state.correo);
    await AsyncStorage.setItem("pass", this.state.pass);
    await AsyncStorage.setItem("tipo", this.state.tipo);

    //this.props.navigation.navigate('App');
    //this.props.navigation.navigate(this.state.tipo>0 ?'Admin':'App');
    this.props.navigation.navigate(this.state.tipo > 0 ? "Admin" : "Home");
  };

  _Procesar_Login = () => {
    if (this.state.pass == "" || this.state.correo == "") {
      Alert.alert(
        "Lo sentimos!",
        "Ambos campos son obligatorios ",
        [
          {
            text: "Aceptar",
            onPress: () => console.log("OK Pressed")
          }
        ],
        { cancelable: false }
      );
    } else {
      this._fetchLogin();
    }
  };

  _fetchLogin = () => {
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch(`${ServerURL}/Iniciar_Sesion.php`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correo: this.state.correo,
          pass: this.state.pass
        })
      })
        .then(response => response.json())
        .then(responseJsonFromServer => {
          if (responseJsonFromServer.result < 0) {
            Alert.alert(
              "Lo sentimos",
              responseJsonFromServer.msg,
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed")
                }
              ],
              { cancelable: false }
            );
          } else {
            this.setState({ id: responseJsonFromServer.Id });
            this.setState({ nombre: responseJsonFromServer.Nombre });
            this.setState({ correo: responseJsonFromServer.Correo });
            this.setState({ pass: responseJsonFromServer.Pass });
            this.setState({ telefono: responseJsonFromServer.Telefono });
            this.setState({ tipo: responseJsonFromServer.Tipo });

            this._signInAsync();
          }
          this.setState({ ActivityIndicator_Loading: false });
        })
        .catch(error => {
          console.error(error);
          this.setState({ ActivityIndicator_Loading: false });
          Alert.alert(
            "Lo sentimos",
            "Ocurrio un problema al conectarse con el servidor",
            [
              {
                text: "OK",
                onPress: () => console.log(error)
              }
            ],
            { cancelable: false }
          );
        });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFAD2",
    paddingBottom: 10
    //  backgroundColor:'rgb(90,61,123)',
  },
  logoConten: {
    flexGrow: 1,
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
    // color :'#ffffff'
  },
  logo: {
    marginTop: 10,
    width: 350,
    height: 200
  },
  register: {
    minHeight: 90,
    alignItems: "center",
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
  keycontainer: {
    flexGrow: 2,
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
