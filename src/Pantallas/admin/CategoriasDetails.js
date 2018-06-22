import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert
} from "react-native";
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
import { ListItem, SearchBar } from "react-native-elements";
import ServerURL from "../../Config/ServerURL";
import { NavigationActions } from "react-navigation";

export default class CategoriasDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: "",
      Nombre: "",
      Descripcion: ""
    };
  }

  componentDidMount() {
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      Id: this.props.navigation.state.params.obj.Id,
      Nombre: this.props.navigation.state.params.obj.Nombre,
      Descripcion: this.props.navigation.state.params.obj.Descripcion
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Detalles Categoria",
      headerStyle: { backgroundColor: "rgba(92, 61,123, 0.9)" },
      headerTintColor: "#fff"
    };
  };

  UpdateStudentRecord = () => {
    fetch(`${ServerURL}/categorias/actualizar.php`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Id: this.state.Id,
        Nombre: this.state.Nombre,
        Descripcion: this.state.Descripcion
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server updating records.
        Alert.alert(
          "Aviso!",
          responseJson,
          [
            {
              text: "Aceptar",
              onPress: () => this.props.navigation.navigate("CategoriasList")
            }
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  DeleteStudentRecord = () => {
    fetch(`${ServerURL}/categorias/eliminar.php`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Id: this.state.Id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        Alert.alert(
          "Aviso!",
          responseJson,
          [
            {
              text: "Aceptar",
              //onPress: () => this.props.navigation.navigate("UsersList")
              onPress: () => this.props.navigation.navigate("CategoriasList")
            }
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        console.error(error);
      });

    this.props.navigation.navigate("First");
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
                  returnKeyType={"done"}
                  getRef={c => (this._inputDesc = c)}
                  // onSubmitEditing={event => {
                  //   this._inputCosto._root.focus();
                  // }}
                  onChangeText={txtDes =>
                    this.setState({
                      Descripcion: txtDes
                    })
                  }
                  value={this.state.Descripcion}
                />
              </Item>
            </Form>
          </Container>

          <Container style={styles.footer2}>
            <Item>
              <Container style={{ flexDirection: "row" }}>
                <Container style={{ flex: 1, paddingTop: 15, marginRight: 10 }}>
                  <Button
                    block
                    danger
                    iconLeft
                    style={styles.btn}
                    onPress={this.DeleteStudentRecord}
                  >
                    <Icon name="ios-trash-outline" color="black" />
                    <Text style={styles.bold}> Eliminar</Text>
                  </Button>
                </Container>
                <Container style={{ flex: 1, paddingTop: 15 }}>
                  <Button
                    block
                    iconLeft
                    style={styles.btn}
                    onPress={this.UpdateStudentRecord}
                  >
                    <Icon name="ios-sync-outline" color="black" />
                    <Text style={styles.bold}> Actualizar</Text>
                  </Button>
                </Container>
              </Container>
            </Item>
          </Container>
        </View>
      </TouchableWithoutFeedback>
    );
    //   <View style={styles.MainContainer}>
    //     <TextInput
    //       placeholder="Nombre"
    //       value={this.state.Nombre}
    //       onChangeText={TextInputValue =>
    //         this.setState({ Nombre: TextInputValue })
    //       }
    //       underlineColorAndroid="transparent"
    //       style={styles.TextInputStyleClass}
    //     />
    //     <TextInput
    //       placeholder="Descripcion"
    //       value={this.state.Descripcion}
    //       onChangeText={TextInputValue =>
    //         this.setState({ Descripcion: TextInputValue })
    //       }
    //       underlineColorAndroid="transparent"
    //       style={styles.TextInputStyleClass}
    //     />

    //     <TouchableOpacity
    //       activeOpacity={0.4}
    //       style={styles.TouchableOpacityStyle}
    //       onPress={this.UpdateStudentRecord}
    //     >
    //       <Text style={styles.TextStyle}>Actualizar Datos</Text>
    //     </TouchableOpacity>

    //     <TouchableOpacity
    //       activeOpacity={0.4}
    //       style={styles.TouchableOpacityStyle}
    //       onPress={this.DeleteStudentRecord}
    //     >
    //       <Text style={styles.TextStyle}>Eliminar Categoria</Text>
    //     </TouchableOpacity>
    //   </View>
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
    fontSize: 13,
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
    //backgroundColor: "rgba(92, 61,123, 0.9)",
    //justifyContent: "center"
    // width: 300,
    // height: 40,
    // borderColor: "transparent",
    // borderWidth: 0,
    // borderRadius: 5
    marginTop: 5
  }
});
