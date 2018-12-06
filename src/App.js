
import React, {Component} from 'react';
import {CallList, Register, Validation, UserDetail, Auth, Search, Rate, Address, Travels, Level, TaxiLocation} from "./components";
import { createSwitchNavigator, createDrawerNavigator, createStackNavigator, DrawerNavigator} from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import NewAddress from './components/Address/NewAddress/NewAddress';
import SideMenu from './components/SideMenu/SideMenu';
import {YellowBox} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props)

    console.disableYellowBox = true;
  }

  componentWillMount() {
    OneSignal.init("c541a656-6ea5-4bfa-a596-d38166706d43");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  

  render() {

    return (
        <RootStack />
    );
  }
}

/*
const RootStack = createSwitchNavigator(
  {
    UserDetail: TaxiLocation
  },
  {
    initialRouteName: 'UserDetail',
  }
);*/


const AppStack = createDrawerNavigator({
  Home: Search,
  Address: Address,
  Travels: Travels,
  Level: Level,
  NewAddress: NewAddress,
  Auth: Auth
},
{
  contentComponent: SideMenu,
  initialRouteName: 'Home'
},)



const AuthStack = createSwitchNavigator(
  { 
  Register: Register, 
  Validation: Validation,
  UserDetail: UserDetail
  },{
    initialRouteName: 'Register'
  }
  );

const RootStack = createSwitchNavigator(
  {
    AuthLoading: Auth,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);