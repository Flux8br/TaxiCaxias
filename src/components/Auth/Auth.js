import React, {Component} from 'react';
import { createSwitchNavigator } from 'react-navigation';

import {AsyncStorage, ActivityIndicator, StatusBar, View} from 'react-native';


import DeviceInfo from 'react-native-device-info';

export default class AuthLoadingScreen extends Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userId');
      const userName = await AsyncStorage.getItem('userName');
    console.log(userName)
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken == this.getId() && userName ? 'App' : 'Auth');
    };
  
    getId = () => {
        const uniqueId = DeviceInfo.getUniqueID();
        return uniqueId;
    }
    // Render any loading content that you like here
    render() {
      return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
  