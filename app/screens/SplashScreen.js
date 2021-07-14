import React, { useContext, useEffect, useState } from 'react'
import { View, StatusBar, Text, BackHandler } from 'react-native'
import * as Animatable from 'react-native-animatable'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import { imageBackgroundStyle, splashText } from '@styles/General'
import { getUsuario } from '@storage/UsuarioAsyncStorage'
import { UsuarioContext } from '@context/UsuarioContext'
import NetInfo from "@react-native-community/netinfo";
var tki = "";
var users = "";
export default function SplashScreen(props) {

    const [login, loginAction] = useContext(UsuarioContext)
    const [internet, setInternet] = useState(false);
    const [Datos, setDatos] = useState('')
    const [tk, setTk] = useState('');

    useEffect(() => {
        messaging()
        .getToken()
        .then(token => {
           setTk(token);
        });
        fetchSesion(loginAction);
        readData();

    }, [])

    tki = tk;

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
    
    users = Datos;

    return (
        <View style={imageBackgroundStyle.image}>
            <StatusBar translucent backgroundColor='rgba(30,145,230,1)' />
            <Animatable.Image
                //animation="rubberBand"
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{
                    width: 200,
                    height: 200,
                    margin: 100,
                }}
                source={require('@recursos/images/logotipo.png')}
            />
            <Text style={[splashText.texto,{marginBottom:26}]}>PARA NEGOCIOS 😎</Text>
            <Text style={splashText.texto}>FROM</Text>
            <Text style={splashText.texto}>SHEEPSHOP INC.</Text>
            {internet ? (
                <>
                </>
            ) : (
                <Text style={[splashText.texto,{color:'#b0e2ff'}]}>No tienes conexión a Internet :c</Text>
                )}
        </View>
    )
    async function fetchSesion(loginAction) {

        const response = await getUsuario()
        console.log(response)

        const isConnect = await NetInfo.fetch();
        const conectado = isConnect.isConnected;
        setInternet(isConnect.isConnected)

        console.log(conectado)
        if (response == null && conectado == true) {
            setTimeout(() => {
                goToScreen('Login')
            }, 2600)
            return
        }

        loginAction({ type: 'sign-in', data: response })
        if (conectado == true) {
            const settings = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    id_user: users.id,
                    oldtoken: tki,
                })
            };
            try {
                const fetchResponse = await fetch('http://192.168.0.11/manda2/api/negocios.php?type=actualizar&que=tokenid', settings);
                const data = await fetchResponse.json();
                
                if(data.status == "EXITO"){
                     setTimeout(() => {
                         //goToScreen('Principal')
                         console.log(tki)
                         goToScreen('Inicio')
                     }, 500)
                }else{
                    alert('Error :c')
                }
            } catch (e) {
                alert('Ha ocurrido un error :c')
            }

        }
    }

    function goToScreen(routeName) {
        props.navigation.replace(routeName)
    }
}