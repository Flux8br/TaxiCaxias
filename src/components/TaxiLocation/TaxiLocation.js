import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import { View } from '@shoutem/ui';
import { PermissionsAndroid, Alert, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

export default class TaxiLocation extends Component {
    
    constructor(props) {
        super(props)

        this.socket = SocketIOClient('ws://taxicaxias.herokuapp.com/');

        this.state = { 
            location: [],
            latitude: null,
            longitude: null,
        to: [],
        lastLat: null,
        lastLong: null,
        destLat: null,
        destLong: null,
        userName: null,
        }
    }
    




    requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
          } else {
            console.log("Camera permission denied")
          }
        } catch (err) {
          console.warn(err)
        }
      }

    acceptRide = () => {

        const taxiName = "Patric";

        this.socket.emit('ride-accepted', taxiName);
    }


    componentDidMount() {


        this.socket.on('ride', (data) => {
            console.log(data);
            this.setState({ 
                to: data.to,
                lastLat: data.lastLat,
                lastLong: data.lastLong,
                destLat: data.destLat,
                destLong: data.destLong,
                userName: data.userName
            })

            Alert.alert(
                'Corrida',
                `${this.state.userName}`,
                [
                  {text: 'Aceitar', onPress: () => this.acceptRide()},
                  {text: 'Cancelar', style: 'cancel'},
                ],
                { cancelable: false }
              )
        });

        this.requestCameraPermission()
        
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                let location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                console.log(location)
                this.socket.emit('location', location);
            },
            { enableHighAccuracy: true, timeout: 20000, distanceFilter: 1},
        );
       
    }


    render() {
        return(
            <View style={TaxiLocationStyle.container}>
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                </MapView>
            </View>
        )
    }

}




const TaxiLocationStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
})