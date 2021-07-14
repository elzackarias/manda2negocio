import React from 'react'
import { View, AppRegistry } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Searcher from '@components/Searcher'
import SplashScreen from '@screens/SplashScreen'
import LoginScreen from '@screens/LoginScreen'
import PrincipalScreen from '@screens/PrincipalScreen'
import RecuperarPasswordScreen from '@screens/RecuperarPasswordScreen'
import AcercaScreen from '@screens/AcercaScreen'
import RegistroScreen from '@screens/RegistroScreen'
import IndexScreen from '@screens/IndexScreen'
import NegocioScreen from '@screens/NegocioScreen'
import ProductoScreen from '@screens/ProductoScreen'
import UsuarioScreen from '@screens/UsuarioScreen'
import OrdenesScreen from '@screens/OrdenesScreen'
import CarritoScreen from '@screens/CarritoScreen'
import Buscador from '@components/Searcher'
import Opciones from '@screens/OpcionesDirScreen'
import MapaScreen from '@screens/MapaScreen'
import MapaBuscaScreen from '@screens/MapaBuscaScreen'
import PersonalizarScreen from '@screens/PersonalizarDirScreen'
import ConfirmarScreen from '@screens/ConfirmarScreen'
import ExitoScreen from '@screens/ExitoScreen'
import CategoriaScreen from '@screens/CategoriaScreen'
import ManageProducts from '@screens/ManageScreen'
import AgregarScreen from '@screens/AgregarScreen'

import MapaTest from '@screens/MapaTest'

const AppNavigation = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Principal: {
    screen: PrincipalScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  RecuperarPassword: {
    screen: RecuperarPasswordScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Acerca: {
    screen: AcercaScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Registro: {
    screen: RegistroScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Inicio: {
    screen: IndexScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Negocio: {
    screen: NegocioScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Producto: {
    screen: ProductoScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Usuario: {
    screen: UsuarioScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Ordenes: {
    screen: OrdenesScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Carrito: {
    screen: CarritoScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Buscador: {
    screen: Buscador,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Opciones: {
    screen: Opciones,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Mapa: {
    screen: MapaScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  MapaBusca: {
    screen: MapaBuscaScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Personalizar: {
    screen: PersonalizarScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Exito: {
    screen: ExitoScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Categoria: {
    screen: CategoriaScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  Confirmar: {
    screen: ConfirmarScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  MapaTest: {
    screen: MapaTest,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  ManageProducts: {
    screen: ManageProducts,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
  AgregarScreen: {
    screen: AgregarScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    }
  },
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: PrincipalScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
          </View>
        ),
      }
    },
    Buscador: {
      screen: Searcher,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-person'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: '#2163f6' },
      }
    },
    User: {
      screen: UsuarioScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-images'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#92c5c2',
        barStyle: { backgroundColor: '#2c6d6a' },
      }
    },
    Order: {
      screen: OrdenesScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-cart'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#d13560' },
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: { backgroundColor: '#6948f4' },
  }
);


// export default createAppContainer(AppNavigation)
export default createAppContainer(AppNavigation)