import React, { Component } from 'react'
import { Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';
import color from '@styles/colors'
import { mainStyles, loginStyles } from '@styles/styles'
import { floor } from 'react-native-reanimated';
import NavigationService from '@components/NavigationService';

var nombres;
var { height, width } = Dimensions.get('window');

// AsyncStorage.getItem("@usuario:key").then((value) => {
//     nombre = JSON.parse(value);
//     console.log(nombre.email)
// })


export default class Negocio extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, dataDatos: [], dataProductos: [], carrito: '', information: [], showBtn: true }; this.arrayholder = [];
    }
    async componentDidMount() {
        try {
            const { navigation } = this.props;
            const TiendaID = JSON.stringify(navigation.getParam('id'));
            nombres = JSON.stringify(navigation.getParam('id'));
            const respuesta = await AsyncStorage.getItem("cart_info")
            this.setState({ information: JSON.parse(respuesta) })
            if (this.state.information.carrito === false) {
                this.setState({ showBtn: false })
            }
            //this.setState({tienda:TiendaID})
            //console.log(this.state.information)
            this.willFocusSubscription = this.props.navigation.addListener(
                'willFocus',
                () => {
                    this.info_cart();
                }
            );

            //console.log(TiendaID)
            var url = "http://192.168.0.9/manda2/api/api.php?type=consulta&que=establecimientos&est=";
            var link = url + TiendaID;
            return fetch(link.replace(/['"]+/g, ''))
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            isLoading: false, dataSource: responseJson.productos, dataDatos: responseJson.datos, dataProductos: responseJson.productos
                        },
                        function () {
                            this.arrayholder = responseJson.productos;
                        }
                    );
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            alert(error)
        }
    }

    info_cart() {

        this.setState({ isLoading: true })
        setTimeout(() => {
            AsyncStorage.getItem("cart_info").then((value) => {
                var nombre = JSON.parse(value);
                this.setState({ information: nombre, isLoading: false })
                if (nombre.carrito == true) {
                    this.setState({ showBtn: true })
                } else {
                    this.setState({ showBtn: false })
                }
                //console.log(this.state.information)
            })
        }, 800)

    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignContent: 'center' }}>
                    <ActivityIndicator size="large" color={color.AZUL} style={{ height: 100 }} />
                </View>
            );
        }
        return (

            <View style={{ backgroundColor: '#ededed', flex: 1 }}>
                <View style={{ marginBottom: -45 }}>
                    <Image source={{ uri: this.state.dataDatos.banner }}
                        resizeMode='contain'
                        style={{ width: width, height: 320, maxHeight: 320, maxWidth: 1000, alignContent: 'center', borderRadius: 16, marginTop: -105 }} />
                    <TouchableOpacity style={{ position: 'absolute' }} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back-outline" size={30} color={color.AZUL} style={{ marginTop: 10, marginLeft: 10, backgroundColor: color.WHITE, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ paddingRight: 20, paddingLeft: 20 }}>
                    <Text style={[mainStyles.titleNegocio, { marginTop: 5 }]}>Productos</Text>
                    {this.state.dataProductos.map((producto, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            NavigationService.navigate('Producto', { id_prod: producto.id, id_tienda: nombres });
                        }}>
                            <View style={{ height: 74, justifyContent: 'center', padding: 12, borderRadius: 10, borderLeftWidth: 3.5, borderLeftColor: color.AZUL, marginBottom: 12, backgroundColor: '#fff', marginLeft: 2.5 }}>
                                <Text style={mainStyles.textoNegocio}>{producto.nombre}</Text>
                                <Text style={mainStyles.precio}>${producto.precio}.00</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {
                    this.state.showBtn == true
                        ?
                        <View style={[mainStyles.btnMain, { marginTop: 0, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 0 }]}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Carrito')} style={{ flexDirection: 'row' }}>
                                <Text style={mainStyles.btntxt}>Ir al carrito ( {this.state.information.qty} )</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <>
                        </>
                }
            </View>
        )
    }
}