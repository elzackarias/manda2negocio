import { StyleSheet } from 'react-native'
import color from './colors'

//Estilos para MainScreen
const mainStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#025FC9'
    },

    containerCenter: {
        paddingTop: 10,
        alignItems: 'center',
        marginBottom: 25,
    },

    titleText: {
        fontSize: 28,
        marginTop: 20,
        color: color.BLUE,
        fontFamily: "Oxygen-Regular"
    },

    titleNegocio: {
        fontSize: 23,
        color: color.BLUE,
        marginBottom: 5,
        marginTop: -5,
        fontFamily: "Oxygen-Bold"
    },

    textoNegocio: {
        fontSize: 18,
        color: color.AZUL,
        fontFamily: "Oxygen-Bold"
    },

    precio: {
        fontSize: 16,
        color: '#334e',
        fontFamily: 'Oxygen-Bold'
    },

    tituloBlanco: {
        fontSize: 20,
        color: color.WHITE,
        fontFamily: "Oxygen-Bold"
    },

    subtitleText: {
        fontSize: 20,
        //marginTop: 20,
        color: color.BLUE,
        fontFamily: "Oxygen-Regular"
    },

    txtRegistro: {
        fontSize: 18,
        marginTop: 3,
        color: color.WHITE,
        //marginBottom: -10,
        //fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "Oxygen-Bold"
    },

    btnMain: {
        width: 280,
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: color.BLUE,
        borderRadius: 60
    },

    btnMain2: {
        width: 280,
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: color.BLUE,
        borderRadius: 60
    },
    btnSec: {
        width: 280,
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: color.BLUE,
        borderRadius: 50
    },

    MainTitle: {
        fontSize: 14,
        fontFamily: 'Oxygen-Bold',
        color: color.AZUL,
        textAlignVertical: 'center',
        marginTop: 8,
    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: color.WHITE,
        width: 280,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 60
    },

    btnAzul: {
        backgroundColor: '#36E3A9',
        borderColor: '#36E3A9',
        width: 280,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 60
    },

    btnAzulito: {
        backgroundColor: color.BLUE,
        borderColor: color.BLUE,
        width: '80%',
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 60
    },

    btnCarrito: {
        backgroundColor: '#36E3A9',
        borderColor: '#36E3A9',
        width: 280,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 60
    },

    btntxt: {
        textAlign: 'center',
        fontSize: 17,
        color: color.WHITE,
        paddingVertical: 15,
        fontFamily: 'Oxygen-Bold',
    },
    btntxt2: {
        fontSize: 17,
        color: color.WHITE,
        paddingVertical: 18,
        fontFamily: 'Oxygen-Bold',
    },

    txtTransparent: {
        color: color.LIGHTPRIMARYCOLOR,
        fontSize: 14,
        fontFamily: 'Oxygen-Light',
    },

    titulos: {
        fontSize: 24,
        marginTop: 20,
        textAlign: 'center',
        color: color.WHITE,
        fontFamily: "Oxygen-Regular"
    },

    TextoAcerca: {
        color: color.WHITE,
        fontSize: 17
    }

})

//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.WHITE,
    }
})

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({

    logo: {
        paddingTop: 50,
        alignItems: 'center',
    },
})

//Estilos para RegistroScreen
const registroStyles = StyleSheet.create({

    checkBox: {
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 0,
        backgroundColor: color.WHITE,
    },

    containerSocial: {
        paddingTop: 30,
        alignItems: 'center',
        marginBottom: 10,
    },

    buttonSocialIcon: {
        marginBottom: 10,
        width: 250,
        height: 60,
        alignItems: 'center',
        borderRadius: 60,
    },
    Inputs: {
        textAlign: 'left',
        padding: 10,
        paddingLeft: 15,
        width: '90%',
        borderWidth: 2,
        borderColor: color.FACEBOOK_I,
        borderRadius: 15,
        backgroundColor: color.FACEBOOK_I,
        color: color.WHITE,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 16
    },
})

//Estilos para PersonalizarDirScreen
const personalizarStyles = StyleSheet.create({
    Inputs: {
        textAlign: 'left',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        borderWidth: 2,
        fontFamily: 'Oxygen-Regular',
        borderColor: color.FACEBOOK_I,
        borderRadius: 8,
        backgroundColor: color.FACEBOOK_I,
        color: color.BLUE,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 13
    },
})

export { mainStyles, splashStyles, loginStyles, registroStyles, personalizarStyles }