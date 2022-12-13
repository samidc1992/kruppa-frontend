import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryButtonSmall from '../components/PrimaryButtonSmall';

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Welcome to Kruppa</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Elise')}>
                <Text>Elise Styles</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Nawel')}>
                <Text>Nawel Styles</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Search')}>
                <Text>Search screen</Text>
            </TouchableOpacity>
            <PrimaryButtonSmall 
            text='Sign Up' 
            onPress={() => navigation.navigate('SignUp')}/>
            <PrimaryButtonSmall 
            text='Sign In' 
            onPress={() => navigation.navigate('SignIn')}/>
            <PrimaryButton 
            text='Explore' 
            onPress={() => navigation.navigate('Search')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A474E',
    }
})