import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { List, ListItem, SearchBar, Badge } from "react-native-elements";
import ServerURL from "../../Config/ServerURL";
import { Icon, Button } from "native-base";
export default class CategoriasList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      isLoading: true,
      isLoading2: false
    };
  }

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

  // renderHeader = () => {
  //   return (
  //     // <SearchBar
  //     //   containerStyle={{ flexDirection: "row", flex: 1 }}
  //     //   inputStyle={{ flex: 1 }}
  //     //   placeholder="Buscar..."
  //     //   lightTheme
  //     //   round
  //     // />
  //   );
  // };

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

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Listado Servicios",
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
          <Icon name="ios-add-circle-outline" />
        </Button>
      )
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ NuevoServicio: this._NuevoServicio });
  }

  _NuevoServicio = () => {
    this.props.navigation.navigate("ServicioRegistrar");
  };

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
                this.props.navigation.navigate("ServiciosDetails", {
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
