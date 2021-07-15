import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Alert, Image, BackHandler, TextInput } from 'react-native'
import color from '@styles/colors'
import AsyncStorage from '@react-native-community/async-storage'
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { personalizarStyles, mainStyles } from '@styles/styles'

var { height, width } = Dimensions.get('window');
const latitudeDelta = 0.0017;
const longitudeDelta = 0.0016;

export default class PersonalizarDir extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        const coordenadas = props.navigation.getParam('coords');
        const nombre = props.navigation.getParam('nombre');
        this.state = {
            region: {
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
            },
            dataAddress: nombre,
            isLoading: true,
            referencias: '',
            id_usuario: 0,
            direcciones: []
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            isLoading: false
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        AsyncStorage.getItem("@usuario:key").then((value) => {
            let info = JSON.parse(value);
            this.setState({ id_usuario: info.id });
        });

        AsyncStorage.getItem("direcciones").then((value) => {
            let direccion = JSON.parse(value);
            this.setState({ direcciones: direccion });
        });

        console.log(this.state.direcciones.length)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._isMounted = false;
    }



    handleBackButtonClick = () => {
        //this.props.navigation.goBack(null);
        return true;
    };

    guardarDir = () => {
        const { referencias, region } = this.state;
        if (referencias.length == 0 || referencias == '' || referencias.length == 5) {
            Alert.alert('Ups..', 'Por favor ingrese alguna referencia de su domicilio 😅')
        } else {
            this.setState({ isLoading: true })
            fetch('http://192.168.0.5/manda2/api/api.php?type=insertar&que=direccion&token=b8d356e2b7134759f486a167583c7e9e', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    usuario: this.state.id_usuario,
                    latitud: region.latitude,
                    longitud: region.longitude,
                    titulo: this.state.dataAddress,
                    referencias: referencias
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ isLoading: false })
                    if (responseJson.status == "ERROR") {
                        //console.log(JSON.stringify(responseJson))
                        Alert.alert(responseJson.titulo, responseJson.msg);
                        this.props.navigation.replace('Carrito')
                    } else {
                        if(this.state.direcciones.length == 0){
                            const defDefault = { 'id_dir': responseJson.id, 'index_dir':0 }
                            AsyncStorage.setItem('defaultDir', JSON.stringify(defDefault))
                            console.log('Prede')
                        }
                        this.state.direcciones.push({ 'id': responseJson.id, 'titulo': this.state.dataAddress, 'latitud': region.latitude, 'longitud': region.longitude, "referencias": referencias })
                        AsyncStorage.setItem('direcciones',JSON.stringify(this.state.direcciones));
                        this.props.navigation.replace('Carrito')
                    }
                }).catch((error) => {
                    console.error(error);
                })
        }
    }

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
            <View style={{ flex: 1, backgroundColor: color.BLUE, paddingLeft: 10, paddingRight: 10 }}>
                <View style={{ height: 70, justifyContent: 'center' }}>
                    <TouchableOpacity style={{ left: 0 }} onPress={() => this.props.navigation.replace('Opciones')}>
                        <Icon name="arrow-back-outline" size={30} color={color.AZUL} style={{ marginLeft: 2, backgroundColor: color.WHITE, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: height - 70, backgroundColor: color.WHITE, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingRight: 20, paddingLeft: 20 }}>
                    <View style={{ width: '100%', height: '35%' }}>
                        <MapView
                            zoomEnabled={false}
                            scrollEnabled={false}
                            showsCompass={false}
                            rotateEnabled={false}
                            style={[styles.map, { width: '100%', height: '100%' }]}
                            initialRegion={this.state.region}>
                            <Marker coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }} image={require('@recursos/images/marker-1.png')} />
                        </MapView>
                        <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 55, flexDirection: 'row' }}>
                            <Text style={{ textAlignVertical: 'center', backgroundColor: '#e3f3fa', padding: 5 }}><Icon name="ios-location-sharp" size={27} style={{ color: color.BLUE, textAlignVertical: 'center' }} /></Text>
                            <Text style={{ backgroundColor: '#e3f3fa', color: color.BLUE, flex: 1, fontSize: 11, textAlignVertical: 'center', fontFamily: 'Oxygen-Regular', paddingRight: 10 }}>{this.state.dataAddress}</Text>
                        </View>
                    </View>
                    {/* Aqui va la seccion de abajo con el input y eso xd */}
                    <View>
                        <Text style={mainStyles.MainTitle}>Referencias del domicilio:</Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={personalizarStyles.Inputs}
                            placeholderTextColor={'#779fed'}
                            onChangeText={referencias => this.setState({ referencias })}
                            placeholder="Detalla como podemos encontrar tu domicilio"
                        />
                    </View>
                    <TouchableOpacity onPress={this.guardarDir}>
                        <View style={[mainStyles.btnMain, { marginTop: 10, alignContent: 'center', alignSelf: 'center', justifyContent: 'center', width: width - 50, height: 55, borderRadius: 15 }]}>
                            <Text style={[mainStyles.btntxt, { fontSize: 16 }]}>Guardar</Text>
                        </View>
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});