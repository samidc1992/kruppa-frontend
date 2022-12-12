import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function SignInScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Sign In Page</Text>
            <TouchableOpacity>
                <Text>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    }
})