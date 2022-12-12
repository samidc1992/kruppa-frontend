import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function MessagesScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Messages</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
    }
})