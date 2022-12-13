import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Welcome to Kruppa</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}>
                <Text>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigation.navigate('SignUp')}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate('Elise')}>
                <Text>Elise Styles</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate('TabNavigator')}>
                <Text>Explore</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    }
})