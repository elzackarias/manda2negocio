import React, { Component, Fragment, useContext } from 'react';
import {
  Text, View,
  StyleSheet, FlatList, ActivityIndicator, Platform, Image, TouchableOpacity, Dimensions
} from 'react-native';
import colors from '@styles/colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';
import NavigationService from '@components/NavigationService';
var { width } = Dimensions.get('window');

export default class Searcher extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '', isLoading: true, searchBarFocused: false, }; this.arrayholder = [];
  }
  componentDidMount() {
    return fetch('http://192.168.0.5/manda2/api/api.php?type=consulta&que=establecimientos')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false, dataSource: responseJson,
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  search = text => {
    //console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.nombre ? item.nombre.toUpperCase() :
        ''.toUpperCase();
      const textData = text.toUpperCase(); return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData, search: text,
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.4,
          width: '100%',
          backgroundColor: '#141313',
        }}
      />
    );
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 21, justifyContent: 'center', alignItems: 'center' }}>
          {/*<ActivityIndicator size="large" color={Colors.AZUL} /> */}
          <Image source={require('@recursos/images/load.gif')} style={{ height: 50, width: 50 }} />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.viewStyle}>
          <SearchBar round
            searchIcon={{ size: 25 }}
            inputContainerStyle={{ backgroundColor: 'white' }}
            containerStyle={{
              backgroundColor: '#1877f2', borderBottomColor: 'transparent',
              borderTopColor: 'transparent'
            }}
            onChangeText={text => this.SearchFilterFunction(text)} onClear={text => this.SearchFilterFunction('')} placeholder="Buscar..." value={this.state.search}
          />
          {
            this.state.search === ''
              ?
              <View style={{ alignItems: 'center' }}>
                <Image source={require('@recursos/images/cat.png')} style={{ height: 280, width: 280 }} />
                <Text style={{ textAlign: 'center', fontSize: 20, marginTop: -50, color: '#515151' }}>Busca tus negocios preferidos :3</Text>

                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                  <Text style={{ fontSize: 18, marginTop: 20, color: colors.AZUL, textAlignVertical: 'center', fontFamily: 'Oxygen-Bold' }}>
                    <Icon name="arrow-back-outline" size={20} />Volver atrás
                </Text>
                </TouchableOpacity>
              </View>
              :
              <FlatList data={this.state.dataSource} style={{ alignItems: 'center', justifyContent: 'center'}}
                renderItem={({ item }) => (
                  <Fragment>
                    <TouchableOpacity onPress={() => {
                      NavigationService.navigate('Negocio', { id: item.id });
                    }}>

                      <View style={{
                        alignItems: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                        backgroundColor: '#1877f2',
                        width: width - 60,
                        height: 200,
                        marginBottom: 15,
                        borderRadius: 12
                      }}>
                        <Image source={{ uri: item.banner }}
                          resizeMode='cover'
                          style={{ width: width - 60, height: 160, alignContent: 'center', borderRadius: 12 }} />
                        <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: colors.WHITE, fontFamily: 'Oxygen-Bold', marginTop: 5 }}>{item.nombre}</Text>
                      </View>
                    </TouchableOpacity>
                  </Fragment>
                )}
                enableEmptySections={true} style={{ marginTop: 11 }}
                keyExtractor={(item, index) => index.toString()}
              />
          }
        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: Platform.OS == 'ios' ? 29 : 0
  },
  textStyle: {
    padding: 11,
  },
});