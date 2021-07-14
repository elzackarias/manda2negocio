import React, { Component, Fragment } from 'react'
import {
    Text, View, FlatList, TouchableOpacity, Alert, Dimensions, Image, StyleSheet, ScrollView
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainStyles, loginStyles } from '@styles/styles'
import color from '@styles/colors'
const Envio = 20;
var { height, width } = Dimensions.get('window');

export default class CarritoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { dataCarrito: [], total: '', subtotal: '', isLoading: true, nombre: '', isempty: true, info: [], direccion: [], direcciones: [], usuario:[] };
    }

    async componentDidMount() {
        try {
            const response = await AsyncStorage.getItem("carrito")
            //const usuario = await AsyncStorage.getItem("@usuario:key")
            const response_defa = await AsyncStorage.getItem("defaultDir")
            const response_inf = await AsyncStorage.getItem("cart_info")
            const response_direcc = await AsyncStorage.getItem("direcciones")
            console.log(response)
            this.setState({ dataCarrito: JSON.parse(response), info: JSON.parse(response_inf), direccion: JSON.parse(response_defa), direcciones: JSON.parse(response_direcc) });
            console.log(this.state.dataCarrito)
            if (this.state.dataCarrito.length !== 0) {
                this.setState({ total: this.state.dataCarrito.reduce((sum, value) => (typeof value.subtotal == "number" ? sum + value.subtotal : sum), 0) + Envio, subtotal: this.state.dataCarrito.reduce((sum, value) => (typeof value.subtotal == "number" ? sum + value.subtotal : sum), 0) })
                //console.log(this.state.dataCarrito.length)
                var link = 'http://192.168.0.5/manda2/api/api.php?type=consulta&que=nombre-establecimiento&id=' + this.state.dataCarrito[0].negocio;
                const getname = await fetch(link)
                const data = await getname.json()
                this.setState({ isLoading: false, nombre: data.nombre, isempty: false })
            } else {
                this.setState({ dataCarrito: null, isLoading: false, isempty: true })
            }
        } catch (e) {
            console.log(e)
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.pokemons !== this.state.pokemons) {
    //       console.log('pokemons state has changed.')
    //     }
    //   }

    borrar(idprod, id) {
        this.setState({ isLoading: true })
        this.state.dataCarrito.splice(id, 1);
        console.log(this.state.dataCarrito)
        var nuevo = this.state.dataCarrito;
        this.setState({ dataCarrito: nuevo });
        this.setState({ isLoading: false, total: this.state.dataCarrito.reduce((sum, value) => (typeof value.subtotal == "number" ? sum + value.subtotal : sum), 0) + Envio, subtotal: this.state.dataCarrito.reduce((sum, value) => (typeof value.subtotal == "number" ? sum + value.subtotal : sum), 0) })
        if (this.state.dataCarrito.length == 0) {
            var n_cat = { 'carrito': false, 'qty': 0, 'negocio': 0 }
            this.setState({ isempty: true, info: n_cat })
        } else {
            let cantidad = this.state.info.qty - 1;
            var n_cat = { 'carrito': true, 'qty': cantidad, 'negocio': this.state.dataCarrito[0].negocio }
            this.setState({ info: n_cat })
        }
        AsyncStorage.setItem("carrito", JSON.stringify(nuevo));
        AsyncStorage.setItem("cart_info", JSON.stringify(n_cat));
    }

    //Ahora aqui instaciamos lo que sucederá al dar click en completar compra
    // realizar() {
    //     n
    //     // console.log(JSON.stringify({datos:{usuario:this.state.usuario.id,direccion:this.state.direccion.id_dir},carrito:this.state.dataCarrito}))

    // }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignItems: 'center' }}>
                    {/*<ActivityIndicator size="large" color={Colors.AZUL} /> */}
                    <Image source={require('@recursos/images/load.gif')} style={{ height: 50, width: 50 }} />
                </View>
            );
        }

        if (this.state.isempty) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.cardShadow}>
                        <View style={styles.cardContainer}>
                            <TouchableOpacity style={{ position: 'absolute', left: 0 }} onPress={() => this.props.navigation.goBack()}>
                                <Icon name="arrow-back-outline" size={30} color={color.WHITE} style={{ marginLeft: 10, backgroundColor: color.AZUL, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
                            </TouchableOpacity>
                            <Text style={styles.tecsto}>Carrito</Text>
                        </View>
                    </View>
                    {/*<ActivityIndicator size="large" color={Colors.AZUL} /> */}
                    {/* <Image source={require('@recursos/images/vacio.png')} style={{ height: 100, width: 100 }} /> */}
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1, marginTop: -80 }}>
                        <Icon name="ios-cart" size={90} style={{ color: color.AZUL }} />
                        <Text style={{ fontFamily: 'Oxygen-Bold', fontSize: 18, color: color.AZUL }}>Aún no tienes productos en tu carrito</Text>
                    </View>

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
                        <Text style={styles.tecsto}>Carrito</Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{ fontSize: 22, color: color.AZUL, fontFamily: 'Oxygen-Bold', textAlign: 'center', marginTop: 10 }}>{this.state.nombre}</Text>
                    <Text style={{ textAlign: 'center', color: color.AZUL, fontFamily: 'Oxygen-Bold', marginBottom: 8 }}>Tiempo estimado de entrega: 20 - 40 min.</Text>
                    <Text style={{ fontSize: 18, color: color.BLUE, fontFamily: 'Oxygen-Bold', paddingLeft: 15, marginBottom: 8 }}><Icono name="truck" size={15} /> Dirección</Text>

                    <TouchableOpacity onPress={() => this.props.navigation.replace('Opciones')}>
                        {
                            this.state.direccion.length == 0
                                ?
                                <View style={{ backgroundColor: '#b3dff5', height: 60, justifyContent: 'center', marginBottom: -10, padding: 15, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, fontFamily: 'Oxygen-Bold', textAlignVertical: 'center' }}>Agregar dirección</Text>
                                    <Icon name="chevron-forward" size={22} style={{ textAlign: 'right', textAlignVertical: 'center' }} />
                                </View>
                                :
                                <>
                                    <View style={{ backgroundColor: '#b3dff5', height: 60, justifyContent: 'center', marginBottom: -10, padding: 12, flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 13, fontFamily: 'Oxygen-Bold', color: color.BLUE, textAlignVertical: 'center', paddingLeft: 15 }}>{this.state.direcciones[this.state.direccion.index_dir].titulo}</Text>
                                        <Icon name="chevron-forward" size={22} style={{ textAlign: 'right', textAlignVertical: 'center', paddingRight: 2 }} />
                                    </View>
                                </>
                        }
                    </TouchableOpacity>

                    <View style={{ padding: 15}}>
                        <Text style={{ fontSize: 18, color: color.BLUE, fontFamily: 'Oxygen-Bold', marginTop: 8, marginBottom: 9 }}><Icon name="card" size={19} /> Método de pago:</Text>
                        <View style={{ height: 60, marginBottom: -30, padding:15, flexDirection: 'row', justifyContent:'center' }}>
                            <Image source={require('@recursos/images/billete.png')} style={{ height: 30, width: 43 }} />
                            <Text style={{ fontSize: 15, fontFamily: 'Oxygen-Bold', textAlignVertical: 'center', color:color.BLUE }}> Efectivo</Text>
                            {/* <TouchableOpacity style={{flex:1}}>
                                <View style={{backgroundColor:color.BLUE, width:85, alignItems:'center', padding:5, borderRadius:4}}>
                                    <Text style={{color:'white', fontFamily:'Oxygen-Bold', fontSize:14}}>Cambiar</Text>
                                </View>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <Text style={{textAlign:'center', fontFamily:'Oxygen-Bold', color:color.AZUL, marginTop:4, marginBottom:-10}}>Próximamente pagos con tarjeta :3</Text>
                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 18, color: color.BLUE, fontFamily: 'Oxygen-Bold', marginTop: 8, marginBottom: 9 }}><Icons name="shopping" size={19} /> Tu pedido:</Text>
                        {
                            this.state.dataCarrito.map((item, i) => {
                                return (
                                    <View style={{ flexDirection: 'row', marginBottom: 5 }} key={i}>
                                        <Text style={{ borderWidth: 0.5, textAlign: 'center', textAlignVertical: 'center', width: 22, height: 22, borderRadius: 8, fontFamily: 'Oxygen-Bold', fontSize: 13, marginRight: 10, borderColor: color.BLUE }}>{item.qty}</Text>
                                        <Text style={{ fontFamily: 'Oxygen-Bold', fontSize: 14, textAlignVertical: 'center', color: 'black' }}>{item.nombre}</Text>
                                        <View style={{ position: 'absolute', right: 0, flexDirection: 'row', textAlignVertical: 'center' }}>
                                            <Text style={{ fontFamily: 'Oxygen-Bold', right: 0, textAlignVertical: 'center', marginRight: 10 }}> ${item.subtotal}.00</Text>
                                            <TouchableOpacity onPress={() => this.borrar(item.id, i)}><Icon name="trash" size={18} color={color.BLUE} /></TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }

                        <Text style={{ fontSize: 17, color: color.BLUE, fontFamily: 'Oxygen-Bold', marginTop: 10 }}><Icons name="cash-usd-outline" size={20} color={color.BLUE} /> Resumen:</Text>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Oxygen-Regular' }}>Subtotal:</Text>
                            <Text style={{ textAlign: 'right', flex: 1, fontSize: 16, fontFamily: 'Oxygen-Regular' }}>${this.state.subtotal}.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Oxygen-Regular' }}>Envío:</Text>
                            <Text style={{ textAlign: 'right', flex: 1, fontSize: 16, fontFamily: 'Oxygen-Regular' }}>${Envio}.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={{ color: color.BLUE, fontFamily: 'Oxygen-Bold', fontSize: 16 }}>Total:</Text>
                            <Text style={{ textAlign: 'right', flex: 1, color: color.BLUE, fontFamily: 'Oxygen-Bold', fontSize: 16 }}>${this.state.total}.00</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.btnAzul, { alignContent: 'center', justifyContent: 'flex-end', alignSelf: 'center', marginBottom: 0 }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.replace('Confirmar')}>
                        <Text style={[mainStyles.btntxt, { fontSize: 19, borderRadius: 2 }]}>Realizar pedido ➡️ ${this.state.total}</Text>
                    </TouchableOpacity>
                </View>
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
    }
});