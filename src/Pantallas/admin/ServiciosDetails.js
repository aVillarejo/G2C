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
  List,
  ListItem,
  Left,
  Body,
  Right,
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
import { SearchBar } from "react-native-elements";
import ServerURL from "../../Config/ServerURL";
import { NavigationActions } from "react-navigation";

export default class ServiciosDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Nombre: null,
      Descripcion: null,
      Costo: null,
      Categoria: "",
      data: [
        {
          Id: "1",
          Nombre: "Educacion",
          Descripcion: "Descripcion"
        }
      ],
      ActivityIndicator_Loading: false
    };
  }

  componentWillMount() {
    this.makeRemoteRequest();
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      Id: this.props.navigation.state.params.obj.Id,
      Nombre: this.props.navigation.state.params.obj.Nombre,
      Descripcion: this.props.navigation.state.params.obj.Descripcion,
      Costo: this.props.navigation.state.params.obj.Costo,
      Categoria: this.props.navigation.state.params.obj.Categoria
    });
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

  static navigationOptions = {
    title: "Detalles Servicio",
    headerStyle: { backgroundColor: "rgba(92, 61,123, 0.9)" },
    headerTintColor: "#fff"
  };

  UpdateRecord = () => {
    fetch(`${ServerURL}/servicios/actualizar.php`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Id: this.state.Id,
        Nombre: this.state.Nombre,
        Descripcion: this.state.Descripcion,
        Costo: this.state.Costo
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
              onPress: () => this.props.navigation.navigate("ServiciosList")
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
    Alert.alert(
      "Atencion",
      "Realmente quiere eliminar el elemento",
      [
        {
          text: "Si",
          onPress: () => {
            fetch(`${ServerURL}/servicios/eliminar.php`, {
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
                      onPress: () =>
                        this.props.navigation.navigate("ServiciosList")
                    }
                  ],
                  { cancelable: false }
                );
              })
              .catch(error => {
                console.error(error);
              });

            this.props.navigation.navigate("First");
          }
        },
        {
          text: "No",
          onPress: () => console.log("ok")
        }
      ],
      { cancelable: true }
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.main}>
        <Container style={{ backgroundColor: "white" }}>
          <Content padder>
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

              <Item
                picker
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10
                }}
              >
                <List>
                  <ListItem icon>
                    <Left>
                      <Icon name="pricetags" />
                    </Left>
                    <Text style={{ color: "black" }}>Categoria: </Text>
                  </ListItem>
                </List>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{}}
                  placeholder="Sin Categoria:"
                  iosHeader="Categorias"
                  placeholderStyle={{ color: "black" }}
                  placeholderIconColor="black"
                  selectedValue={this.state.Categoria}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  {this.state.data.map((item, index) => {
                    return (
                      <Item label={item.Nombre} value={item.Id} key={index} />
                    );
                  })}
                </Picker>
              </Item>
            </Form>
          </Content>
          <Footer
            style={{
              paddingHorizontal: 10,
              paddingVertical: 0,
              backgroundColor: "white"
            }}
          >
            <FooterTab padder style={{ flex: 1, margin: 5 }}>
              <Button
                block
                danger
                iconLeft
                onPress={this.DeleteRecord}
                style={{ flexDirection: "row", justifyContent: "center" }}
              >
                <Icon
                  name="ios-trash-outline"
                  style={{ fontSize: 30, color: "white" }}
                />
                <Text style={styles.bold}> Eliminar</Text>
              </Button>
            </FooterTab>

            <FooterTab padder style={{ flex: 1, margin: 5 }}>
              <Button
                block
                primary
                iconLeft
                onPress={this.UpdateRecord}
                style={{ flexDirection: "row", justifyContent: "center" }}
              >
                <Icon
                  name="ios-sync-outline"
                  style={{ fontSize: 25, color: "white" }}
                />
                <Text style={styles.bold}> Actualizar</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  footer2: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
    flexGrow: 0
  },
  mainContainer: {
    paddingHorizontal: 20
    //justifyContent: "center",
    //alignItems: "center",
    //paddingBottom: 10,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    //justifyContent: "center",
    //alignItems: "center",
    //paddingBottom: 10,
    backgroundColor: "red"
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
  },
  frm: {
    flex: 1,
    justifyContent: "space-between"

    //alignItems: "center"
  }
});
