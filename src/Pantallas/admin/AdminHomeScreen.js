import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  StatusBar
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

export default class AdminHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      telefono: "",
      correo: "",
      pass: "",
      Direccion:"",
      Municipio:"",
      Estado:"",
      tipo: ""
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
      AsyncStorage.getItem("Municipio").then(value => {
        this.setState({ Municipio: value });
      });
      AsyncStorage.getItem("Estado").then(value => {
        this.setState({ Estado: value });
      });
      AsyncStorage.getItem("Direccion").then(value => {
        this.setState({ Direccion: value });
      });
    } catch (err) {
      console.warn(err);
    }
  }
  

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: " Servicios",
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
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#rgba(92, 61,123, 0.9)"
        />
        <Content>
          <Card style={{ flex: 0 }}>
            
          <CardItem>
              <Left>
                <Icon active name="ios-contact" />
                <Body>
                  <Text style={styles.bold}>{this.state.nombre}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
                <View
                  style={{
                    height: 2,
                    width: 200,
                    flex: 1,
                    backgroundColor: "rgba(92, 61,123, 0.9)"
                  }}
                />
                <Item disabled>
                  <Input disabled placeholder={this.state.correo} />
                  <Icon name="ios-mail-outline" />
                </Item>
                <Item disabled>
                  <Input disabled placeholder={this.state.telefono} />
                  <Icon name="ios-call-outline" />
                </Item>
              </Body>
            </CardItem>



            <CardItem>
              <Left>
                <Button
                  transparent
                  textStyle={{ color: "#87838B" }}
                  //onPress={this._signOutAsync}
                >
                  <Icon name="logo-github" />
                  <Text>{this.state.tipo > 0 ? " Administrador" : " Usuario"}</Text>
                </Button>
              </Left>
            </CardItem>


          </Card>

          <Card style={{ flex: 0 }}>
          <CardItem>
          <Body>
            <View
              style={{
                height: 2,
                width: 200,
                flex: 1,
                backgroundColor: "rgba(92, 61,123, 0.9)"
              }}
            />
            <Item disabled>
              <Input disabled placeholder={this.state.Direccion} />
              <Icon name="home" />
            </Item>

            <Item disabled>
              <Input disabled placeholder={this.state.Municipio} />
              <Icon name="home" />
            </Item>

            <Item disabled>
              <Input disabled placeholder={this.state.Estado} />
              <Icon name="home" />
            </Item>
          </Body>
        </CardItem>
          </Card>

          

        </Content>
      </Container>
    );
    // <View style={styles.Container}>
    //   <Text>Datos</Text>
    //   <Text>id: {this.state.id}</Text>
    //   <Text>nombre: {this.state.nombre}</Text>
    //   <Text>correo: {this.state.correo}</Text>
    //   <Text>telefono: {this.state.telefono}</Text>
    //   <Text>pass: {this.state.pass}</Text>
    //   <Text>tipo: {this.state.tipo}</Text>
    //   <Button title="Cerrar Sesion" onPress={this._signOutAsync} />
    // </View>
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
