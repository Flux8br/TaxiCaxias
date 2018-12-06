import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, ActivityIndicator, TextInput, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon, NavigationBar, Title, Subtitle, Button} from '@shoutem/ui';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import SocketIOClient from 'socket.io-client';
import Spinner from 'react-native-spinkit';


import SearchStyles from './SearchStyles'

const homePlace = { description: 'Casa' };
const workPlace = { description: 'Trabalho'};
const items = [
    {  
          name: "Cachorro",
          id: 1,
        },{
          name: "Gato",
          id: 2,
        },{
          name: "Arara",
          id: 3,
        },{
          name: "Cadeirante",
          id: 4,
        },
    ]

const GOOGLE_MAPS_APIKEY = 'AIzaSyBPlGN-5vHbPltGo4lDOPlaOgrM5z3c4N8';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        taxiName: null,
        x: [],
        mapRegion: null,
        lastLat: null,
        lastLong: null,
        destLat: null,
        destLong: null,
        carLat: null,
        carLng: null,
        userName: null,
      destCoordinate: {},
      showSpinner: false,
      distance: null,
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      selectedItems: [],
      showInfoCard: false,
      inRoute: false,
      items: [],
      location: [],
      
    };
  
    this.mapView = null;
    this.toggleDrawer;
    this.socket = SocketIOClient('ws://taxicaxias.herokuapp.com/');

  } 

    showInfoCard = (show) => {
        if (show == true) {
            this.setState({showInfoCard: true})
        }else{
            this.setState({showInfoCard: false})
        }
    }


    confirmRun = () => {
        this.setState({showSpinner: true})
        setTimeout(() => 
        { 
        this.setState({inRoute: true, showSpinner: false, showInfoCard: false})
        }, 3000);
        console.log(this.state.lastLat, this.state.lastLong)
    }



    deg2rad = (deg) => {
        return deg * (Math.PI/180)
    }

    getDistance = (lat1,lon1,lat2,lon2) => {
            var R = 6371; 
            var dLat = this.deg2rad(lat2-lat1); 
            var dLon = this.deg2rad(lon2-lon1); 
            var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; 
            var distance =  Math.round(d);
            this.setState({distance: distance})
    }
  
 
    getNameAsync = async () => {
        const userName = await AsyncStorage.getItem('userName');
        this.setState({userName: userName})
    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    callRide = () => {
        
        

        const dest = {
            to: {
                rua: this.state.rua,
                bairro: this.state.bairro,
            },
            lastLat: this.state.lastLat,
            lastLong: this.state.lastLong,
            destLat: this.state.destLat,
            destLong: this.state.destLong,
            userName: this.state.userName,
        }

        this.socket.emit('ride', dest);
        this.setState({showSpinner: true})


/*
    this.state.distance.filter((distance) => {
        switch (distance) {
            case  setTimeout(() => 
            { 
                distance >= 50
            }, 3000) :
                
                break;
        
            default:
                break;
        }
    })
*/      
       
    }


    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    }
    

    componentDidMount() {

        this.getNameAsync();

        this.socket.on('ride-accepted', (data) => {
            this.setState({inRoute: true, showSpinner: false, showInfoCard: false})

            this.setState({taxiName: data})
        });

        console.log(this.state.x)
        this.socket.on('location', (location) => {
            this.getDistance(Number(this.state.lastLat), Number(this.state.lastLong), location.latitude, location.longitude)
            this.setState({carLat: location.latitude, carLng: location.longitude})
            console.log(location);
        });

        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
            latitude:       position.coords.latitude,
            longitude:      position.coords.longitude,
            latitudeDelta:  0.0020*1,
            longitudeDelta: 0.0020*1
            }
            this.setState({lastLat: position.coords.latitude, lastLong: position.coords.longitude})
            this.onRegionChange(true, region, region.latitude, region.longitude);
        }, (error)=>console.log(error));
        
    }


    onRegionChange(change, region, lastLat, lastLong) {
        if(change != false ) {
            this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
            });
        }
      }
    

  render() {
    var { width, height } = Dimensions.get('window')
    return (
        <View style={SearchStyles.container}>
            <View style={SearchStyles.bar}>
                <NavigationBar
                    leftComponent={<Icon name="sidebar" onPress={() => this.props.navigation.toggleDrawer()}/>}
                    centerComponent={<Title>TÁXI CAXIAS</Title>}
                    rightComponent={<View   style={SearchStyles.alignDown}><Text>7% </Text><Icon name="add-to-favorites-off"/></View>}
                />
            </View>
            <View style={SearchStyles.innerContainer}>
            { this.state.showInfoCard == true ? <View style={SearchStyles.background} onPress={() => this.showInfoCard(false)}></View> : <View></View>}

            {   
                this.state.inRoute == false
                ? <View style={SearchStyles.search}>
                        <GooglePlacesAutocomplete
                            ref="endlocation"
                            placeholder='Para onde ?'
                            predefinedPlaces={[homePlace, workPlace]}
                            minLength={3} 
                            returnKeyType={'search'} 
                            listViewDisplayed='true' 
                            fetchDetails={true}            
                            onPress={(data, details = null) => {
                                if (isNaN(details.address_components[0].long_name)) {
                                    this.setState({
                                        destCoordinate: 
                                            {
                                                latitude: details.geometry.location.lat,
                                                longitude: details.geometry.location.lng
                                            }
                                        ,
                                        rua: details.address_components[0],
                                        bairro: details.address_components[1],
                                        cidade: details.address_components[2],
                                        estado: details.address_components[3],
                                    } );
                                } else {
                                    this.setState({  
                                        destCoordinate: 
                                            {
                                                latitude: details.geometry.location.lat,
                                                longitude: details.geometry.location.lng
                                            }
                                        ,
                                        number: details.address_components[0].long_name,
                                        rua: details.address_components[1],
                                        bairro: details.address_components[2],
                                        cidade: details.address_components[3],
                                        estado: details.address_components[4],
                                    } );
                                }

                                this.onRegionChange(false)
                                this.showInfoCard(true);
                                console.log(this.state.destCoordinate)
                            }}
                            query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'pt-BR',
                            }}

                            styles={{
                                textInputContainer: {
                                    width: '80%',
                                    backgroundColor: '#FFF'
                                },
                                listView: {
                                    backgroundColor: '#FFF',
                                    width: 300
                                },
                                powered: {
                                    display: 'none',
                                }
                            }}
                            debounce={200} 
                            renderRightButton={() => <Button><Icon name="search"/></Button>}
                            nearbyPlacesAPI='GooglePlacesSearch'
                        /> 
                    
            
                </View>
                : <View></View>
            }
            
            <MapView
                flat={true}
                showsCompass={true}
                followUserLocation={true}
                loadingEnabled
                region={this.state.mapRegion}
                style={StyleSheet.absoluteFill}
                ref={c => this.mapView = c}
                onRegionChange={this.onRegionChange.bind(this)}>
                 <MapView.Marker
                    draggable
                    image={require('../../assets/location-pin.png')}
                    onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
                    coordinate={{
                        latitude: (this.state.lastLat) || -36.82339,
                        longitude: (this.state.lastLong) || -73.03569,
                    }}
                >
                
                </MapView.Marker>
                {(this.state.carLat) && (
                    <MapView.Marker
                    image={require('../../assets/taxi.png')}
                    coordinate={{
                        latitude: this.state.carLat,
                        longitude: this.state.carLng,
                    }}
                    >
                    </MapView.Marker>)
                }
                
                {(this.state.destCoordinate.latitude) && (
                    <MapView.Marker
                        image={require('../../assets/racingg.png')}
                        coordinate={this.state.destCoordinate}
                    >
                    </MapView.Marker>
                )}
                {(this.state.destCoordinate.latitude) && (
                <MapViewDirections
                    origin={{latitude: this.state.lastLat, longitude: this.state.lastLong}}
                    destination={this.state.destCoordinate}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="hotpink"
                    onStart={(params) => {  
                        console.log('info: ' + params);
                    }}
                    onReady={(result) => {
                        console.log(result)
                        this.mapView.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                            right: (width / 10),
                            bottom: (height / 10),
                            left: (width / 10),
                            top: (height / 20),
                            }
                        });
                    }}
                    onError={(errorMessage) => {
                        console.log('GOT AN ERROR');
                    }}
                />
                )}
            </MapView>
            {
                this.state.showInfoCard == true 
                ? <View style={SearchStyles.infoCard}>
                    <View style={SearchStyles.info}>
                        <View style={SearchStyles.infoRow}>
                            <Title>{this.state.rua.long_name} </Title>
                            <Title>{this.state.bairro.long_name}</Title>
                        </View>
                        <View style={SearchStyles.infoRow}>
                            <Subtitle>{this.state.cidade.long_name} </Subtitle>
                            <Subtitle>{this.state.estado.short_name}</Subtitle>
                        </View>
                        <View>
                            <TextInput
                                style={{height: 20, textAlign: 'center'}}
                                placeholder='Digite o numero'
                                onChangeText={(number) => this.setState({number: number})}
                                value={this.state.number}
                            />
                        </View>
                    </View>
                    <View style={SearchStyles.infoCardButton}>
                        <View style={SearchStyles.buttonView}>
                            <Button style={SearchStyles.buttonRound}><Text><Icon name="trophy"/></Text></Button>
                            <Text>Executivo</Text>
                        </View>
                        <View style={SearchStyles.buttonView}>
                            <Button style={SearchStyles.buttonRound}><Text><Icon name="cart"/></Text></Button>
                            <Text>Táxi</Text>
                        </View>
                    </View>
                    <View style={SearchStyles.selectCard}> 
                        <SectionedMultiSelect
                            modalSafeAreaView={true}
                            showCancelButton={true}
                            confirmText="Confirmar"
                            showChips={false}
                            items={items} 
                            uniqueKey='id'
                            selectText='Escolha um serviço'
                            searchPlaceholderText='Procurar'
                            selectedText='Selecionado '
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={this.state.selectedItems}
                            styles={{ selectToggle: { padding: 0, width: 240, height: 100, margin: 0, backgroundColor: '#ddd' }, selectToggleText: {margin: 0, padding: 4}}}
                        />
                    </View>
                    <View style={SearchStyles.buttonGroup}>
                        <Button onPress={() => this.callRide()} style={SearchStyles.searchButton}><Title style={SearchStyles.negativeText}>CONFIRMAR</Title></Button>
                        <Button 
                            style={SearchStyles.searchButton}
                            onPress={() => this.showInfoCard(false)}
                        >
                            <Title style={SearchStyles.negativeText}>CANCELAR</Title>
                        </Button>
                    </View>
                </View> 
                : <View></View>
            }
            {
                this.state.showSpinner == true
                ?   <View style={SearchStyles.infoCardConfirm}>
                        <Title style={SearchStyles.negativeText}>Quase lá, procurando algum táxi...</Title>
                        <Spinner style={{marginTop: 40}} isVisible={true} size={80} type="Wave" color={"#FFFFFF"}/>
                    </View>
                :   <View></View>
            }
            
            {   
                this.state.inRoute == true 
                ?   <Button 
                        style={SearchStyles.cancelButton}
                        onPress={() => this.setState({inRoute: false, coordinates: []})}
                    >
                        <Title style={SearchStyles.negativeText}>CANCELAR</Title>
                    </Button>
                :   <View></View>
            }
            
        </View>
        
    </View>
    );
  }
}