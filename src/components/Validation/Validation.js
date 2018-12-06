import React, {Component} from 'react';
import { createSwitchNavigator } from 'react-navigation';

import { 
    View,
    Title,
    Subtitle,
    Text,
    Caption
} from '@shoutem/ui';
import ValidationStyles from './ValidationStyles';

import {TextInput} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {AsyncStorage} from 'react-native';
 
export default class Validation extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            validCode: "",
            invalidFieldMessage: '',
            invalidCodeMessage: "",
            code: "",
            phoneNumber: 0,
        };
    }
    
    componentWillMount() {
        const { navigation } = this.props;
        const phoneNumber = navigation.getParam('phoneNumber');
        
        this.setState({phoneNumber: phoneNumber});
        this.getId();
       
    }
    componentDidMount() {
        this.generateCode();
       
    }

    getId = () => {
        const uniqueId = DeviceInfo.getUniqueID();
        return uniqueId;
    }
 

    generateCode = () => {
                
        var number = this.state.phoneNumber,
        number = number.replace(/\D/g, ''),
        sNumber = number.toString();
        output = [];
        for ( var i = 0, len = sNumber.length; i < len; i += 1 ) {
            output.push(+ sNumber.charAt(i));
        }
        var sumNumber = output.reduce((a, b) => a + b, 0);

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var yearDecimal = year.toString();

        yearDecimal = yearDecimal.substr(-2);
            
        //SOMA DO DIA + MES + ANO DECIMAL
        var results2 = day + month + parseInt(yearDecimal);
        
        numberStr = number.toString();

        lastFour = numberStr.substr(0, 4);
        firstFour = numberStr.substr(-4);
        date = day+''+month;
        // SUBTRACAO DO DOS 4 PRIMEIROS DIGITOS DO CELULAR COM OS 4 ULTIMOS DIGITOS. O RESULTADO SUBTRAI DO DIA E MES CORRENTE.
        var hashcomp = (firstFour - lastFour) - date;


        if ( hashcomp < 1000) {
            hashcomp = month + day;
        }
        
        //O CODE EH O RESULTADO DA SUBTRACAO ANTERIOR MAIS A STRING CONVERIDA EM INTEIRO DO RESULT1 E RESULT2
        var crypt = hashcomp + parseInt(sumNumber+''+results2);
        this.setState({validCode: crypt});
        this.setState({phoneNumber: number})
        console.log(crypt)
        var URL = `http://taxicaxias.com.br/api/${55+number}/${crypt}`
        return fetch(URL);
    }


    validCode = () => {
        
        if (this.state.code.length == 4 && this.state.code != this.state.validCode) {
            this.setState({invalidCodeMessage: "Código Inválido!"});
            this.refs.inputFour.clear()
            this.refs.inputTree.clear()
            this.refs.inputTwo.clear();
            this.refs.inputOne.clear();
            this.refs.inputOne.focus();

        } else if (this.state.code.length == 4) {
            this.setState({invalidCodeMessage: ''});
            this._signInAsync();
        }
       
    }

    handleCode = (value) => {
        this.setState({
            code: this.state.code.concat([value])
        })
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userId', this.getId());
        this.props.navigation.navigate('UserDetail' , {
            phoneNumber: this.state.phoneNumber
        });
    }

    render() {
        return (
            <View style={ValidationStyles.container}>
                <Title>CÓDIGO DE VERIFICAÇÃO</Title>
                <Subtitle style={ValidationStyles.subtitle}>Por favor insira o código de verificação este código foi enviado por SMS.</Subtitle>
                <View style={ValidationStyles.code} ref={'inputs'}>
                
                    <TextInput
                        onChangeText={
                            (value) => {
                                this.setState({code: value})
                                this.refs.inputTwo.focus()
                            }
                        }
                        style={ValidationStyles.inputCode}
                        keyboardType={'number-pad'}
                        ref={'inputOne'}
                        maxLength={1}
                        returnKeyType="next"
                        blurOnSubmit={false}
                    />
                    <TextInput
                        onChangeText={ 
                            (value) => {
                                this.handleCode(value)
                                this.refs.inputTree.focus()
                            }}
                        style={ValidationStyles.inputCode}
                        keyboardType={'number-pad'}
                        maxLength={1}
                        ref={'inputTwo'}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        
                    />
                    <TextInput
                        onChangeText={ (value) => {
                                this.handleCode(value)
                                this.refs.inputFour.focus()
                                }
                            }
                        style={ValidationStyles.inputCode}
                        keyboardType={'number-pad'}
                        ref={'inputTree'}
                        maxLength={1}
                        returnKeyType="next"
                        blurOnSubmit={false}
                    />
                    <TextInput
                        onChangeText={ (value) => {
                            this.handleCode(value)
                            this.validCode()
                        }}
                        style={ValidationStyles.inputCode}
                        keyboardType={'number-pad'}
                        ref={'inputFour'}
                        maxLength={1}
                        returnKeyType="next"
                        blurOnSubmit={false}
                    />
                </View>
                <Caption style={ValidationStyles.textDanger}>{this.state.invalidCodeMessage}</Caption>
                <Text
                    style={ValidationStyles.reenviarCodigo}
                    onPress={() => this.generateCode()}
                    onPress={() => alert('Código enviado novamente!')}
                >
                    REENVIAR CÓDIGO
                </Text>
                <Text
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    ALTERAR O NÚMERO DO CELULAR
                </Text>
            </View>
        )
    }
}
