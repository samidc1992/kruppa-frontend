import { StyleSheet, Text, View } from 'react-native';
import DoubleTab from '../components/DoubleTab'

export default function SamiStylesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <DoubleTab 
            textTabLeft="search"
            textTabRight="join now"
            onPressLeft={() => navigation.navigate('Search')}
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