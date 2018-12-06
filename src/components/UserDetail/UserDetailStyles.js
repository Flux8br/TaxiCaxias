import {StyleSheet} from 'react-native';

export default UserDetailStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -199,
      padding: 30
    },
    addButton: {
      backgroundColor: "#abb0b5",
      shadowOffset:{  width: 1.5,  height: 1.5,  },
      shadowColor: 'black',
      shadowOpacity: 1.0,
      width: 35,
      height: 35,
      borderRadius: 100,
      padding: 0,
      paddingLeft: 6,
      position: "relative",
      top: -40,
      left: 110,
      borderWidth: 0
    },
    nameInput: {
      width: 340,
      borderRadius: 10,
      backgroundColor: '#abb0b5',
      padding: 15,
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 10
  },
  button:{
    backgroundColor: '#abb0b5',
    width: 340,
    paddingLeft: 115,
    paddingRight: 115,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    
  },
  preview: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  textDanger: {
    color: '#fc5050',
    marginBottom: 20
  },
  userContainer: {
    alignItems: "center"
  },
  });
  