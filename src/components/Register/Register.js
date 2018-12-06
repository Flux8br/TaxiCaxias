import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { TextInputMask } from 'react-native-masked-text'
import {
    Title,
    View,
    Button,
    Text,
    Caption
} from '@shoutem/ui';

import RegisterStyles from './RegisterStyles';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
        };
    }


    validPhone = () => {
        if (this.refs.phoneInputValid.isValid()) {
            this.props.navigation.navigate('Validation', {
                phoneNumber: this.refs.phoneInputValid.state.value
              });
            this.setState({showMessage: false});
        }else{
            this.setState({showMessage: true});
        }
    }

    setValue = (e) => {
        e.preventDefault();
        this.setState({ phoneNumber: e.target.value });
    }

    render() {

    let showMessage = this.state.showMessage ? 'Por favor digite seu celular!' : '';
    
    return (
        <View style={RegisterStyles.container}>
            <Title style={RegisterStyles.title}>TAXI CAXIAS</Title>
            <TextInputMask
                ref={'phoneInputValid'}
                keyboardType={'phone-pad'}
                type={'cel-phone'}
                style={RegisterStyles.phoneInput}
                placeholder={'Digite seu DDD + Número de celular'}
            />
            <Caption style={RegisterStyles.textDanger}>{showMessage}</Caption>
            <Button 
                
                style={RegisterStyles.button}
                onPress={() => 
                    this.validPhone()
                }
            >
                <Text>CONTINUAR</Text>
            </Button>
        </View>

        
    );
  }
}