import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import ServerURL from "../../Config/ServerURL";

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

  renderHeader = () => {
    return (
      <SearchBar
        containerStyle={{ flexDirection: "row", flex: 1 }}
        inputStyle={{ flex: 1 }}
        placeholder="Buscar..."
        lightTheme
        round
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

  static navigationOptions = {
    title: "Listado Categorias",
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="+"
        color="black"
      />
    )
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
            <Text>Cargando Usuarios</Text>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("CategoriasDetails", {
                  obj: item
                })
              }
            >
              <ListItem
                roundAvatar
                title={`${item.Nombre}`}
                subtitle={item.Descripcion}
                // avatar={{
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