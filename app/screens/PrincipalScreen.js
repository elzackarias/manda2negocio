import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { mainStyles } from '@styles/styles'
import color from '@styles/colors'
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import { UsuarioContext } from '@context/UsuarioContext'
import NavigationService from '@components/NavigationService';
import AsyncStorage from '@react-native-community/async-storage'

var { height, width } = Dimensions.get('window');

export default function PrincipalScreen(props) {

    const [login, loginAction] = useContext(UsuarioContext)
    const [tk, setTk] = useState('');
    const [Datos, setDatos] = useState('')
    const [dataNegocios, setDataNegocios] = useState([]);
    const [dataCategorias, setDataCategorias] = useState([]);

    useEffect(() => {
        readData();
        messaging()
            .getToken()
            .then(token => {
                setTk(token);
            });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            //props.navigation.navigate('Ordenes', { token: tk })
            Alert.alert('Nueva orden xdlol','xddlol')
            console.log('Message handled in the background!', JSON.stringify(remoteMessage));
        });

        const url = "http://192.168.0.5/manda2/api/main_screen.php?type=main"
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {

                setDataNegocios(responseJson.descubrir);
                setDataCategorias(responseJson.categorias);

            })
            .catch((error) => {
                console.error(error);
            });
        //console.log(dataBanner)
        return () => {
            unsubscribe();
        };
    }, []);

    const readData = async () => {
        try {
            const Datos = await AsyncStorage.getItem("@usuario:key")
            setDatos(JSON.parse(Datos))

            //   if (userData !== null) {
            //     Datos(userData)
            //   }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Aqui incia el Swiper de los banners de promocion */}
            <Image style={styles.imageBanner} resizeMode="cover" source={{ uri: Datos.banner }} />
            <TouchableOpacity onPress={() => { props.navigation.navigate('ManageProducts', { token: tk }) }}>
                <View style={[mainStyles.btnMain2, { marginTop: 0, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }]}>
                    <Icon name="ios-settings-sharp" size={18} style={{ color: color.WHITE, textAlignVertical: 'center' }} /><Text style={mainStyles.btntxt2}> Gestionar productos</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { props.navigation.navigate('Ordenes', { token: tk }) }}>
                <View style={[mainStyles.btnMain2, { marginTop: 0, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }]}>
                    <Icon name="ios-receipt-sharp" size={18} style={{ color: color.WHITE, textAlignVertical: 'center' }} /><Text style={mainStyles.btntxt2}> Ordenes</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => desconectarse(props)}>
                <View style={[mainStyles.btnMain2, { marginTop: 0, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }]}>
                    <Icon name="ios-log-out-outline" size={19} style={{ color: color.WHITE, textAlignVertical: 'center' }} /><Text style={mainStyles.btntxt2}> Cerrar Sesión</Text>
                </View>
            </TouchableOpacity>

        </ScrollView>
    )

    function goToScreen(props, routeName) {
        props.navigation.replace(routeName)
    }

    function desconectarse(props) {
        Alert.alert(
            "Salir",
            "¿Está seguro que desea cerrar sesión? 😳",
            [
                {
                    text: "Si", onPress: () => {
                        loginAction({
                            type: 'sign-out',
                            data: {}
                        })
                        props.navigation.replace('Login')
                    }
                },
                {
                    text: "No", onPress: () => { }, style: 'cancel'
                }
            ]
        )
    }

}

const styles = StyleSheet.create({
    imageBanner: {
        height: width / 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flex: 1,
        marginBottom: 18,
    },
    subtitulo: {
        fontFamily: 'Oxygen-Regular',
        color: 'black',
        fontSize: 16,
        textAlignVertical: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 3
    }
});