import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';
var { width } = Dimensions.get("window")

//Import the screen

import Usuario from '@screens/UsuarioScreen'
import Principal from '@screens/PrincipalScreen'

export default class Inicio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      module: 1,
    };
  }

  //COLOR #1877F2

  render() {
    return (
      <View style={{ flex: 1 }}>

        <StatusBar translucent={false} backgroundColor='#e3e3e3' barStyle='dark-content' />
        <Principal navigation={this.props.navigation} />
      </View>
      //<Bottom />
    );
  }
}

const styles = StyleSheet.create({
  bottomTab: {
    height: 60,
    width: width,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 4,
    position: 'absolute',
    bottom: 0,
    shadowOpacity: 0.3,
    shadowRadius: 50,
  },
  itemTab: {
    width: width / 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})