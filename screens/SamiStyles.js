import { StyleSheet, Text, View } from 'react-native';
import TrippleTab from '../components/TrippleTab'

export default function SamiStylesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TrippleTab 
            textTabLeft="search"
            textTabMiddle="sign in"
            textTabRight="join now"
            onPressLeft={() => navigation.navigate('Search')}
            onPressMiddle={() => navigation.navigate('SignIn')}
            onPressRight={() => navigation.navigate('SignUp')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272D31'
    },
});