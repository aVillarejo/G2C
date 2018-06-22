import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
   
export default class DetallesServicio extends React.Component {
   static navigationOptions = {
     title: 'Detalles HomeScreen',
   };
 
   render() {
     return (
       <View style={styles.container}>
         <Button title="Cerrar Sesion" onPress={this._signOutAsync} />
         <StatusBar barStyle="default" />
       </View>
     );
   }
 
   _signOutAsync = async () => {
     await AsyncStorage.clear();
     this.props.navigation.navigate('Auth');
   };
 }

const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
