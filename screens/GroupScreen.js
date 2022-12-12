import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function GroupScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Group Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})