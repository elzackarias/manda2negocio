import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Alert, Image, BackHandler } from 'react-native'
import color from '@styles/colors'
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons';
import { mainStyles, loginStyles } from '@styles/styles'

var { height, width } = Dimensions.get('window');
const latitudeDelta = 0.0025;
const longitudeDelta = 0.001;

export default class MapaScreen extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        const coordenadas = props.navigation.getParam('coords');
        this.state = {
            region: {
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
            },
            dataAddress: 'Cargandoo....',
            isLoading: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            isLoading: false
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        //alert(this.state.region.latitude)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._isMounted = false;
    }

    handleRegionChange = mapData => {
        this.setState({
            markerData: { latitude: mapData.latitude, longitude: mapData.longitude },
            mapData,
        });
        //this.getAdressInfo();
    };

    handleBackButtonClick = () => {
        //this.props.navigation.goBack(null);
        return true;
    };

    onChangeValue = region => {
        //alert(JSON.stringify(region)) 
        this.setState({
            region
        })
        setTimeout(() => {
            this.getAdressInfo();
        }, 1080)
    }

    getAdressInfo = async () => {

        try {
            const response = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.state.region.latitude + '&lon=' + this.state.region.longitude, { headers: { 'User-Agent': 'Reverse geocode search' } });
            const datos = await response.json();
            //var calle = datos.address.road + ', ' + datos.address.town + ', ' + datos.address.county + ', Gro.';
            this.setState({ dataAddress: datos.display_name })
            console.log(datos.display_name)
        } catch (error) {
            console.log(error)
        }
    }

    nextScreen = () => {
        this.props.navigation.replace('Personalizar', { coords: this.state.region, nombre: this.state.dataAddress })
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
            <View style={{ flex: 1, backgroundColor: color.BLUE, paddingLeft: 10, paddingRight: 10, flexDirection: 'column' }}>
                <View style={{ height: 70, justifyContent: 'center' }}>
                    <TouchableOpacity style={{ left: 0 }} onPress={() => this.props.navigation.replace('Opciones')}>
                        <Icon name="arrow-back-outline" size={30} color={color.AZUL} style={{ marginLeft: 2, backgroundColor: color.WHITE, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: height - 70, backgroundColor: color.WHITE, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Oxygen-Bold', color: color.BLUE, fontSize: 18, marginBottom: 10 }}>Localiza tu domicilio</Text>
                        <Text style={{ textAlign: 'center', fontFamily: 'Oxygen-Regular', fontSize: 13, color: color.BLUE }}>
                            <Icon name="ios-location-sharp" size={18} /> {this.state.dataAddress}
                        </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={this.state.region}
                            onRegionChangeComplete={this.onChangeValue} />
                        <View style={{ top: '50%', left: '50%', marginLeft: -30, marginTop: -48, position: 'absolute' }}>
                            <Animatable.Image animation="slideInDown" style={{ width: 60, height: 60 }} source={require('@recursos/images/marker-1.png')} />
                        </View>
                        <Text style={{ position: 'absolute', top: 0, textAlign: 'center', alignSelf: 'center', backgroundColor: '#1fc7ffc7', color: 'white', fontFamily: 'Oxygen-Bold', padding: 2, width: '70%', borderRadius: 10, marginTop: 10 }}>Ajusta el marcador a tu domicilio</Text>
                        {/* <Text style={{ textAlign: 'center', marginTop: -10, fontSize: 18 }}>{this.state.dataAddress}</Text> */}
                    </View>
                </View>
                <View style={[mainStyles.btnAzulito, { marginTop: 0, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 0 }]}>
                    <TouchableOpacity onPress={this.nextScreen}>
                        <Text style={mainStyles.btntxt}>Siguiente</Text>
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