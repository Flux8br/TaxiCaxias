import { StyleSheet } from 'react-native';

export default RateStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    taxiInfo: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 150,
        marginBottom: 80
    },
    taxiName: {
        marginTop: 20
    },
    taxiRate: {
        width: '70%',
        marginBottom: 30
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100/2
    }
})