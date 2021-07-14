import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/Feather';
import color from '@styles/colors'
import { mainStyles, loginStyles } from '@styles/styles'
import NavigationService from '@components/NavigationService';
import AsyncStorage from '@react-native-community/async-storage'
var { height, width } = Dimensions.get('window');
var prid;

export default class AgregarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, success: false, information: [], nombre: '', price: '', isFocused: false, isFocused_2: false, token: '' };
    }

    async componentDidMount() {
        try {
            const { navigation } = this.props;
            const respuesta = await AsyncStorage.getItem("@usuario:key")
            this.setState({ information: JSON.parse(respuesta) });
            this.setState({ token: navigation.getParam('token'), isLoading: false });

        } catch (e) {
            alert(e);
        }
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    handleFocus_2 = () => this.setState({ isFocused_2: true });
    handleBlur_2 = () => this.setState({ isFocused_2: false });

    handleName = (text) => {
        this.setState({ nombre: text })
    }

    handlePrice = (text) => {
        this.setState({ price: text.replace(/[^0-9]/g, '') })
    }

    guardar() {
        this.setState({ isLoading: true });
        if (this.state.nombre.length == 0 || this.state.price.length == 0) {
            this.setState({ isLoading: false });
            Alert.alert('Ops...', 'No puedes dejar sin rellenar 😐');
        } else {
            var direccion = "http://192.168.0.5/manda2/api/negocios.php?type=insertar&que=producto";
            fetch(direccion, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    id: this.state.information.id,
                    token: this.state.token,
                    name: this.state.nombre,
                    price: this.state.price,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ isLoading: false });
                    if (responseJson.status == "ERROR") {
                        Alert.alert(responseJson.titulo, responseJson.msg);
                    } else {
                        this.setState({ success: true });
                    }
                }).catch((error) => {
                    console.error(error);
                })
        }
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
                    <Text style={{ fontFamily: 'Oxygen-Regular', color: '#242526', fontSize: 20, textAlign: 'center', marginTop: 5 }}>¡Agregado con éxito!</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ bottom: 0, position: 'absolute', alignSelf: 'center', justifyContent: 'center' }}>
                        <View style={[mainStyles.btnMain, { alignSelf: 'center', justifyContent: 'center', width: width - 50, height: 70, borderRadius: 50 }]}>
                            <Text style={[mainStyles.btntxt, { fontSize: 18 }]}>Aceptar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={{ backgroundColor: color.WHITE, flex: 1 }}>
                <View style={{ marginBottom: -49 }}>
                    <Image source={require('@recursos/images/banner-1.jpg')}
                        resizeMode='contain'
                        style={{ width: width, height: 320, alignContent: 'center', borderRadius: 16, marginTop: -105 }} />
                    <TouchableOpacity style={{ position: 'absolute' }} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back-outline" size={30} color={color.AZUL} style={{ marginTop: 10, marginLeft: 10, backgroundColor: color.WHITE, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center', borderWidth: 1.5, borderColor: '#00000075' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingRight: 20, paddingLeft: 20, marginTop: 12, marginBottom: 8 }}>
                    <Text style={[mainStyles.titleNegocio, { marginTop: 5, fontSize: 20, textAlign: 'center' }]}>Agregar producto</Text>
                </View>
                <View style={{ paddingRight: 24, paddingLeft: 24 }}>
                    <Text style={{ fontFamily: 'Oxygen-Bold', fontSize: 15, color: '#616161' }}>Nombre:</Text>
                    <TextInput
                        placeholderTextColor='#9fa2ab'
                        onFocus={this.handleFocus}
                        editable={true}
                        value={this.state.nombre}
                        onChangeText={this.handleName}
                        onBlur={this.handleBlur}
                        style={{
                            backgroundColor: '#f6f8fb',
                            marginBottom: 9,
                            borderColor: this.state.isFocused
                                ? '#5b85ff'
                                : '#eaeaea',
                            borderWidth: 1.5,
                            borderRadius: 8,
                            color: '#64666b',
                            paddingLeft: 15,
                            paddingRight: 15,
                            fontSize: 17
                        }}
                        placeholder='Nombre del producto'
                    />
                    <Text style={{ fontFamily: 'Oxygen-Bold', fontSize: 15, color: '#616161' }}>Precio:</Text>
                    <TextInput
                        placeholderTextColor='#9fa2ab'
                        keyboardType={'phone-pad'}
                        onFocus={this.handleFocus_2}
                        value={this.state.price}
                        onChangeText={this.handlePrice}
                        onBlur={this.handleBlur_2}
                        style={{
                            backgroundColor: '#f6f8fb',
                            marginBottom: 9,
                            borderColor: this.state.isFocused_2
                                ? '#5b85ff'
                                : '#eaeaea',
                            borderWidth: 1.5,
                            borderRadius: 8,
                            color: '#64666b',
                            paddingLeft: 15,
                            paddingRight: 15,
                            fontSize: 17
                        }}
                        placeholder='Precio'
                    />
                </View>
                <TouchableOpacity onPress={() => this.guardar()}>
                    <View style={[mainStyles.btnMain, { marginTop: 14, alignContent: 'center', alignSelf: 'center', justifyContent: 'center', width: width - 50, height: 70, borderRadius: 50 }]}>
                        <Text style={[mainStyles.btntxt, { fontSize: 18 }]}>Guardar producto</Text>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}