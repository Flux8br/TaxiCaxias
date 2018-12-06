import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { NavigationBar, Icon, Title, Text, Subtitle, Heading, Button } from '@shoutem/ui'
import StarRating from 'react-native-star-rating';

import RateStyle from './RateStyle';

export default class Rate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            starCount: 0.5,
            rateText: '',
          };
    }


    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
    }

    render() {
        return(
            <View style={RateStyle.container}>
                <View style={RateStyle.taxiInfo}>
                    <View style={RateStyle.taxiImage}>
                        <Image
                            style={RateStyle.image}
                            source={require('../../assets/vimeo.jpg')}
                        />
                    </View>
                    <View style={RateStyle.taxiName}>
                        <Heading>TAXISTA</Heading>
                        <Title>Patric Pippi</Title>
                    </View>
                </View>
                <View style={RateStyle.taxiRate}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                </View>
                <TextInput
                    style={{ backgroundColor: '#ededed', height: '15%', width: '70%', padding: 10}}
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={(value) => this.setState({rateText: value})}
                    placeholder={'Deixe sua mensagem.'}
                />
                <Button 
                    style={SearchStyles.cancelButton}
                >
                    <Title style={SearchStyles.negativeText}>AVALIAR</Title>
                </Button>
            </View>
        )
    }
}