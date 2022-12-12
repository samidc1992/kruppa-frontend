import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { PrimaryButtonstyles } from '../styles/primaryButton';

export default function EliseStylesScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Text>Elise Styles</Text>

            <TouchableOpacity style={PrimaryButtonstyles.primaryButton} activeOpacity={0.8}>
                <Text style={PrimaryButtonstyles.textPrimaryButton}>Primary Button</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A474E'
    },

})