import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function SignUpScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Sign Up Page</Text>
            <TouchableOpacity>
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    }
})