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
  Button
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

export default class EditStudentRecordActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TextInput_Student_ID: "",
      TextInput_Student_Name: "",
      TextInput_Student_Class: "",
      TextInput_Student_PhoneNumber: "",
      TextInput_Student_Email: ""
    };
  }

  componentDidMount() {
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      TextInput_Student_ID: this.props.navigation.state.params.obj.Id,
      TextInput_Student_Name: this.props.navigation.state.params.obj.Nombre,
      TextInput_Student_Class: this.props.navigation.state.params.obj.Tipo,
      TextInput_Student_PhoneNumber: this.props.navigation.state.params.obj
        .Telefono,
      TextInput_Student_Email: this.props.navigation.state.params.obj.Correo
    });
  }

  static navigationOptions = {
    title: "EditStudentRecordActivity"
  };

  UpdateStudentRecord = () => {
    fetch(
      "https://reactnativecode.000webhostapp.com/Student/UpdateStudentRecord.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          student_id: this.state.TextInput_Student_ID,

          student_name: this.state.TextInput_Student_Name,

          student_class: this.state.TextInput_Student_Class,

          student_phone_number: this.state.TextInput_Student_PhoneNumber,

          student_email: this.state.TextInput_Student_Email
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server updating records.
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  DeleteStudentRecord = () => {
    fetch(
      "https://reactnativecode.000webhostapp.com/Student/DeleteStudentRecord.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          student_id: this.state.TextInput_Student_ID
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });

    this.props.navigation.navigate("First");
  };

  render() {
    console.warn(this.state);
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}>
          {" "}
          Edit Student Record Form{" "}
        </Text>

        <TextInput
          placeholder="Student Name Shows Here"
          value={this.state.TextInput_Student_Name}
          onChangeText={TextInputValue =>
            this.setState({ TextInput_Student_Name: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Student Class Shows Here"
          value={this.state.TextInput_Student_Class}
          onChangeText={TextInputValue =>
            this.setState({ TextInput_Student_Class: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Student Phone Number Shows Here"
          value={this.state.TextInput_Student_PhoneNumber}
          onChangeText={TextInputValue =>
            this.setState({ TextInput_Student_PhoneNumber: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Student Email Shows Here"
          value={this.state.TextInput_Student_Email}
          onChangeText={TextInputValue =>
            this.setState({ TextInput_Student_Email: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.UpdateStudentRecord}
        >
          <Text style={styles.TextStyle}> UPDATE STUDENT RECORD </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.DeleteStudentRecord}
        >
          <Text style={styles.TextStyle}> DELETE CURRENT RECORD </Text>
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
