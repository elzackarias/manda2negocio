import React, { useState, useEffect, useContext } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    Image,
    StatusBar,
    Alert,
    TextInput
} from 'react-native'
import { mainStyles, registroStyles } from '@styles/styles'
import ToolBar from '@components/ToolBar'
import color from '@styles/colors'
import messaging from '@react-native-firebase/messaging';
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import { UsuarioContext } from '@context/UsuarioContext'
var tkid;

function goToScreen(props, routeName) {
    props.navigation.navigate(routeName)
}
function goToNewScreen(props, routeName) {
    props.navigation.replace(routeName)
}
export default function RegistroScreen(props) {

    const [login, loginAction] = useContext(UsuarioContext)
    const [loading, setLoading] = useState(false);
    const [tk, setTk] = useState('');
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        messaging()
            .getToken()
            .then(token => {
                setTk(token);
            });
        const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => null
    }, []);


    const handleBackButton = () => {
        props.navigation.replace('Login')
        return true;
    }


    return (
        <ScrollView
            keyboardShouldPersistTaps='always'
            style={{ backgroundColor: color.BLUE3 }}>
            <StatusBar backgroundColor={color.BLUE1} translucent={false} /> 
            <ToolBar titulo='Crear Cuenta'
                onPressLeft={() => goToNewScreen(props, 'Login')}
                iconLeft={require('@recursos/images/back.png')} />
            <View style={[mainStyles.container, { padding: 20, marginTop: 0 }]}>
                {loading ? (
                    <View style={{ flex: 1, marginVertical: 175, justifyContent: 'center', alignContent: 'center', position: 'absolute', alignItems: 'center', zIndex: 800 }}>
                        <Image source={require('@recursos/images/loader.gif')} style={{ height: 70, width: 70, zIndex: 800 }} />
                    </View>
                ) : (
                        <>
                        </>
                    )}
                <Text style={mainStyles.txtRegistro}>¿Cómo te llamas?</Text>
                <TextInput
                    value={nombre}
                    onChangeText={(nombre) => setNombre(nombre)}
                    placeholder='Nombre y apellido'
                    underlineColorAndroid='transparent'
                    style={registroStyles.Inputs}
                    placeholderTextColor={color.BLUE4}
                />

                <Text style={mainStyles.txtRegistro}>¿Cuál es tu correo?</Text>
                <TextInput
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize={'none'}
                    placeholder='Correo Electrónico'
                    underlineColorAndroid='transparent'
                    style={registroStyles.Inputs}
                    placeholderTextColor={color.BLUE4}
                    keyboardType={'email-address'}
                />

                <Text style={mainStyles.txtRegistro}>¿Cuál es tu celular?</Text>
                <TextInput
                    value={telefono}
                    onChangeText={(telefono) => setTelefono(telefono)}
                    placeholder='Número de teléfono'
                    underlineColorAndroid='transparent'
                    style={registroStyles.Inputs}
                    placeholderTextColor={color.BLUE4}
                    keyboardType={'numeric'}
                    maxLength={10}
                />

                <Text style={mainStyles.txtRegistro}>Crea una contraseña</Text>
                <Text style={{ color: 'white', fontFamily: 'Oxygen-Regular' }}>Mínimo 6 caracteres</Text>
                <TextInput
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    placeholder='Contraseña'
                    underlineColorAndroid='transparent'
                    style={registroStyles.Inputs}
                    placeholderTextColor={color.BLUE4}
                    autoCompleteType={'password'}
                    secureTextEntry={true}
                    keyboardType={'default'}
                />

                <View style={[mainStyles.btnAzul, { marginTop: 10 }]}>
                    <TouchableOpacity onPress={() => Registrame(props)}>
                        <Text style={mainStyles.btntxt}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
    function Registrame(props) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == 0) {
            //Error
            Alert.alert('Ops..', 'Ingrese un correo electrónico válido plocs')
        } else {
            if ((nombre === '' || telefono === '' || password === '' || telefono === '' || telefono.length < 10)) {
                Alert.alert('Ops...', 'Rellena el formulario correctamente')
            } else {
                if (password.length >= 6) {

                    setLoading(true);
                    //MANDAMOS PETICION A SERVIDOR
                    fetch('http://192.168.0.11/manda2/api/api.php?type=register', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        body: JSON.stringify({
                            nombre: nombre,
                            email: email,
                            telefono: telefono,
                            password: password,
                            IDcel: tk,
                        })
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            setLoading(false);
                            //AsyncStorage.setItem('@usuario:key', JSON.stringify(responseJson))
                            //console.log(JSON.stringify(responseJson))
                            //Alert.alert(responseJson.status);
                            if (responseJson.status == "ERROR") {
                                //console.log(JSON.stringify(responseJson))
                                Alert.alert(responseJson.titulo, responseJson.msg);
                            } else {
                                let storedObject = [];

                                AsyncStorage.setItem('@usuario:key', JSON.stringify(responseJson))

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

                } else {
                    Alert.alert('Ops...', 'Tu contraseña debe tener mínimo 6 caracteres')
                }
            }
        }
    }
}