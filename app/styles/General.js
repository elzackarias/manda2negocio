import { StyleSheet } from 'react-native'
import colors from './colors'

const imageBackgroundStyle = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.AZUL
    }
})

const splashText = StyleSheet.create({
    texto: {
        textAlign: 'center',
        fontFamily:'Montserrat-SemiBold',
        fontSize: 18,
        color: colors.WHITE
    }
})

export { imageBackgroundStyle, splashText }