import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  StatusBar,
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

export default class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: "",
      Nombre: "",
      Tipo: "",
      Telefono: "",
      Correo: "",
      Direccion: "",
      Municipio: "",
      Estado: "",
      Pass:""
    };
  }

  componentDidMount() {
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      Id: this.props.navigation.state.params.obj.Id,
      Nombre: this.props.navigation.state.params.obj.Nombre,
      Direccion: this.props.navigation.state.params.obj.Direccion,
      Municipio: this.props.navigation.state.params.obj.Municipio,
      Estado: this.props.navigation.state.params.obj.Estado,
      Tipo: this.props.navigation.state.params.obj.Tipo,
      Telefono: this.props.navigation.state.params.obj.Telefono,
      Correo: this.props.navigation.state.params.obj.Correo,
      Pass:this.props.navigation.state.params.obj.Pass,
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Detalles Usuario",
      headerStyle: { backgroundColor: "rgba(92, 61,123, 0.9)" },
      headerTintColor: "#fff"
    };
  };

  UpdateRecord = () => {
    fetch(`${ServerURL}/UpdateUsers.php`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Id: this.state.Id,
        Nombre: this.state.Nombre,
        Tipo: this.state.Tipo,
        Telefono: this.state.Telefono,
        Correo: this.state.Correo,
        Municipio: this.state.Municipio,
        Estado: this.state.Estado,
        Direccion: this.state.Direccion,
        Pass:this.state.Pass

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
              onPress: () => this.props.navigation.navigate("UsersList")
            }
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  DeleteRecord = () => {
    fetch(`${ServerURL}/DeteleUsers.php`, {
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
              onPress: () => this.props.navigation.navigate("UsersList")
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
        <Container style={styles.frm}>
          <Form>
          
          <Item floatingLabel>
              <Icon active name="md-bookmarks" />
              <Label>Nombre</Label>
              <Input returnKeyType={"next"} autoFocus={true}
                onSubmitEditing={event => {this._inputCorreo._root.focus();}}
                onChangeText={txtNom => this.setState({Nombre: txtNom})}
                value={this.state.Nombre}
              />
            </Item>


            <Item floatingLabel>
              <Icon active name="mail" />
                <Label>Correo</Label>
                <Input returnKeyType={"next"}
                  getRef={c => (this._inputCorreo = c)}
                  onSubmitEditing={event =>{this._inputTelefono._root.focus();}}
                  onChangeText={txt =>this.setState({Descripcion: txt})}
                  value={this.state.Correo}
                />
              </Item>



              <Item floatingLabel>
                <Icon active name="md-call" />
                <Label>Telefono</Label>
                <Input keyboardType="numeric" returnKeyType={"done"}
                  getRef={c => (this._inputTelefono = c)}
                 onSubmitEditing={event =>{this._inputDireccion._root.focus();}}
                  onChangeText={text => this.setState({Telefono: text})}
                  value={this.state.Telefono}
                />
              </Item>

              <Item floatingLabel>
              <Icon active name="home" />
                <Label>Direccion</Label>
                <Input returnKeyType={"next"}
                  getRef={c => (this._inputDireccion = c)}
                  onSubmitEditing={event =>{this._inputPass._root.focus();}}
                  onChangeText={txt =>this.setState({Direccion: txt})}
                  value={this.state.Direccion}
                />
              </Item>

              <Item floatingLabel>
              <Icon active name="mail" />
                <Label>Password</Label>
                <Input returnKeyType={"next"}
                  getRef={c => (this._inputPass = c)}
                 // onSubmitEditing={event =>{this._inputTelefono._root.focus();}}
                  onChangeText={txt =>this.setState({Pass: txt})}
                  value={this.state.Pass}
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
                  onPress={this.DeleteRecord}
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
                  onPress={this.UpdateRecord}
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
      // <View style={styles.MainContainer}>
      //   <TextInput
      //     placeholder="Nombre"
      //     value={this.state.Nombre}
      //     onChangeText={TextInputValue =>
      //       this.setState({ Nombre: TextInputValue })
      //     }
      //     underlineColorAndroid="transparent"
      //     style={styles.TextInputStyleClass}
      //   />
      //   <TextInput
      //     placeholder="Correo"
      //     value={this.state.Correo}
      //     onChangeText={TextInputValue =>
      //       this.setState({ Correo: TextInputValue })
      //     }
      //     underlineColorAndroid="transparent"
      //     style={styles.TextInputStyleClass}
      //   />

      //   <TextInput
      //     placeholder="Telefono"
      //     value={this.state.Telefono}
      //     onChangeText={TextInputValue =>
      //       this.setState({ Telefono: TextInputValue })
      //     }
      //     underlineColorAndroid="transparent"
      //     style={styles.TextInputStyleClass}
      //   />

      //   <TextInput
      //     placeholder="Direccion"
      //     value={this.state.Direccion}
      //     onChangeText={TextInputValue =>
      //       this.setState({ Direccion: TextInputValue })
      //     }
      //     underlineColorAndroid="transparent"
      //     style={styles.TextInputStyleClass}
      //   />
      //   <TextInput
      //     placeholder="Estado"
      //     value={this.state.Estado}
      //     onChangeText={TextInputValue =>
      //       this.setState({ Estado: TextInputValue })
      //     }
      //     underlineColorAndroid="transparent"
      //     style={styles.TextInputStyleClass}
      //   />
      //   <TextInput
      //     placeholder="Municipio"
      //     value={this.state.Municipio}
      //     onChangeText={TextInputValue =>
      //       this.setState({ Municipio: TextInputValue })
      //     }
      //     underlineColorAndroid="transparent"
      //     style={styles.TextInputStyleClass}
      //   />

      //   <TouchableOpacity
      //     activeOpacity={0.4}
      //     style={styles.TouchableOpacityStyle}
      //     onPress={this.UpdateStudentRecord}
      //   >
      //     <Text style={styles.TextStyle}>Actualizar Datos</Text>
      //   </TouchableOpacity>

      //   <TouchableOpacity
      //     activeOpacity={0.4}
      //     style={styles.TouchableOpacityStyle}
      //     onPress={this.DeleteStudentRecord}
      //   >
      //     <Text style={styles.TextStyle}>Eliminar Usuario</Text>
      //   </TouchableOpacity>
      // </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    flexGrow: 1,
    paddingTop: 30,
    backgroundColor: "#fff"
  },

  MainContainer_For_Show_StudentList_Activity: {
    flex: 1,
    paddingTop: Platform.OS == "ios" ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
  },

  TextInputStyleClass: {
    textAlign: "center",
    width: "90%",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#FF5722",
    borderRadius: 5
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: "90%",
    backgroundColor: "#00BCD4"
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center"
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  footer2: {
    backgroundColor: "black",
    //alignItems: "center",
    //justifyContent: "flex-end",
    marginTop:0,
    marginBottom: 20,
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
  frm: {
    flex: 0,
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
