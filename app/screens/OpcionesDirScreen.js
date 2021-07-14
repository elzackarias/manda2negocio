import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, PermissionsAndroid, Alert, Image, ScrollView, BackHandler } from 'react-native'
import color from '@styles/colors'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';

var { height, width } = Dimensions.get('window');

export default class OpcionesDir extends Component {

    constructor(props) {
        super(props);
        this.state = { coordenadas: [], isLoading: true, isLoadingN: true, dataDirecciones: [], id_usuario: 0, defaDir:[] };
    }

    componentDidMount() {
        this.setState({
            isLoading: false,
            isLoadingN: false
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        AsyncStorage.getItem("direcciones").then((value) => {
            let direccion = JSON.parse(value);
            this.setState({ dataDirecciones: direccion });
        });

        AsyncStorage.getItem("defaultDir").then((value) => {
            let defaultDir = JSON.parse(value);
           // console.log(defaultDir)
            this.setState({ defaDir: defaultDir });
            // console.log(this.state.defaDir.id_dir)
        });

        AsyncStorage.getItem("@usuario:key").then((value) => {
            let info = JSON.parse(value);
            this.setState({ id_usuario: info.id });
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._isMounted = false;
    }

    handleBackButtonClick = () => {
        //this.props.navigation.goBack(null);
        return true;
    };

    seleccionarMap = () => {
        this.props.navigation.replace('MapaBusca')
    }

    requestLocationPermission = async () => {
        this.setState({ isLoading: true })
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                Geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({ coordenadas: position.coords })
                        setTimeout(() => {
                            this.props.navigation.replace('Mapa', { coords: this.state.coordenadas })
                        }, 2000)
                        console.log(position);
                        //alert(position.coords.latitude)
                        //alert(position.coords.longitude)
                    },
                    (error) => {
                        // See error code charts below.
                        this.setState({ isLoading: false })
                        Alert.alert('Ops..', 'Por favor acepte para poder obtener su ubicación :3')
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );

            } else {
                this.setState({ isLoading: false })
                Alert.alert('Ops..', 'Por favor conceda el permiso para obtener su ubicación :3')
            }
        } catch (err) {
            console.warn(err);
        }
    };

    borrar(index, id) {
        Alert.alert("¡Epale!", "¿Estás seguro de borrar está dirección?", [
            {
                text: "No",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Si", onPress: () => this.actionBorrar(index, id, this.state.id_usuario)

            }
        ]);
    }

    DefaultDir(index,id){
        let defaultDir = { 'id_dir': id, 'index_dir':index  }
        AsyncStorage.setItem('defaultDir', JSON.stringify(defaultDir))
        this.props.navigation.replace('Carrito')
    }

    actionBorrar(index, id, usuario) {
        this.setState({ isLoadingN: true })
        let link = 'http://192.168.0.5/manda2/api/api.php?type=borrar&que=direccion&user=' + usuario + '&id_direccion=' + id;
        fetch(link)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status == "OK") {
                    this.state.dataDirecciones.splice(index, 1)
                    let nuevo = this.state.dataDirecciones;
                    AsyncStorage.setItem("direcciones", JSON.stringify(this.state.dataDirecciones))
                    this.setState({ dataDirecciones: nuevo, isLoadingN: false })
                    if(this.state.defaDir.id_dir == id){
                        console.log('Hijole es la misma xd')
                        const vacio = [];
                        AsyncStorage.setItem("defaultDir", JSON.stringify(vacio))
                    }
                } else {
                    Alert.alert(responseJson.titulo, responseJson.msg)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignItems: 'center' }}>
                    {/*<ActivityIndicator size="large" color={Colors.AZUL} /> */}
                    <Image source={require('@recursos/images/load.gif')} style={{ height: 50, width: 50 }} />
                    <Text style={{ textAlign: 'center' }}>Obteniendo tu ubicación....</Text>
                </View>
            );
        }
        if (this.state.isLoadingN) {
            return (
                <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignItems: 'center' }}>
                    {/*<ActivityIndicator size="large" color={Colors.AZUL} /> */}
                    <Image source={require('@recursos/images/load.gif')} style={{ height: 50, width: 50 }} />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: color.BLUE, paddingLeft: 10, paddingRight: 10, flexDirection: 'column' }}>
                <View style={{ height: 70, justifyContent: 'center' }}>
                    <TouchableOpacity style={{ left: 0 }} onPress={() => this.props.navigation.replace('Carrito')}>
                        <Icon name="arrow-back-outline" size={30} color={color.AZUL} style={{ marginLeft: 2, backgroundColor: color.WHITE, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: height - 70, backgroundColor: color.WHITE, borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: 22 }}>
                    <Text style={{ textAlign: 'center', color: color.BLUE, fontFamily: 'Oxygen-Bold', fontSize: 17 }}>Añadir nueva dirección</Text>

                    <TouchableOpacity onPress={this.requestLocationPermission} style={{ backgroundColor: '#cff0ff', width: '100%', height: 47, borderRadius: 20, justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
                        <Icon name="locate-outline" size={25} color={color.AZUL} style={{ textAlignVertical: 'center' }} />
                        <Text style={{ fontSize: 15, fontFamily: 'Oxygen-Bold', color: color.AZUL, textAlignVertical: 'center' }}> Usar ubicación actual</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.seleccionarMap} style={{ backgroundColor: '#cff0ff', width: '100%', height: 47, borderRadius: 20, justifyContent: 'center', flexDirection: 'row', marginTop: 8 }}>
                        <Icon name="add-circle-outline" size={25} color={color.AZUL} style={{ textAlignVertical: 'center' }} />
                        <Text style={{ fontSize: 15, fontFamily: 'Oxygen-Bold', color: color.AZUL, textAlignVertical: 'center' }}> Buscar dirección en el mapa</Text>
                    </TouchableOpacity>

                    <Text style={{ textAlign: 'center', color: color.BLUE, fontFamily: 'Oxygen-Bold', fontSize: 17, marginTop: 14, marginBottom: 14 }}>Mis direcciones:</Text>
                    <ScrollView>
                        {this.state.dataDirecciones.map((direccion, index) => (
                            <TouchableOpacity key={index} onPress={() => this.DefaultDir(index, direccion.id)} style={{ width: '100%', flexDirection: 'row', borderRadius: 12, backgroundColor: '#cff0ff', padding: 5, marginBottom: 10 }}>
                                <Text style={{ textAlignVertical: 'center', padding: 5 }}><Icon name="ios-location-sharp" size={18} style={{ color: color.BLUE, textAlignVertical: 'center' }} /></Text>
                                <Text style={{ color: color.BLUE, flex: 1, fontSize: 12, textAlignVertical: 'center', textAlign: 'center', fontFamily: 'Oxygen-Regular' }}>{direccion.titulo}</Text>
                                <TouchableOpacity onPress={() => this.borrar(index, direccion.id)}>
                                    <Icon name="trash" size={23} style={{ color: color.BLUE, textAlignVertical: 'center', padding: 5 }} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}

                        {
                            this.state.dataDirecciones.length == 0
                                ?
                                <Text style={{ textAlign: 'center', fontFamily: 'Oxygen-Bold', fontSize: 15, color: '#C22613'}}>No tienes ninguna dirección 😔</Text>
                                :
                                <>
                                </>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}