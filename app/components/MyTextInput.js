import React from 'react'
import {StyleSheet, TouchableOpacity, Image} from 'react-native'
import {Icon, Input } from 'react-native-elements'
import color from '@styles/colors'

export default function MyTextInput(props){

    return (
      <Input
        style={{alignItems: 'center'}}
        containerStyle={{marginBottom:-8,borderBottomColor: color.LIGHTPRIMARYCOLOR}}
        inputStyle={{ fontSize:18,paddingVertical: 10,
            paddingHorizontal:8, marginTop:12,
            color: color.WHITE,
            fontFamily:"Oxygen-Light",}}
        placeholderTextColor={'#95affe'}
        placeholder={props.placeholder}
        leftIconContainerStyle={{ marginLeft:0, marginTop: 14 }}
        leftIcon={<Icon size={24} color={'#e6ecff'} 
        type={'font-awesome'} name={props.image}/>}
        rightIcon={props.bolGone?
        <TouchableOpacity activeOpacity = { 0.8 } style={styles.btnVisibility} onPress = {props.onPress}>
        <Image style={ styles.btnImage} tintColor={color.WHITE} 
        source = { (props.secureTextEntry) ? require('@recursos/images/ic_show_password.png') : require('@recursos/images/ic_hide_password.png')}/>
        </TouchableOpacity>:
        <Icon size={24} color={color.WHITE}
        type={'font-awesome'} name={props.imageRight}/>}
        errorStyle={{ color: color.RED }}
        errorMessage={(props.bolError)?props.strError:''}
        editable={props.editable}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        autoCompleteType={props.autoCompleteType}
        onChangeText={props.onChangeText}
        value={props.value}/>
    )
}

const styles = StyleSheet.create({  

      btnVisibility:
      {
        height: 40,
        width: 35,
        paddingTop: 8,
        paddingLeft:5,
        paddingRight:5
      },
     
      btnImage:
      {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
      },
})

