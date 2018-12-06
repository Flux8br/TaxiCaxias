import React, {Component} from 'react';
import {Text, FlatList, RefreshControl, ScrollView, Linking, AsyncStorage, Button} from 'react-native';
import CallStyles from './CallsStyles';
import { createDrawerNavigator} from 'react-navigation';

import { Icon } from '@shoutem/ui';

export default class CallList extends Component {
  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
  };


  constructor(props) {
    super(props);

    this.state = { 
      notifications: [],
      refreshing: false
    };
  }

  componentDidMount() {
    this.Notification();

  }

  Notification = async () => {
    return await fetch('http://taxicaxias.com.br/api/')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ notifications: responseJson });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.service.then(() => {
      this.setState({refreshing: false});
    });
  }

  callNumber = (url) => {
    return Linking.openURL(url);
  }

  

    render() {
      _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
        return (

          <ScrollView 
            style={CallStyles.container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            >
            <Text  style={CallStyles.title}>Chamadas</Text>
            <Button title={"Sair"} onPress={() => _signOutAsync()}></Button>
            <FlatList
              data={this.state.notifications}
              renderItem={({item}) =>
                <Text onPress={() => 
                    this.callNumber(`tel://${item.telefone.replace(/[^a-zA-Z0-9 ]/g, "")}`)} 
                    style={CallStyles.item}
                > 
                    Nome: {item.nome}{'\n'} 
                    Local: {item.partida}{'\n'} 
                    Destino: {item.destino}
                </Text>}
              keyExtractor={({id}, index) => id}
            />
          </ScrollView>

        );
      }
}
