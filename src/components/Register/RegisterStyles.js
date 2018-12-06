import {StyleSheet} from 'react-native';

export default RegisterStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -199
    },
    title: {
        marginBottom: 30
    },
    phoneInput: {
        width: 340,
        borderRadius: 10,
        backgroundColor: '#abb0b5',
        padding: 15,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    },
    button:{
        backgroundColor: '#abb0b5',
        paddingLeft: 125,
        paddingRight: 125,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        marginTop: 20
        
    },
    textDanger: {
        color: '#fc5050'
    }
  });
  