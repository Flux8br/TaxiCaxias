import React, {Component} from 'react';
import {TextInput, CameraRoll, Alert, AsyncStorage} from 'react-native';
import UserDetailStyles from './UserDetailStyles';
import { RNCamera } from 'react-native-camera';
import { View, Image, Icon, Button, Title, Text} from '@shoutem/ui';
import { createSwitchNavigator } from 'react-navigation';

export default class UserDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: "",
            photos: "",
            number: "",
            dateIn: "",
            invalidName: "",
            value: "",
        }
    }

    _takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({photo: data.uri});
        }
      };

    _signInAsync = async () => {
        await AsyncStorage.setItem('userName', this.state.user);
        await this._addUser();
        this.props.navigation.navigate('App');
    }
    

    _addUser = async () => {
        const rawResponse = await fetch("http://taxicaxias.com.br/api/user/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.user,
            phone: this.state.number,
            isActive: 'hab',
        })
        
     })
        const content = await rawResponse.json()
        const id = content.toString();
        await AsyncStorage.setItem('id', id);
    }

qualquerBosta = () => {

}

    componentWillMount() {

        const { navigation } = this.props;
        const phoneNumber = navigation.getParam('phoneNumber');        
        this.setState({number: phoneNumber});

    } 

    onSubmit = async () => {
        if (this.state.user.length < 3) {
            this.setState({invalidName: "O nome deve ter no mínimo 3 letras"})
        }else{
            this.setState({invalidName: ""})
            await this._signInAsync()

        }
    }

    componentDidMount() {
        console.log(this.state.number)
    }

    _addPhoto = () => {
        Alert.alert(
            'Adicionar foto',
            'Escolha sua foto de perfil',
            [
              {text: 'Abrir Camera', onPress: () => this._takePicture},
              {text: 'Escolher fotos', onPress: () => this._handleButtonPress},
              {text: 'Cancelar', style: 'cancel'},
            ]
          )
    }
    

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'All',
        })
        .then(r => {
            this.setState({ photos: r.edges });
        })
        .catch((err) => {
            console.log(err)
        });
    };
    

    render() {
        <RNCamera
            ref={camera => { this.camera = camera }}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            style={UserDetailStyles.preview}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        return (
            <View
                style={UserDetailStyles.container}
            >
                <View>
                    <Image
                        styleName="medium-avatar"
                        defaultSource={require('../../assets/vimeo.jpg')}
                        Source={this.state.photos}
                    />
                    <Button 
                        onPress={this._addPhoto}
                        style={UserDetailStyles.addButton}
                    >
                        <Icon name="plus-button"/>
                    </Button>
                </View>
                <Title>ESCOLHA SUA FOTO E SEU NOME</Title>
                <View style={UserDetailStyles.userContainer}>
                    <TextInput
                        onChangeText={(user) => this.setState({user})}
                        style={UserDetailStyles.nameInput}
                        placeholder="Digite seu nome de Exibição"
                    />
                    <Text
                        style={UserDetailStyles.textDanger}
                    >
                        {this.state.invalidName}
                    </Text>
                </View>
                <Button
                    style={UserDetailStyles.button}
                    onPress={this.onSubmit}
                >
                    <Text>COMEÇAR</Text>
                </Button>
                
            </View>
        );
    }
}