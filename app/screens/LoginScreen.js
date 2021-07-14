import React, { Component, useState, useContext, useEffect } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    BackHandler,
    Alert,
    Button,
    ActivityIndicator
} from 'react-native'
import { mainStyles, loginStyles } from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import color from '@styles/colors'
import AsyncStorage from '@react-native-community/async-storage'
import { UsuarioContext } from '@context/UsuarioContext'


export default function LoginScreen(props) {

    const [login, loginAction] = useContext(UsuarioContext)
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)

    // const backActionHandler = () => {
    //     Alert.alert("Hey", "Are you sure you want to go back?", [
    //         {
    //             text: "Cancel",
    //             onPress: () => null,
    //             style: "cancel"
    //         },
    //         {
    //             text: "YES", onPress: () => BackHandler.exitApp()

    //         }
    //     ]);
    //     return true;
    // };

    const backActionHandler = () => {
        BackHandler.exitApp()
    };

    useEffect(() => {

        // Add event listener for hardware back button press on Android
        BackHandler.addEventListener("hardwareBackPress", backActionHandler);

        return () =>
            // clear/remove event listener
            BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
    }, []);

    return (
        <View style={[mainStyles.container, { padding: 20 }]}>
            {loading ? (
                <View style={{ flex: 1, marginVertical: 175, justifyContent: 'center', alignContent: 'center', position: 'absolute', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={color.LIGHTPRIMARYCOLOR} style={{ height: 100 }} />
                </View>
            ) : (
                    <>
                    </>
                )}
            <StatusBar backgroundColor={color.BLUE1} translucent={false} />
            <View style={[loginStyles.logo, { marginTop: -5 }]}>
                <Image source={require('@recursos/images/logotipo.png')}
                    style={{ height: 150, width: 150 }} />
                <Text style={{fontFamily:'Oxygen-Bold', fontSize:16,color:'#fff', marginTop:-6}}>NEGOCIOS</Text>
            </View>
            <MyTextInput keyboardType='email-address' placeholder='E-mail' image='user'
                value={email} onChangeText={(email) => setEmail(email)} autoCapitalize={'none'} autoCompleteType={'off'} />
            <MyTextInput keyboardType={null} placeholder='Contraseña' image='lock' bolGone={true}
                secureTextEntry={hidePassword}
                onPress={() => setHidePassword(!hidePassword)}
                value={password} onChangeText={(password) => setPassword(password)} autoCapitalize={'none'} />
            <View style={[mainStyles.btnAzul, { marginTop: 0 }]}>
                <TouchableOpacity onPress={() => iniciarSesion(props)}>
                    <Text style={mainStyles.btntxt}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
            {/*<View><Text style={{ color: color.WHITE, marginTop: -17, marginBottom: 13, fontSize: 16 }}>ó</Text></View>
            <View style={[mainStyles.btnTransparent, { marginTop: -10 }]}>
                <TouchableOpacity onPress={() => goToNewScreen(props, 'Registro')}>
                    <Text style={[mainStyles.btntxt, { color: color.WHITE }]}>Registrarme</Text>
                </TouchableOpacity>
            </View>*/}
            <View>
                <TouchableOpacity onPress={() => goToNewScreen(props, 'RecuperarPassword')}>
                    <Text style={[mainStyles.txtTransparent, { textDecorationLine: 'underline', fontSize: 16, marginBottom: 10 }]}>Olvidé mi Contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToNewScreen(props, 'Acerca')}>
                    <Text style={[mainStyles.txtTransparent, { textDecorationLine: 'underline', fontSize: 16, textAlign: 'center' }]}>Acerca</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
    function iniciarSesion(props) {
        setLoading(true);
        if ((email !== '') && (password !== '')) {
            fetch('http://192.168.0.11/manda2/api/negocios.php?type=login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    setLoading(false);
                    //AsyncStorage.setItem('@usuario:key', JSON.stringify(responseJson))
                    //console.log(JSON.stringify(responseJson))
                    //Alert.alert(responseJson.status);
                    if (responseJson.status == "ERROR") {
                        console.log(JSON.stringify(responseJson))
                        Alert.alert(responseJson.titulo, responseJson.msg);
                    } else {
                        let storedObject = [];
                        /*let direcciones = responseJson.direcciones;
                        //console.log(direcciones.length)
                        if(direcciones.length >= 1){
                            let defaultDir = { 'id_dir': direcciones[0].id, 'index_dir':0  }
                            AsyncStorage.setItem('defaultDir', JSON.stringify(defaultDir))
                        }else{
                            let xd = [];
                            AsyncStorage.setItem('defaultDir', JSON.stringify(xd))
                        }*/
                        // direcciones.push({'id':1,'nombre':'Agua','qty':3,'subtotal':36,"negocio":1})
                        //let info = { 'carrito': false, 'qty': 0, 'negocio': 0 }
                        AsyncStorage.setItem('@usuario:key', JSON.stringify(responseJson.datos))
                        //AsyncStorage.setItem('carrito', JSON.stringify(storedObject))
                        //AsyncStorage.setItem('direcciones', JSON.stringify(direcciones))
                        //AsyncStorage.setItem('cart_info', JSON.stringify(info))
                        loginAction({
                            type: 'sign', data: {
                                email, password
                            }
                        })
                        goToNewScreen(props, 'Inicio')
                    }
                }).catch((error) => {
                    console.error(error);
                })
            //goToScreen(props, 'Inicio')
        } else {
            setLoading(false);
            Alert.alert('Heey', 'Primero rellena los campos 😡')
        }
    }

    function goToScreen(props, routeName) {
        props.navigation.navigate(routeName)
    }
    function goToNewScreen(props, routeName) {
        props.navigation.replace(routeName)
    }
}