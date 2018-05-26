import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

//Auth
import AuthLoadingScreen from "./AuthLoadingScreen";
import SignInScreen from "../Pantallas/SignInScreen";
import Registro from "../Pantallas/Registro";

//User Screens
import HomeScreen from "../Pantallas/HomeScreen";
import DetallesServicio from "../Pantallas/DetallesServicio";
import PerilUsuario from "../Pantallas/PerfilUsuario";
import DetallesPerfil from "../Pantallas/DetallesPerfil";

//Admin Screen
import AdminHomeScreen from "../Pantallas/admin/AdminHomeScreen";
import AdminSettingsScreen from "../Pantallas/admin/AdminSettingsScreen";
import UsersList from "../Pantallas/admin/UsersList";
import UserDetails from "../Pantallas/admin/UserDetails";
import ServiciosList from "../Pantallas/admin/ServiciosList";

//Stack de Autenticacion de Usuario
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  Registro: Registro
});

//Stack para Servicios del Usuario
const ServiciosStack = createStackNavigator({
  Home: HomeScreen,
  DetallesServicio: DetallesServicio
});
const UserProfikeStack = createStackNavigator({
  Perfil: PerilUsuario,
  DetallesPerfil: DetallesPerfil
});

//TabBar de Usuario
const UserStack = createBottomTabNavigator(
  { Servicios: ServiciosStack, "Mi Perfil": UserProfikeStack },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Servicios") {
          iconName = `ios-briefcase${focused ? "" : "-outline"}`;
        } else if (routeName === "Mi Perfil") {
          iconName = `ios-contact${focused ? "" : "-outline"}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "purple",
      inactiveTintColor: "gray"
    }
  }
);

//////////////////////// Admin////////////////////

const adminUsersStack = createStackNavigator({
  UsersList: UsersList,
  UserDetails: UserDetails
});
const AdminStack = createBottomTabNavigator({
  Tab1: AdminHomeScreen,
  Usuarios: adminUsersStack,
  Servicios: ServiciosList,
  Tab4: AdminSettingsScreen,
  Tab5: AdminSettingsScreen
});

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: UserStack,
    Admin: AdminStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
