import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    Alert,
    BackHandler
} from 'react-native'
import { mainStyles, loginStyles } from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import ToolBar from '@components/ToolBar'
import color from '@styles/colors'
import { ScrollView } from 'react-native-gesture-handler'

function goToScreen(props, routeName) {
    props.navigation.navigate(routeName)
}
function goToNewScreen(props, routeName) {
    props.navigation.replace(routeName)
}


export default function RecuperarPasswordScreen(props) {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')

    useEffect(() => {
        const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => null
    }, []);


    const handleBackButton = () => {
        props.navigation.replace('Login')
        return true;
    }

    return (
        <ScrollView
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
            style={{ backgroundColor: color.BLUE3 }}>
            <StatusBar backgroundColor={color.BLUE1} translucent={false} />
            <ToolBar titulo='Recuperar Contraseña'
                onPressLeft={() => goToNewScreen(props, 'Login')}
                iconLeft={require('@recursos/images/back.png')} />
            <View style={[mainStyles.container, { padding: 20 }]}>
                {loading ? (
                    <View style={{ flex: 1, marginVertical: 175, justifyContent: 'center', alignContent: 'center', position: 'absolute', alignItems: 'center', zIndex: 800 }}>
                        <Image source={require('@recursos/images/loader.gif')} style={{ height: 70, width: 70, zIndex: 800 }} />
                    </View>
                ) : (
                        <>
                        </>
                    )}
                <Text style={mainStyles.titulos}>Recuperar{'\n'}Contraseña</Text>
                <MyTextInput keyboardType='email-address' autoCapitalize={'none'} autoCompleteType={'off'} placeholder='E-mail' value={email} onChangeText={(email) => setEmail(email)} image='user' />
                <View style={mainStyles.btnAzul}>
                    <TouchableOpacity onPress={() => Recuperar(props)}>
                        <Text style={mainStyles.btntxt}>Recuperar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

    function Recuperar(props) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == 0) {
            //Error
            Alert.alert('Ops..', 'Ingrese un correo electrónico válido plocs')
        } else {
            if (email == '') {
                Alert.alert('Ops...', 'Rellena el formulario correctamente')
            } else {
                setLoading(true);
                fetch('http://192.168.0.9/manda2/api/send_email.php?auth=ge2HXAbfaQKWViODM3c8BIJFjU6N40khTdP51CGSlL9R7E', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify({
                        email: email,
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
                            Alert.alert(responseJson.titulo, responseJson.msg, [
                                {
                                    text: "OK", onPress: () => goToNewScreen(props, 'Login')

                                }
                            ]);
                        }
                    }).catch((error) => {
                        console.error(error);
                    })
            }
        }
    }
}