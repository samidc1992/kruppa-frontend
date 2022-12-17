import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'
import { BACKEND_ADDRESS } from '../backendAdress';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.mygroup}>Elise's Groups</Text>
            <View>
                <PrimaryButton
                    text='Create new group'
                    onPress={() => navigation.navigate('GroupCreation')}
                />
            </View>
            <Text style={styles.baseText}>

                My groups
            </Text>
        </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#374146',
    },

    mygroup: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#ffffff',
    },
    baseText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffffff'

    }
})