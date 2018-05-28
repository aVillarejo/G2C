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
      Estado: ""
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
      Correo: this.props.navigation.state.params.obj.Correo
    });
  }

  static navigationOptions = {
    title: "Actualizar Usuario"
  };

  UpdateStudentRecord = () => {
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
        Direccion: this.state.Direccion
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
              onPress: () =>
                this.props.navigation.navigate("UsersList", {
                  status: true
                })
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
        <TextInput
          placeholder="Correo"
          value={this.state.Correo}
          onChangeText={TextInputValue =>
            this.setState({ Correo: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Telefono"
          value={this.state.Telefono}
          onChangeText={TextInputValue =>
            this.setState({ Telefono: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Direccion"
          value={this.state.Direccion}
          onChangeText={TextInputValue =>
            this.setState({ Direccion: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />
        <TextInput
          placeholder="Estado"
          value={this.state.Estado}
          onChangeText={TextInputValue =>
            this.setState({ Estado: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />
        <TextInput
          placeholder="Municipio"
          value={this.state.Municipio}
          onChangeText={TextInputValue =>
            this.setState({ Municipio: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.UpdateStudentRecord}
        >
          <Text style={styles.TextStyle}>Actualizar Datos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.DeleteStudentRecord}
        >
          <Text style={styles.TextStyle}>Eliminar Usuario</Text>
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
