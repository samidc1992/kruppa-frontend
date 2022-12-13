import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryButtonSmall from '../components/PrimaryButtonSmall';

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to Kruppa</Text>
            <Text style={styles.body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...</Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.smallBtnsContainer}>
                    <PrimaryButtonSmall 
                    text='Sign Up' 
                    onPress={() => navigation.navigate('SignUp')}/>
                    <PrimaryButtonSmall 
                    text='Sign In' 
                    onPress={() => navigation.navigate('SignIn')}/>
                </View>
                <PrimaryButton 
                text='Explore' 
                onPress={() => navigation.navigate('Search')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#3A474E',
    },
    header: {
        color: 'white',
        height: 55,
        width: '85%',
        fontSize: 34,
        fontWeight: '600',
        fontFamily: 'Inter',
    },
    body: {
        color: 'white',
        width: '85%',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Inter',
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 40,
    },
    smallBtnsContainer: {
        flexDirection: 'row',
    }
})

            // <TouchableOpacity
            //     onPress={() => navigation.navigate('Elise')}>
            //     <Text>Elise Styles</Text>
            // </TouchableOpacity>
            // <TouchableOpacity
            //     onPress={() => navigation.navigate('Nawel')}>
            //     <Text>Nawel Styles</Text>
            // </TouchableOpacity>
            // <TouchableOpacity
            //     onPress={() => navigation.navigate('Search')}>
            //     <Text>Search screen</Text>
            // </TouchableOpacity>