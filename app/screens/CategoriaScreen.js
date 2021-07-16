import React, { Component } from 'react'
import { Text, View, Image, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';
import color from '@styles/colors'
import { mainStyles, loginStyles } from '@styles/styles'
import { floor } from 'react-native-reanimated';
import NavigationService from '@components/NavigationService';

var { height, width } = Dimensions.get('window');

// AsyncStorage.getItem("@usuario:key").then((value) => {
//     nombre = JSON.parse(value);
//     console.log(nombre.email)
// })


export default class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, dataRestaurantes: [], nombre: '' }; this.arrayholder = [];
    }
    async componentDidMount() {
        try {
            const { navigation } = this.props;
            const TiendaID = JSON.stringify(navigation.getParam('id'));
            var ncate = JSON.stringify(navigation.getParam('nombre'));
            ncate = ncate.replace(/['"]+/g, '')

            //this.setState({tienda:TiendaID})
            //console.log(this.state.information)

            //console.log(TiendaID)
            var url = "http://192.168.0.11/manda2/api/main_screen.php?type=categoria&id=";
            var link = url + TiendaID;
            return fetch(link.replace(/['"]+/g, ''))
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            isLoading: false, dataRestaurantes: responseJson.restaurantes, nombre: ncate
                        },
                        function () {
                            this.arrayholder = responseJson.restaurantes;
                        }
                    );
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            alert(error)
        }
    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignContent: 'center' }}>
                    <ActivityIndicator size="large" color={color.AZUL} style={{ height: 100 }} />
                </View>
            );
        }
        return (

            <View style={{ backgroundColor: '#ededed', flex: 1 }}>
                <View style={styles.cardShadow}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity style={{ position: 'absolute', left: 0 }} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back-outline" size={30} color={color.WHITE} style={{ marginLeft: 10, backgroundColor: color.AZUL, borderRadius: 50, height: 37, width: 37, textAlign: 'center', textAlignVertical: 'center' }} />
                        </TouchableOpacity>
                        <Text style={styles.tecsto}>{this.state.nombre}</Text>
                    </View>
                </View>
                <ScrollView style={{ paddingRight: 20, paddingLeft: 20, marginBottom:10 }}>
                    {this.state.dataRestaurantes.map((restaurante, index) => (
                        <TouchableOpacity  key={index} onPress={() => {
                            NavigationService.navigate('Negocio', { id: restaurante.id });
                        }}>

                            <View style={{
                                alignItems: 'center',
                                alignContent: 'center',
                                alignSelf: 'center',
                                backgroundColor: '#1877f2',
                                width: width - 60,
                                height: 200,
                                marginTop: 15,
                                borderRadius: 12
                            }}>
                                <Image source={{ uri: restaurante.banner }}
                                    resizeMode='cover'
                                    style={{ width: width - 60, height: 160, alignContent: 'center', borderRadius: 12 }} />
                                <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: color.WHITE, fontFamily: 'Oxygen-Bold', marginTop: 5 }}>{restaurante.nombre}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    cardShadow: {
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        justifyContent: 'center'
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        height: 65
    },
    tecsto: {
        fontFamily: 'Oxygen-Bold',
        fontSize: 22,
        color: color.AZUL
    },
    btnAzul: {
        backgroundColor: color.BLUE,
        borderColor: color.BLUE,
        width: '100%',
        padding: 6,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 2,
        bottom: 0,
        marginBottom: 35,
    }
});