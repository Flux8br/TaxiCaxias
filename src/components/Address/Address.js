import React, { Component } from 'react';
import { View } from 'react-native';
import { Row, Text, Icon, Button, Title, NavigationBar } from '@shoutem/ui';
import { AsyncStorage } from 'react-native';

import AddressStyles from './AddressStyles';


export default class Address extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: []
        }
        
    }

    componentDidMount() {
        this.getAddress()
    }

    _deleteAddress = async (id) => {
        const userId = await AsyncStorage.getItem('id');
        this.getAddress()
        return await fetch(`http://taxicaxias.com.br/api/address/${userId}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        
     }
        
     )
    }

    getAddress = async () => {
        const id = await AsyncStorage.getItem('id');
        return await fetch(`http://taxicaxias.com.br/api/address/${id}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ address: responseJson });
        })
        .catch((error) => {
          console.error(error);
        });
      }

    render() {
        return(
            <View style={AddressStyles.container}>
                <View style={SearchStyles.bar}>
                    <NavigationBar
                        leftComponent={<Icon name="sidebar" onPress={() => this.props.navigation.toggleDrawer()}/>}
                        centerComponent={<Title>TÁXI CAXIAS</Title>}
                        rightComponent={<View  style={SearchStyles.alignDown}><Text>7% </Text><Icon name="add-to-favorites-off"/></View>}
                    />
                </View>
                <View style={AddressStyles.innerContainer}>
                    
                    {
                        this.state.address.map((data) =>
                            <Row 
                                key={data.id}
                                styleName="small"
                                style={AddressStyles.row}
                            >
                                <Icon name="home"/>
                                <Text>{data.name}</Text>
                                <Icon 
                                    styleName="disclosure" 
                                    name="clear-text" 
                                    onPress={ () => this._deleteAddress(data.id)}
                                />
                            </Row>
                        )
                    }

                    
                </View>
                <View style={AddressStyles.addButton}>
                    <Button 
                        style={SearchStyles.cancelButton}
                        onPress={() => this.props.navigation.navigate('NewAddress')}
                    >
                        <Title style={SearchStyles.negativeText}><Icon name='plus-button'/> ADD</Title>
                    </Button>
                </View>
            </View>
        )

    }

}