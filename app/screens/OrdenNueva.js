import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icono from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import color from '@styles/colors'
import { mainStyles } from '@styles/styles'

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
        this.state = { isLoading: true, success: false, dataDatos: [], dataLista: [], dataProductos: [], carrito: '', actual:'', information: [], showModal: false, token: this.props.Token, nuevas: '', modalDatos: [], modalLista: [] }; this.arrayholder = [];
    }
    async componentDidMount() {
        try {
            const { navigation } = this.props;
            const respuesta = await AsyncStorage.getItem("@usuario:key")
            this.setState({ information: JSON.parse(respuesta) })
            var arreglo = { "datos": { "elapsed": "37 min", "fecha": "03:04 PM", "id": "37c45a349eb740bb325dd47860d5267a", "nombre": "Silvanna", "subtotal": "9", "total": "29", "uid": "12" }, "productos": [{ "cantidad": "1", "nombre": "Agua Ciel 600ml", "subtotal": "9" }] }
            var url = "http://192.168.0.11/manda2/api/ordenes.php?type=consulta&que=nuevas_ordenes";
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    id: this.state.information.id,
                    token: this.state.token
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ isLoading: false });
                    if (responseJson.status == "ERROR") {
                        Alert.alert(responseJson.titulo, responseJson.msg);
                    } else {
                        this.setState({ dataLista: responseJson.lista, nuevas: responseJson.lista.length, modalDatos: arreglo.datos, modalLista: arreglo.productos })
                    }
                }).catch((error) => {
                    console.error(error);
                })
        } catch (error) {
            alert(error)
        }
    }

    getProds() {
        this.setState({ isLoading: true })
        var url = "http://192.168.0.11/manda2/api/negocios.php?type=consulta&que=establecimientos&est=";
        var link = url + this.state.information.id;
        return fetch(link.replace(/['"]+/g, ''))
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false, dataDatos: responseJson.datos, dataProductos: responseJson.productos
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    hideSuccess() {
        this.setState({ isLoading: true });
        this.setState({ success: false });
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 350)
    }

    ShowModal(id) {
        const actual = this.state.dataLista[id];
        this.setState({ modalDatos: actual.datos, modalLista: actual.productos, showModal: true, actual:id })
        //console.log(this.state.dataLista)
    }

    confirmar(){
        var conf = this.state.dataLista.splice(this.state.actual,1);
        var nuevas = this.state.nuevas-1;
        this.setState({nuevas,showModal:false,actual:''})
        console.log(this.state.actual)
        console.log(this.state.dataLista)
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

            <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
                <Modal isVisible={this.state.showModal}
                    backdropColor="#000"
                    backdropOpacity={0}
                    animationInTiming={600}
                    animationOutTiming={300}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={100}
                    onBackdropPress={this.close}>
                    <View style={{ backgroundColor: '#fff', padding: 8, borderRadius: 4, elevation: 5, borderColor: '#bbbbbb5c', borderWidth: 1 }}>
                        <View style={{ flexDirection: 'row', borderBottomColor: '#e6e8eb', borderBottomWidth: 1, padding: 12 }}>
                            <Text style={[styles.textoNotaL, { paddingRight: 22 }]}>{this.state.modalDatos.uid}</Text>
                            <Text style={styles.textoNota}>{this.state.modalDatos.nombre}</Text>
                        </View>

                        <ScrollView style={{ paddingRight: 12, paddingLeft: 12, paddingBottom: 10, borderBottomColor: '#e6e8eb', borderBottomWidth: 1 }}>
                            {this.state.modalLista.map((producto, index) => (
                                <View key={index} style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ fontFamily: 'Oxygen-Bold', textAlignVertical: 'center', fontSize: 16, paddingRight: 24 }}>{producto.cantidad}x</Text>
                                    <Text style={{ fontFamily: 'Oxygen-Bold', fontSize: 16, textAlignVertical: 'center', color: '#3b3b3b' }}>{producto.nombre}</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontFamily: 'Oxygen-Regular', fontSize: 15, textAlign: 'right' }}>${producto.subtotal}.00</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={{ paddingRight: 12, paddingLeft: 12, paddingTop: 10, paddingBottom: 10, flexDirection: 'row-reverse' }}>
                            <Text style={{ fontFamily: 'Oxygen-Bold', fontSize: 15, paddingLeft: 24, color: '#3b3b3b' }}>${this.state.modalDatos.subtotal}.00</Text>
                            <Text style={{ fontFamily: 'Oxygen-Bold', fontSize: 15, color: '#3b3b3b' }}>Total</Text>
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => this.setState({ showModal: false })} style={{marginRight:10}}>
                                <View style={[styles.btnBlanco, { marginTop: 0, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }]}>
                                   <Text style={styles.btntxt2A}>Listo</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.confirmar()}>
                                <View style={[styles.btnAzul, { marginTop: 0, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }]}>
                                    <Text style={styles.btntxt2}>Confirmar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{ paddingRight: 20, paddingLeft: 20 }}>
                    <Text style={{ fontFamily: 'Oxygen-Bold', fontSize: 16, paddingBottom: 4, color: '#434343' }}>Nuevas ({this.state.nuevas})</Text>
                    {this.state.dataLista.map((orden, index) => (
                        <TouchableOpacity key={index} onPress={() => this.ShowModal(index)}>
                            <View style={{ flex: 1, height: 78, padding: 10, borderRadius: 5, marginBottom: 12, backgroundColor: '#06c167', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
                                    <Text style={[styles.textoNegocioL, { paddingRight: 20 }]}>{orden.datos.uid}</Text>
                                    <Text style={styles.textoNegocio}>{orden.datos.nombre}</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[mainStyles.precio, { textAlign: 'right' }]}>{orden.datos.fecha}</Text>
                                        <Text style={[mainStyles.precio, { textAlign: 'right' }]}>{orden.datos.elapsed}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <Text style={{ color: '#ededed' }}>.</Text>
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
        width:(width/2)-35,
        borderRadius:40,
        padding: 2
    },
    btnBlanco: {
        backgroundColor: color.WHITE,
        borderColor:color.BLUE,
        borderWidth:1.3,
        borderRadius:40,
        width:(width/2)-35,
        padding: 2
    },
    textoNegocio: {
        fontSize: 18,
        color: color.WHITE,
        fontFamily: "Oxygen-Bold",
        textAlignVertical: 'center'
    },
    textoNegocioL: {
        fontSize: 18,
        color: color.WHITE,
        fontFamily: "Oxygen-Regular",
        textAlignVertical: 'center'
    },
    textoNotaL: {
        fontSize: 18,
        color: color.BLACK,
        fontFamily: "Oxygen-Regular",
        textAlignVertical: 'center'
    },
    textoNota: {
        fontSize: 18,
        color: '#3b3b3b',
        fontFamily: "Oxygen-Bold",
        textAlignVertical: 'center'
    },
    btntxt2: {
        fontSize: 15,
        color: color.WHITE,
        paddingVertical: 10,
        fontFamily: 'Oxygen-Bold',
    },
    btntxt2A: {
        fontSize: 15,
        color: color.BLUE,
        paddingVertical: 10,
        fontFamily: 'Oxygen-Bold',
    },
});