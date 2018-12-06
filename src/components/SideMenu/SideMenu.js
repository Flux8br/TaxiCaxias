import React, { Component } from 'react';
import { View, Image, Icon, Title, Subtitle } from '@shoutem/ui';
import {NavigationActions} from 'react-navigation';
import SideMenuStyles from './SideMenuStyles';
import { AsyncStorage } from 'react-native';




export default class SideMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            rate: 4.7
        }
    }



    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
      }

    getNameAsync = async () => {
        const userName = await AsyncStorage.getItem('userName');
        this.setState({userName: userName})
    }
    
    componentDidMount () {
        this.getNameAsync()
    }
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.navigateToScreen('Auth');
      };

    render() {
        
        return(
            <View style={SideMenuStyles.container}>
                <View style={SideMenuStyles.userContainer}>
                    <Image
                        style={SideMenuStyles.image}
                        source={require('../../assets/vimeo.jpg')}
                    />
                    <Title style={SideMenuStyles.textNegative}>{this.state.userName}</Title>
                    <View style={SideMenuStyles.rate}>
                        <Subtitle style={SideMenuStyles.textRate}>{this.state.rate}</Subtitle>
                        <Icon style={SideMenuStyles.icon} name="add-to-favorites-off" />
                    </View>
                    
                </View>
                <View style={{flexDirection: 'row', marginTop: 15, padding: 10}}>
                    <Icon name="search" />
                    <Title 
                        style={{marginLeft: 20}}
                        onPress={this.navigateToScreen('Home')}
                    >
                        PEDIR TÁXI
                    </Title>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15, padding: 10}}>
                    <Icon name="maps" />
                    <Title 
                        style={{marginLeft: 20}}
                        onPress={this.navigateToScreen('Travels')}
                    >
                        VIAGENS
                    </Title>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15, padding: 10}}>
                    <Icon name="home" />
                    <Title 
                        style={{marginLeft: 20}}
                        onPress={this.navigateToScreen('Address')}
                    >
                        ENDEREÇOS
                    </Title>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15, padding: 10}}>
                    <Icon name="deals" />
                    <Title 
                        style={{marginLeft: 20}}
                        onPress={this.navigateToScreen('Level')}
                    >
                        DESCONTOS
                    </Title>
                </View>
                
                <Subtitle 
                    style={{marginTop: 15, padding: 5}}
                    onPress={this._signOutAsync}
                >
                    Temos/Condiçōes
                </Subtitle>
            </View>
        )
    }
}