import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function SignUpProfileScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>SignUpProfile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    }
})