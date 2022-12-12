import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function SearchScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Search Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    }
})