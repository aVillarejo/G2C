import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
  Button
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import ServerURL from "../../Config/ServerURL";
import { NavigationActions } from "react-navigation";

export default class ServiciosDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: "",
      Nombre: "",
      Descripcion: "",
      Costo: ""
    };
  }

  componentDidMount() {
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      Id: this.props.navigation.state.params.obj.Id,
      Nombre: this.props.navigation.state.params.obj.Nombre,
      Descripcion: this.props.navigation.state.params.obj.Descripcion,
      Costo: this.props.navigation.state.params.obj.Costo
    });
  }

  static navigationOptions = { title: "Detalles Categoria" };

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
      <View style={styles.MainContainer}>
        <TextInput
          placeholder="Nombre"
          value={this.state.Nombre}
          onChangeText={TextInputValue =>
            this.setState({ Nombre: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />
        <View style={{ flexDirection: "row", flex: 0 }}>
          <View style={{ flexDirection: "row", flex: 0 }}>
            <Text>Descripcion</Text>
          </View>
          <View style={{ flexDirection: "row", flex: 0 }}>
            <TextInput
              placeholder="Descripcion"
              value={this.state.Descripcion}
              onChangeText={TextInputValue =>
                this.setState({ Descripcion: TextInputValue })
              }
              underlineColorAndroid="transparent"
              style={styles.TextInputStyleClass}
            />
          </View>
        </View>

        <TextInput
          placeholder="Costo"
          value={this.state.Costo}
          onChangeText={TextInputValue =>
            this.setState({ Costo: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.UpdateRecord}
        >
          <Text style={styles.TextStyle}>Actualizar Datos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.DeleteRecord}
        >
          <Text style={styles.TextStyle}>Eliminar Categoria</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    flex: 1,
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
  }
});
