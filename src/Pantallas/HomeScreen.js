import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity
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

import { List, ListItem, SearchBar, Badge } from "react-native-elements";
import ServerURL from "../Config/ServerURL";

import { StackNavigator, SwitchNavigator } from "react-navigation"; // Version can be specified in package.json

export default class HomeScreen extends React.Component {
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
      tipo: "",
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      isLoading: true,
      isLoading2: false
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
    
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ NuevoServicio: this._signOutAsync });
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    //const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=2`;
    const url = `${ServerURL}/servicios/consultar.php`;

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

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  // render() {
  //   return (
      // <View style={styles.container}>
      //   <Button
      //     title="Mi Perfil"
      //     onPress={() => this.props.navigation.navigate("Perfil")}
      //   />

      //   <Button title="Ir a Detalles" onPress={this._showMoreApp} />
      //   <Button title="Cerrar Sesion" onPress={this._signOutAsync} />
      // </View>

      render() {
        if (this.state.isLoading) {
          return (
            <View
              style={{
                flex: 1,
                paddingTop: 20,
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <SearchBar
                  placeholder="Buscar..."
                  lightTheme
                  round
                  containerStyle={{ flexDirection: "row", flex: 1 }}
                  inputStyle={{ flex: 1 }}
                />
              </View>
    
              <View style={{ flex: 1, paddingTop: 20, alignItems: "center" }}>
                <Text>Cargando Servicios</Text>
                <ActivityIndicator />
              </View>
            </View>
          );
        }
        return (
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="#rgba(92, 61,123, 0.9)"
            />
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("DetallesServicio", {
                      obj: item
                    })
                  }
                >
                  <ListItem
                    hideChevron
                    roundAvatar
                    title={`${item.Nombre}`}
                    subtitle={`${item.Categoria}`} //   <View> // rightTitle={
                    //     <Text>{`$${item.Costo} MXN`}</Text>
                    //   </View>
                    // }
                    rightTitle={`$${item.Costo} MXN`}
                    rightTitleStyle={{
                      flex: 1,
                      flexDirection: "row",
                      marginRight: 0,
                      color: "black"
                    }} //   value: `$${item.Costo} MXN`, // badge={{
                    //   textStyle: { color: "white" },
                    //   containerStyle: { marginTop: -20 }
                    // }} // avatar={{
                    //   uri:
                    //     item.Tipo != 0
                    //       ? "https://cdn.icon-icons.com/icons2/157/PNG/256/admin_user_man_22187.png"
                    //       : "https://cdn3.iconfinder.com/data/icons/users-6/100/654853-user-men-2-128.png"
                    // }}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.Nombre}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          </List>    
    );
  }




  _showMoreApp = () => {
    this.props.navigation.navigate("DetallesServicio");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
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
    fontSize: 12,
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
    flex: 1,
    paddingRight: 12
  }
});
