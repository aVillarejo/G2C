import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View,
   Button,
   AsyncStorage
} from 'react-native';
   
export default class AdminHomeScreen extends Component{
  constructor(props) {
    super(props)
    this.state={
       
    }
 }
   _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
   
   render() {
      return (
         <View style={styles.Container}>
            <Text>
               AdminHomeScreen
            </Text>
            <Button title="Cerrar Sesion" onPress={this._signOutAsync} />
         </View>
      );
   }
}
   
const styles = StyleSheet.create({
   Container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
   }
});