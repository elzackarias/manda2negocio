import React, { Component, Fragment } from 'react'
import {
    Text, View, BackHandler, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView, TouchableHighlight
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';
import { mainStyles } from '@styles/styles'
import color from '@styles/colors'
const Envio = 20;
var { height, width } = Dimensions.get('window');

export default class ConfirmarScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { dataCarrito: [], total: '', isLoading: true, direccion: [], direcciones: [], usuario: [] };
    }

    async componentDidMount() {
        try {
            const response = await AsyncStorage.getItem("carrito")
            const usuario = await AsyncStorage.getItem("@usuario:key")
            const response_defa = await AsyncStorage.getItem("defaultDir")
            const response_direcc = await AsyncStorage.getItem("direcciones")
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
            //console.log(response_defa)
            this.setState({ dataCarrito: JSON.parse(response), direccion: JSON.parse(response_defa), direcciones: JSON.parse(response_direcc), usuario: JSON.parse(usuario) });
            this.setState({ total: this.state.dataCarrito.reduce((sum, value) => (typeof value.subtotal == "number" ? sum + value.subtotal : sum), 0) + Envio, isLoading: false })
            //console.log()
        } catch (e) {
            console.log(e)
        }
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._isMounted = false;
    }

    handleBackButtonClick = () => {
        //this.props.navigation.goBack(null);
        return true;
    };

    async confirmar (){
        this.setState({ isLoading: true })
        const tiempo = Math.floor(Date.now() / 1000);
        //CAMBIAR LA TARIFA DE ENVIO DE $20 Opcional
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                dataUser: this.state.usuario,
                direccion: this.state.direccion,
                compra: this.state.dataCarrito,
                total: this.state.total,
                sinenvio: this.state.total-20,
                createAt: tiempo
            })
        };
        try {
            const fetchResponse = await fetch('http://192.168.0.11/manda2/api/api.php?type=insertar&que=pedido', settings);
            const data = await fetchResponse.json();
            
            if(data.status == "EXITO"){
                AsyncStorage.setItem("carrito", JSON.stringify([]));
                AsyncStorage.setItem("cart_info", JSON.stringify({"carrito": false, "negocio": 0, "qty": 0}));
                setTimeout(() => {
                    this.props.navigation.replace('Exito', { id_pedido:data.idpedido })
                }, 1000)
            }else{
                alert('Error :c')
            }
        } catch (e) {
            alert('Ha ocurrido un error :c')
        }

        //console.log(dataSend);
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
                        <TouchableOpacity style={{ position: 'absolute', left: 0 }} onPress={() => this.props.navigation.replace('Carrito')}>
                            <Icon name="arrow-back-outline" size={30} color={color.WHITE} style={{ marginLeft: 10, backgroundColor: '#1877f2', borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
                        </TouchableOpacity>
                        <Text style={styles.tecsto}>Confirmar pedido</Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{ color: color.BLUE2, textAlign: 'center', fontFamily: 'Oxygen-Bold', fontSize: 17, marginTop: 65, marginBottom: 19, textAlignVertical: 'center' }}>CONFIRMA TU PEDIDO:</Text>
                    <TouchableHighlight style={{ backgroundColor: '#cff0ff', width: width - 90, alignSelf: 'center', borderRadius: 15, padding:10, marginBottom:12 }}>
                        <Fragment>
                            <Text style={{ textAlign: 'center', fontFamily:'Oxygen-Bold', color:color.AZUL }}>TOTAL A PAGAR:</Text>
                            <Text style={{ textAlign: 'center', fontFamily:'Oxygen-Bold', color:color.BLUE2, fontSize:18.5 }}>${this.state.total}.00</Text>
                        </Fragment>
                    </TouchableHighlight>
                    <TouchableHighlight style={{ backgroundColor: '#cff0ff', width: width - 90, alignSelf: 'center', borderRadius: 15, padding:10, marginBottom:12 }}>
                        <Fragment>
                            <Text style={{ textAlign: 'center', fontFamily:'Oxygen-Bold', color:color.AZUL }}>MÉTODO DE PAGO:</Text>
                            <Text style={{ textAlign: 'center', fontFamily:'Oxygen-Bold', color:color.BLUE2, fontSize:18.5 }}><Image source={require('@recursos/images/billete.png')} style={{width:28,height:20}} /> Efectivo</Text>
                        </Fragment>
                    </TouchableHighlight>
                    <TouchableHighlight style={{ backgroundColor: '#cff0ff', width: width - 90, alignSelf: 'center', borderRadius: 15, padding:10 }}>
                        <Fragment>
                            <Text style={{ textAlign: 'center', fontFamily:'Oxygen-Bold', color:color.AZUL }}>DIRECCIÓN:</Text>
                            <Text style={{ textAlign: 'center', fontFamily:'Oxygen-Bold', color:color.BLUE2, fontSize:14 }}>{this.state.direcciones[this.state.direccion.index_dir].titulo}</Text>
                        </Fragment>
                    </TouchableHighlight>
                </ScrollView>
                <View style={[styles.btnAzul, { alignContent: 'center', justifyContent: 'flex-end', alignSelf: 'center', marginBottom: 0 }]}>
                    <TouchableOpacity onPress={() => this.confirmar() }>
                        <Text style={[mainStyles.btntxt, { fontSize: 19, borderRadius: 2 }]}>Confirmar y enviar</Text>
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
        fontSize: 20,
        color: color.AZUL
    },
    btnAzul: {
        backgroundColor: '#1877f2',
        borderColor: '#1877f2',
        width: '100%',
        padding: 6,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 2,
        bottom: 0,
        marginBottom: 35,
    }
});