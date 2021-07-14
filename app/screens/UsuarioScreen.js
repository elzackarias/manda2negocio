import React, { useContext, useEffect, useState } from 'react'
import {
    Text, View, TouchableOpacity, TouchableHighlight, Dimensions, Alert, Image, Linking
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import color from '@styles/colors'
import { mainStyles, loginStyles } from '@styles/styles'
import { UsuarioContext } from '@context/UsuarioContext'
import NavigationService from '@components/NavigationService';

import AsyncStorage from '@react-native-community/async-storage'
var { height, width } = Dimensions.get('window');
// AsyncStorage.getItem("@usuario:key").then((value) => {
//     Datos = JSON.parse(value);
//     console.log(Datos)
// })

//console.log(Datos)

export default function LoginScreen(props) {
    const [Datos, setDatos] = useState('')
    const [login, loginAction] = useContext(UsuarioContext)
    useEffect(() => {
        readData();
    }, [])


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
        <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
            <TouchableOpacity style={{ position: 'absolute', zIndex: 100, left:0 }} onPress={() => NavigationService.navigate('Inicio')}>
                <Icon name="arrow-back-outline" size={30} color={color.AZUL} style={{ marginTop: 10, marginLeft: 10, backgroundColor: color.WHITE, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
            </TouchableOpacity>
            <View style={{ backgroundColor: '#355db0', width: width, height: 235, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: Datos.logo }} style={{ height: 110, width: 110, borderRadius:100 }} />
                <Text style={{ color: color.WHITE, fontSize: 20, fontFamily: 'Oxygen-Bold', marginBottom: 3 }}>{Datos.nombre}</Text>
                <Text style={{ color: color.WHITE, fontSize: 15, marginBottom: 3 }}>{Datos.email}</Text>
                <Text style={{ color: color.WHITE, fontSize: 15 }}>{Datos.telefono}</Text>
            </View>
            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => feedback()} style={{ backgroundColor: '#cff0ff', width: width - 40, height: 45, borderRadius: 14, justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}>
                    <Icon name="chatbox-ellipses" size={25} color={color.AZUL} style={{ textAlignVertical: 'center' }} />
                    <Text style={{ fontSize: 17, fontFamily: 'Oxygen-Bold', color: color.AZUL, textAlignVertical: 'center' }}> Sugerencias :3</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => help()} style={{ backgroundColor: '#cff0ff', width: width - 40, height: 45, borderRadius: 14, justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}>
                    <Icon name="ios-help-buoy" size={25} color={color.AZUL} style={{ textAlignVertical: 'center' }} />
                    <Text style={{ fontSize: 17, fontFamily: 'Oxygen-Bold', color: color.AZUL, textAlignVertical: 'center' }}> Soporte Técnico</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => desconectarse(props)}>
                    <Text style={{ color: color.BLUE, fontSize: 21, fontFamily: 'Oxygen-Bold' }}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 115 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: '#c4c4c4' }}>By José Zacarías</Text>
                <Text style={{ textAlign: 'center', fontSize: 15, color: '#c4c4c4' }}>Version 1.0.0</Text>
            </View>
        </View>
    );

    function goToScreen(props, routeName) {
        props.navigation.replace(routeName)
    }

    function feedback() {
        Linking.openURL('whatsapp://send?text=Holaa, tengo una sugerencia sobre Manda2 :3&phone=527471441396');
    }

    function help() {
        Linking.openURL('whatsapp://send?text=Holaa, tengo un problema con Manda2 ...&phone=527471441396');
    }

    function desconectarse(props) {

        Alert.alert(
            "Salir",
            "¿Está seguro que desea cerrar sesión?",
            [
                {
                    text: "Si", onPress: () => {
                        loginAction({
                            type: 'sign-out',
                            data: {}
                        })
                        NavigationService.navigate('Login')
                    }
                },
                {
                    text: "No", onPress: () => { }, style: 'cancel'
                }
            ]
        )
    }
}