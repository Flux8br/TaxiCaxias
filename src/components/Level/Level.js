import React, { Component } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { AsyncStorage } from 'react-native';
import LevelStyles from './LevelStyles';
import { View, Text, Title, Caption, Heading, NavigationBar, Icon } from '@shoutem/ui';

export default class Level extends Component {

    constructor(props) {
        super(props)
        this.state = {
            runs: '4',
            defaultRun: '5',
            percentage: 80,
            level: '5'
        }
    }

    

    componentDidMount() { 
    }

    getLevel = async () => {
        const id = await AsyncStorage.getItem('id');
        return await fetch(`http://taxicaxias.com.br/api/travel/count/${id}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ runs: responseJson.runs, percentage: responseJson.level});
        })
        .catch((error) => {
          console.error(error);
        });
    }

    render() {
        return(
            <View style={LevelStyles.container}>
                <View style={SearchStyles.bar}>
                    <NavigationBar
                        leftComponent={<Icon name="sidebar" onPress={() => this.props.navigation.toggleDrawer()}/>}
                        centerComponent={<Title>TÁXI CAXIAS</Title>}
                        rightComponent={<View   style={SearchStyles.alignDown}><Text>7% </Text><Icon name="add-to-favorites-off"/></View>}
                    />
                </View>
                <View style={LevelStyles.innerContainer}>
                    <AnimatedCircularProgress
                        size={150}
                        width={4}
                        fill={this.state.percentage}
                        tintColor="#00e0ff"
                        backgroundColor="#3d5875">
                            {
                                (fill) => (
                                    <View>
                                        <Heading>
                                            {this.state.level}%
                                        </Heading>
                                        <Caption>{this.state.runs} / {this.state.defaultRun}</Caption>
                                    </View>
                                )
                            }
                    </AnimatedCircularProgress>
                    <Text style={LevelStyles.textContainer}> Para atingir o próximo level você precisa completar {this.state.defaultRun} viagens.</Text>
                </View>
                
            </View>
        )
    }
}