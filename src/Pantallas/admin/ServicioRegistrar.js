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

//import Icon from "react-native-vector-icons/FontAwesome";
import {
  Button,
  List,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  FooterTab,
  Footer,
  Picker
} from "native-base";

import ServerURL from "../../Config/ServerURL";

export default class ServicioRegistrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Nombre: null,
      Descripcion: null,
      Costo: null,
      Categoria: null,
      data: [
        {
          Id: "1",
          Nombre: "Educacion",
          Descripcion: "Descripcion"
        }
      ],
      ActivityIndicator_Loading: false
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    //const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=2`;
    const url = `${ServerURL}/categorias/consultar.php`;

    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          //data: page === 1 ? res.results : [...this.state.data, ...res.results],
          isLoading: false,
          data: res ? res : [...this.state.data, ...res],
          error: res.error || null,
          loading: false,
          refreshing: false,
          isLoading2: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  onValueChange(value) {
    this.setState({ Categoria: value });
  }

  focusNextField(i) {
    this.inputs[i].focus();
  }

  Insert_Data_Into_MySQL = () => {
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch(`${ServerURL}/servicios/registrar.php`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Nombre: this.state.Nombre,
          Descripcion: this.state.Descripcion,
          Costo: this.state.Costo,
          Categoria: this.state.Categoria
        })
      })
        .then(response => response.json())
        .then(responseJsonFromServer => {
          if (responseJsonFromServer.Res < 0) {
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
            Alert.alert(
              "Aviso",
              "Registro Exitoso",
              [
                {
                  text: "OK",
                  onPress: () => {
                    this.props.navigation.navigate("ServiciosList");
                  }
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
  Procesar_Registro = () => {
    console.warn(this.state);
    if (
      this.state.Nombre == null ||
      this.state.Descripcion == null ||
      this.state.Costo == null ||
      this.state.Categoria == null
    ) {
      Alert.alert(
        "Lo sentimos!",
        "Todos los campos son obligatorios",
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
    title: "Agregar Servicio",
    headerStyle: { backgroundColor: "rgba(92, 61,123, 0.9)" },
    headerTintColor: "#fff"
  };

  render() {
    return (
      // <Container style={styles.mainContainer}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.mainContainer}
      >
        <View style={styles.mainContainer}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#rgba(92, 61,123, 0.9)"
          />
          <Container>
            <Form>
              <Item floatingLabel>
                <Icon active name="md-bookmarks" />
                <Label>Nombre</Label>
                <Input
                  returnKeyType={"next"}
                  autoFocus={true}
                  onSubmitEditing={event => {
                    this._inputDesc._root.focus();
                  }}
                  onChangeText={txtNom =>
                    this.setState({
                      Nombre: txtNom
                    })
                  }
                  value={this.state.Nombre}
                />
              </Item>
              <Item floatingLabel>
                <Icon active name="md-create" />

                <Label>Descripcion</Label>
                <Input
                  returnKeyType={"next"}
                  getRef={c => (this._inputDesc = c)}
                  onSubmitEditing={event => {
                    this._inputCosto._root.focus();
                  }}
                  onChangeText={txtDes =>
                    this.setState({
                      Descripcion: txtDes
                    })
                  }
                  value={this.state.Descripcion}
                />
              </Item>

              <Item floatingLabel>
                <Icon active name="logo-usd" />

                <Label>Costo</Label>
                <Input
                  keyboardType="numeric"
                  returnKeyType={"done"}
                  getRef={c => (this._inputCosto = c)}
                  value={this.state.Costo}
                  onChangeText={text =>
                    this.setState({
                      Costo: text
                    })
                  }
                  value={this.state.Costo}
                />
              </Item>
              <Item>
                <Container style={{ flexDirection: "row" }}>
                  <Container style={{ flex: 1, paddingTop: 15 }}>
                    <Item disabled>
                      <Input disabled placeholder=" Categoria:" />
                    </Item>
                  </Container>
                  <Container style={{ flex: 1 }}>
                    <Picker
                      mode="dropdown"
                      placeholder="Sin Categoria"
                      iosHeader="Categorias"
                      iosIcon={<Icon name="ios-arrow-down-outline" />}
                      style={{ width: undefined, marginTop: 20 }}
                      selectedValue={this.state.Categoria}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      {this.state.data.map((item, index) => {
                        return (
                          <Item
                            label={item.Nombre}
                            value={item.Id}
                            key={index}
                          />
                        );
                      })}
                    </Picker>
                  </Container>
                </Container>
              </Item>
            </Form>
          </Container>

          <Container style={styles.footer2}>
            <Button
              block
              iconLeft
              style={styles.btn}
              onPress={this.Procesar_Registro}
            >
              <Icon name="ios-add-circle-outline" color="black" />
              <Text style={styles.bold}> Añadir</Text>
            </Button>
          </Container>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  footer2: {
    //backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
    flexGrow: 0
  },
  mainContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    //justifyContent: "center",
    //alignItems: "center",
    //paddingBottom: 10,
    backgroundColor: "white"
  },
  FormContainer: {
    flexGrow: 1,
    justifyContent: "space-between"
    //alignItems: "center"
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
    color: "white",
    alignSelf: "center",
    justifyContent: "center"
  },
  // btn: {
  //   backgroundColor: "rgba(92, 61,123, 0.9)",
  //   width: 300,
  //   height: 40,
  //   //justifyContent: "center",
  //   //alignItems: "center",
  //   borderColor: "transparent",
  //   borderWidth: 0,
  //   borderRadius: 5
  // },
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
    //justifyContent: "center"
    // width: 300,
    // height: 40,
    // borderColor: "transparent",
    // borderWidth: 0,
    // borderRadius: 5
    marginTop: 5
  }
});
