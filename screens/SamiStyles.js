import { StyleSheet, Text, View } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopBar from '../components/TopBar';

export default function SamiStylesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TopBar
                text="Back to the roots"
            />
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
        justifyContent: 'center',
        backgroundColor: '#272D31'
    },
});