import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Title } from '@shoutem/ui';
import { AsyncStorage } from 'react-native';

import NewAddressStyles from './NewAddressStyles'

export default class NewAddress extends Component {

    static navigationOptions = {
        drawerLabel: 'Notifications',
      };

    constructor(props) {
        super(props)
        this.state = { 
            Name: '',
            Address: ''
        };
    }
    _addUser = async () => {
        const userId = await AsyncStorage.getItem('id');
        return await fetch("http://taxicaxias.com.br/api/address/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            address: this.state.Address,
            name: this.state.Name,
            latitude: '4324234',
            longitude: '4234234'
        })
        
     })
    }

    render() {
        return(
            <View style={NewAddressStyles.container}>
                <TextInput
                    style={{height: 40, backgroundColor: '#ededed', width: '80%', padding: 5, marginBottom: 15 }}
                    onChangeText={(value) => this.setState({Name: value})}
                    placeholder={'Nome'}
                />
                <TextInput
                    style={{height: 40, backgroundColor: '#ededed', width: '80%', padding: 5 }}
                    onChangeText={(value) => this.setState({Address: value})}
                    placeholder={'Endereço'}
                />
                <Button 
                    style={SearchStyles.cancelButton}
                    onPress={() => 
                        {
                            this._addUser()
                            this.props.navigation.navigate('Address')
                        }
                    }
                >
                    <Title style={SearchStyles.negativeText}>SALVAR</Title>
                </Button>
            </View>
        )
    }

}