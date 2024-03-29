import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import color from '@styles/colors'

export default function ToolBar(props){

    return (
        <View style={[props.style, { height: 64, marginTop: 0, backgroundColor: color.PRIMARYCOLOR }]}>
            {props.titulo && 
                <Text style={{ fontFamily: "Oxygen-Regular", 
                    marginTop: 18, textAlign: 'center', fontSize: 24, 
                    color: color.WHITE }}>{props.titulo}
                </Text>
            }
            {props.iconLeft &&
            <TouchableOpacity style={{ position: 'absolute', left: 20, top: 20 }} onPress={props.onPressLeft}>
                <Image style={{ tintColor: color.WHITE, width: 30, height: 30 }} source={props.iconLeft} />
            </TouchableOpacity>
            }
        </View>
    )
}

