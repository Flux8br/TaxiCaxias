import {StyleSheet} from 'react-native';

import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default SearchStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    height: '100%',
    },
    innerContainer: {
      flex: 1,
    },
    bar: {
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999999999999,
    },
    search: {
      position: 'absolute',
      alignItems: 'center',
      zIndex: 2,
      top: 150,
      left: 0,
      right: 0
    },

    searchInput: {
      width: 240,
      backgroundColor: '#abb0b5',
      padding: 12,
      borderRadius: 10
    },
    searchButton: {
      backgroundColor: '#77f442',
      borderRadius: 10,
      marginLeft: -12
    }, 
    searchRows: {
      flexDirection: 'row',
      backgroundColor: '#abb0b5',
      padding: 10,
      width: 240,
      alignItems: 'center',
      marginTop: 1
    },
    row: {
      flexDirection: 'row',
    },
    alignDown:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    infoCard: {
      flex: 1,
      backgroundColor: '#fff',
      zIndex: 3,
      width: '100%',
      height: '60%',
      position: 'absolute',
      bottom: 0,
      margin: 0,
      alignItems: 'center'
    },
    buttonRound: {
      backgroundColor: '#abb0b5',
      width: 60,
      height: 60,
      padding: 5,
      borderRadius: 250,
    },
    infoCardButton: {
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: 10
    },
    info: {
      marginTop: 20,
      marginBottom: 20,
      textAlign: 'center'
    },
    buttonView: {
      alignItems: 'center'
    },
    selectCard: {
      height: 40,
      marginTop: 20
    },
    buttonGroup: {
      width: '100%',
      position: 'absolute',
      bottom: 0
    },
    searchButton: {
      backgroundColor: '#abb0b5',
      padding: 10,
      color: '#fff',
    },
    cancelButton: {
      backgroundColor: '#abb0b5',
      padding: 10,
      color: '#fff',
      position: 'absolute',
      bottom: 0,
      width: '100%'
    },
    negativeText: {
      color: '#fff'
    },
    background: {
      backgroundColor: 'rgba(80, 80, 80, 0.8)',
      zIndex: 3,
      width: '100%',
      height: '100%'
    },
    infoCardConfirm: {
      flex: 1,
      backgroundColor: '#9842f4',
      zIndex: 3,
      width: '100%',
      height: '60%',
      position: 'absolute',
      bottom: 0,
      margin: 0,
      alignItems: 'center',
      justifyContent: "center"
    },
    map: {
      width: width,
      height: height,
      flex: 1,
      zIndex: 1
    }
    

  });
  