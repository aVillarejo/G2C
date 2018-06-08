import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import FlatListData from "./flatListData";
import ServerURL from "../../Config/ServerURL";

export default class ServiciosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };
  }

  static navigationOptions = {
    title: "Listado Servicios",
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="+"
        color="black"
      />
    )
  };
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `${ServerURL}/categorias/consultar.php`;

    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          //data: page === 1 ? res.results : [...this.state.data, ...res.results],
          data: res,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <View style={styles.Container}>
        <FlatList
          keyExtractor={item => item.Nombre}
          data={this.state.data}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} />;
          }}
        />
      </View>
    );
  }
}

class FlatListItem extends Component {
  _onpress = () => {
    Alert.alert(
      "Eliminar!",
      "Realmente deseas eliminar el registro",
      [
        {
          text: "si",
          onPress: () => console.warn("OK Pressed")
        },
        {
          text: "no",
          onPress: () => console.warn("No Pressed")
        }
      ],
      { cancelable: false }
    );
  };
  render() {
    return (
      <TouchableOpacity onPress={this._onpress}>
        <View style={{ flex: 1 }}>
          <Text>Nombre: {this.props.item.Nombre}</Text>
          <Text>Descripcion: {this.props.item.Descripcion}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center"
    //alignItems: "center"
  }
});
