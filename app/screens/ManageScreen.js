import React, { Component } from 'react'
import { Text, View, Image, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Modal } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/Feather';
import color from '@styles/colors'
import { mainStyles, loginStyles } from '@styles/styles'
import { floor } from 'react-native-reanimated';
import NavigationService from '@components/NavigationService';

var nombres;
var { height, width } = Dimensions.get('window');
const largo = width - 40;
// AsyncStorage.getItem("@usuario:key").then((value) => {
//     nombre = JSON.parse(value);
//     console.log(nombre.email)
// })


export default class Negocio extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, success: false, dataDatos: [], dataProductos: [], carrito: '', information: [], showBtn: true, token: '' }; this.arrayholder = [];
    }
    async componentDidMount() {
        try {
            const { navigation } = this.props;
            const respuesta = await AsyncStorage.getItem("@usuario:key")
            const token = navigation.getParam('token');
            this.setState({ information: JSON.parse(respuesta) })
            this.willFocusSubscription = this.props.navigation.addListener(
                'willFocus',
                () => {
                    this.getProds();
                }
            );
            var url = "http://192.168.0.5/manda2/api/negocios.php?type=consulta&que=establecimientos&est=";
            var link = url + this.state.information.id;
            return fetch(link.replace(/['"]+/g, ''))
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            isLoading: false, dataSource: responseJson.productos, dataDatos: responseJson.datos, dataProductos: responseJson.productos, token: token
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

    getProds() {
        this.setState({ isLoading: true })
        var url = "http://192.168.0.5/manda2/api/negocios.php?type=consulta&que=establecimientos&est=";
        var link = url + this.state.information.id;
        return fetch(link.replace(/['"]+/g, ''))
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false, dataSource: responseJson.productos, dataDatos: responseJson.datos, dataProductos: responseJson.productos
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    borrar(id) {
        Alert.alert(
            "⚠️Eliminar producto⚠️",
            "¿Está seguro que desea eliminar el producto?",
            [
                {
                    text: "Si", onPress: () => {
                        this.setState({ isLoading: true });
                        var direccion = "http://192.168.0.5/manda2/api/negocios.php?type=borrar&que=producto&id=";
                        var urls = direccion + id;
                        fetch(urls.replace(/['"]+/g, ''), {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            body: JSON.stringify({
                                id: this.state.information.id,
                                token: this.state.token,
                                id_producto: id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                this.setState({ isLoading: false });
                                if (responseJson.status == "ERROR") {
                                    Alert.alert(responseJson.titulo, responseJson.msg);
                                } else {
                                    this.setState({ success: true });
                                    this.getProds();
                                }
                            }).catch((error) => {
                                console.error(error);
                            })
                    }
                },
                {
                    text: "No", onPress: () => { }, style: 'cancel'
                }
            ]
        )
    }

    hideSuccess() {
        this.setState({ isLoading: true });
        this.setState({ success: false });
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 350)
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
        if (this.state.success) {
            return (
                <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignContent: 'center', backgroundColor: '#fff', marginTop: -70 }}>
                    <Icono name="check-circle" size={70} color={'#6cc72b'} style={{ textAlign: 'center' }} />
                    <Text style={{ fontFamily: 'Oxygen-Regular', color: '#242526', fontSize: 20, textAlign: 'center', marginTop: 5 }}>¡Eliminado con éxito!</Text>
                    <TouchableOpacity onPress={() => this.hideSuccess()} style={{ bottom: 0, position: 'absolute', alignSelf: 'center', justifyContent: 'center' }}>
                        <View style={[mainStyles.btnMain, { alignSelf: 'center', justifyContent: 'center', width: width - 50, height: 70, borderRadius: 50 }]}>
                            <Text style={[mainStyles.btntxt, { fontSize: 18 }]}>Aceptar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return (

            <View style={{ backgroundColor: '#ededed', flex: 1 }}>
                <View style={styles.cardShadow}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity style={{ position: 'absolute', left: 0 }} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back-outline" size={30} color={color.WHITE} style={{ marginLeft: 10, backgroundColor: color.BLUE, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
                        </TouchableOpacity>
                        <Text style={styles.tecsto}>Tus productos</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ position: 'absolute', bottom: 24, right: 18, zIndex: 100 }} onPress={() => {
                    this.props.navigation.navigate('AgregarScreen', { token: this.state.token });
                }}>
                    <Image source={require('@recursos/images/floating.png')} style={{
                        resizeMode: 'contain',
                        width: 75,
                        height: 75,
                    }} />
                </TouchableOpacity>
                <ScrollView style={{ paddingRight: 20, paddingLeft: 20 }}>
                    {this.state.dataProductos.map((producto, index) => (

                        <View key={index} style={{ flexDirection: 'row', height: 74, padding: 10, borderRadius: 10, marginTop: 10, backgroundColor: '#fff' }}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Producto', { id_prod: producto.id, token: this.state.token });
                            }} style={{ justifyContent: 'center', paddingLeft: 2 }}>
                                <Icon name="ios-create-sharp" size={20} style={{ color: color.AZUL, textAlignVertical: 'center' }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Producto', { id_prod: producto.id, token: this.state.token });
                            }} style={{ justifyContent: 'center' }}>
                                <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                                    <Text style={mainStyles.textoNegocio}>{producto.nombre}</Text>
                                    <Text style={mainStyles.precio}>${producto.precio}.00</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { this.borrar(producto.id); }} style={{ position: 'absolute', right: 0, paddingRight: 13, height: 74, justifyContent: 'center' }}>
                                <Icon name="ios-trash-sharp" size={20} style={{ color: color.AZUL }} />
                            </TouchableOpacity>
                        </View>

                    ))}
                    <Text style={{color:'#ededed'}}>.</Text>
                </ScrollView>
            </View>
        )
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
        justifyContent: 'center',
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        height: 65,
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
    }
});