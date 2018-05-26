import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const tipo = await AsyncStorage.getItem("tipo");
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    this.props.navigation.navigate(
      userToken ? (tipo > 0 ? "Admin" : "App") : "Auth"
    );
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingBottom: 30 }}>
          <Text>Cargando</Text>
        </View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
