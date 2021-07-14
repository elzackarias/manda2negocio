import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, Image, BackHandler } from 'react-native'
import color from '@styles/colors'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Feather';
import { personalizarStyles, mainStyles } from '@styles/styles'

export default class ExitoScreen extends Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        const id_pedido = props.navigation.getParam('id_pedido');
        this.state = {
            isLoading: true,
            idpedido: id_pedido
        };

    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            isLoading: false
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._isMounted = false;
    }



    handleBackButtonClick = () => {
        //this.props.navigation.goBack(null);
        return true;
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignItems: 'center' }}>
                    {/*<ActivityIndicator size="large" color={Colors.AZUL} /> */}
                    <Image source={require('@recursos/images/loader.gif')} style={{ height: 50, width: 50 }} />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: color.WHITE, padding: 10, justifyContent: 'center' }}>
                <Icon name="check-circle" size={70} color={'#6cc72b'} style={{ textAlign: 'center' }} />
                <Text style={{ fontFamily: 'Oxygen-Regular', color: '#242526', fontSize: 20, textAlign: 'center', marginTop: 5 }}>¡Orden Exitosa!</Text>
                <Text style={{textAlign:'center', fontSize:10, color:'#a9a9a9', marginTop:12}}>ID Orden: {this.state.idpedido}</Text>
                <View style={[mainStyles.btnSec, { marginTop: 0, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 0 }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.replace('Carrito')} style={{ flexDirection: 'row' }}>
                        <Text style={mainStyles.btntxt}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});