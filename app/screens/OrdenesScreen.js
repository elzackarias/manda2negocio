import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import color from '@styles/colors'
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainStyles, loginStyles } from '@styles/styles'
import OrdenNueva from '@screens/OrdenNueva'
import OrdenPreparando from '@screens/OrdenPreparando'
import Usuario from '@screens/UsuarioScreen'

var { width, height } = Dimensions.get("window")

export default class Ordenes extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, usuario: [], module: 1, token: '' };
  }

  async componentDidMount() {
    const { navigation } = this.props
    const usuario = await AsyncStorage.getItem("@usuario:key")
    const token = navigation.getParam('token');

    this.setState({ usuario: JSON.parse(usuario), token: token, isLoading: false });

  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignItems: 'center' }}>
          {/*<ActivityIndicator size="large" color={Colors.AZUL} /> */}
          <Image source={require('@recursos/images/load.gif')} style={{ height: 50, width: 50 }} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={{ position: 'absolute', left: 0 }} onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back-outline" size={30} color={color.WHITE} style={{ marginLeft: 10, backgroundColor: color.AZUL, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
            </TouchableOpacity>
            <Text style={styles.tecsto}>Ordenes</Text>
          </View>
        </View>
        <View style={{ padding: 8 }}>
          <View style={styles.bottomTab}>
            <TouchableOpacity style={[styles.itemTab, { backgroundColor: this.state.module == 1 ? "#C4E1F5" : "#e3eff7" }]} onPress={() => this.setState({ module: 1 })}>
              <Icon name={this.state.module == 1 ? "ios-reader" : "ios-reader-outline"} size={40} color={this.state.module == 1 ? color.AZUL : "gray"} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemTab, { backgroundColor: this.state.module == 2 ? "#C4E1F5" : "#e3eff7" }]} onPress={() => this.setState({ module: 2 })}>
              <Icon name={this.state.module == 2 ? "ios-timer-sharp" : "ios-timer-outline"} size={40} color={this.state.module == 2 ? color.AZUL : "gray"} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemTab, { backgroundColor: this.state.module == 3 ? "#C4E1F5" : "#e3eff7" }]} onPress={() => this.setState({ module: 3 })}>
              <Icono name={this.state.module == 3 ? "shopping" : "shopping-outline"} size={40} color={this.state.module == 3 ? color.AZUL : "gray"} />
            </TouchableOpacity>
          </View>
        </View>

        {
          this.state.module == 1 ? <OrdenNueva Token={this.state.token} />
            :this.state.module==2? <OrdenPreparando Token={this.state.token} />
            //:this.state.module==3? 
            //:this.state.module==4? <Ordenes />
            : <Usuario />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center'
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 65
  },
  tecsto: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 22,
    color: color.AZUL
  },
  btnAzul: {
    backgroundColor: color.BLUE,
    borderColor: color.BLUE,
    width: '100%',
    padding: 6,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 2,
    bottom: 0,
    marginBottom: 35,
  },
  bottomTab: {
    height: 60,
    width: width - 16,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 4,
    //position:'absolute',
    //bottom:0,
    shadowOpacity: 0.3,
    shadowRadius: 50,
  },
  itemTab: {
    width: (width - 20) / 3,
    alignItems: 'center',
    justifyContent: 'center',
  }
});