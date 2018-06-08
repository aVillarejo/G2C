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
import ServiciosDetails from "../Pantallas/admin/ServiciosDetails";

import CategoriasList from "../Pantallas/admin/CategoriasList";
import CategoriasDetails from "../Pantallas/admin/CategoriasDetails";

//Stack de Autenticacion de Usuario
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  Registro: Registro
});

//Stack para Servicios del Usuario
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  DetallesServicio: DetallesServicio
});
const UserProfikeStack = createStackNavigator({
  Perfil: PerilUsuario,
  DetallesPerfil: DetallesPerfil
});

//TabBar de Usuario
const UserStack = createBottomTabNavigator(
  { Servicios: HomeStack, "Mi Perfil": UserProfikeStack },
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
const adminCategoriasStack = createStackNavigator({
  CategoriasList: CategoriasList,
  CategoriasDetails: CategoriasDetails
});
const adminServiciosStack = createStackNavigator({
  ServiciosList: ServiciosList,
  ServiciosDetails: ServiciosDetails
});

const AdminStack = createBottomTabNavigator(
  {
    Inicio: AdminHomeScreen,
    Usuarios: adminUsersStack,
    Servicios: adminServiciosStack,
    Categorias: adminCategoriasStack,
    Contratos: AdminSettingsScreen,
    Configutacion: AdminSettingsScreen
  },
  {
    lazy: true,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Usuarios") {
          iconName = `ios-contacts${focused ? "" : "-outline"}`;
        } else if (routeName === "Inicio") {
          iconName = `ios-home${focused ? "" : "-outline"}`;
        } else if (routeName === "Servicios") {
          iconName = `ios-list-box${focused ? "" : "-outline"}`;
        } else if (routeName === "Categorias") {
          iconName = `ios-pricetags${focused ? "" : "-outline"}`;
        } else if (routeName === "Contratos") {
          iconName = `ios-book${focused ? "" : "-outline"}`;
        } else if (routeName === "Configutacion") {
          iconName = `ios-settings${focused ? "" : "-outline"}`;
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
//   {
//     lazy: false,
//     tabBarOptions: {
//       activeTintColor: "purple",
//       pressColor: "blue",
//       inactiveTintColor: "#373738",
//       showIcon: true,
//       showLabel: true,
//       style: { backgroundColor: "#FFFAD2" }
//     }
//   }
// );

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
