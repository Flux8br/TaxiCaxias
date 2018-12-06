import React, { Component } from 'react';

import TravelsStyles from './TravelsStyles';
import {Subtitle, View, Title, NavigationBar, Icon, Text} from '@shoutem/ui';
import { AsyncStorage } from 'react-native';


export default class Travels extends Component {

    constructor(props) {
        super(props)
        this.state = {
            travels: [],
        }
    } 

    componentDidMount() {
        this.getTravels()
    }

    getTravels = async () => {
        const id = await AsyncStorage.getItem('id');
        return await fetch(`http://taxicaxias.com.br/api/travel/${id}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ travels: responseJson });
        })
        .catch((error) => {
          console.error(error);
        });
      }

    render() {
        return(
            <View style={TravelsStyles.container}>
                <View style={SearchStyles.bar}>
                    <NavigationBar
                        leftComponent={<Icon name="sidebar" onPress={() => this.props.navigation.toggleDrawer()}/>}
                        centerComponent={<Title>TÁXI CAXIAS</Title>}
                        rightComponent={<View   style={SearchStyles.alignDown}><Text>7% </Text><Icon name="add-to-favorites-off"/></View>}
                    />
                
            </View>
                <View style={TravelsStyles.innerContainer}>
                {
                    this.state.travels.map((data) =>
                <View
                    key={data.id}
                    styleName="vertical"
                    style={TravelsStyles.card}
                 >  
                    <View styleName="horizontal space-between">
                        <Subtitle>Data:</Subtitle>
                        <Text>{data.date}</Text>
                    </View>
                    <View styleName="horizontal space-between">
                        <Subtitle>De:</Subtitle>
                        <Text>{data.ini}</Text>
                    </View>
                    <View styleName="horizontal space-between">
                        <Subtitle>Para:</Subtitle>
                        <Text>{data.dest}</Text>
                    </View>
                </View>
                )}
                
                </View>
                
                
            </View>
        )
    }

}