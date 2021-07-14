import React, { Component, Fragment } from 'react'
import {
    Text, View, Image, StyleSheet, TouchableOpacity
} from 'react-native'

class Category extends Component {
    render() {
        return (
            <TouchableOpacity>
                <View style={{ height: 120, width: 120, marginRight: 10, borderRadius: 10, backgroundColor: this.props.color, borderColor: 'rgba(0, 0, 0, 0.05)', borderWidth: .5 }}>
                    <View style={{ flex: this.props.flex }}>
                        <Image source={this.props.imageUri}
                            style={{ flex: 1, width: null, height: null, resizeMode: 'center' }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Oxygen-Regular', fontSize: 15 }}>{this.props.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        );
    }
}
export default Category;