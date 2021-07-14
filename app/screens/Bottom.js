import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Searcher from '@components/Searcher'
import PrincipalScreen from '@screens/PrincipalScreen'
import UsuarioScreen from '@screens/UsuarioScreen'
import OrdenesScreen from '@screens/OrdenesScreen'
import CarritoScreen from '@screens/CarritoScreen'

const TabNavigator = createMaterialBottomTabNavigator(
    {
      Inicio: {
        screen: PrincipalScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
            </View>
          ),
        }
      },
      Buscador: {
        screen: Searcher,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-search'} />
            </View>
          ),
          activeColor: '#ffffff',
          inactiveColor: '#a3c2fa',
          barStyle: { backgroundColor: '#2163f6' },
        }
      },
      Carrito: {
        screen: CarritoScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-cart'} />
            </View>
          ),
          activeColor: '#ffffff',
          inactiveColor: '#baa3c2',
          barStyle: { backgroundColor: '#5d2c6d' },
        }
      },
      Ordenes: {
        screen: OrdenesScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-list-outline'} />
            </View>
          ),
          activeColor: '#ffffff',
          inactiveColor: '#ebaabd',
          barStyle: { backgroundColor: '#d13560' },
        }
      },
      Cuenta: {
        screen: UsuarioScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
            </View>
          ),
          activeColor: '#ffffff',
          inactiveColor: '#92c5c2',
          barStyle: { backgroundColor: '#2c6d6a' },
        }
      },
    },
    {
      initialRouteName: 'Inicio',
      activeColor: '#ffffff',
      inactiveColor: '#bda1f7',
      barStyle: { backgroundColor: '#6948f4' },
    }
  );
  export default createAppContainer(TabNavigator)