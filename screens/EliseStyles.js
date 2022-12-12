import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function EliseStylesScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Elise Styles</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple'
    }
})