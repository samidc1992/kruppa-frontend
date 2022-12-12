import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { primaryButtonStyles } from '../styles/primaryButton';
import { secondaryButtonStyles } from '../styles/secondaryButton';
import { primaryButtonSmallStyles } from '../styles/primaryButtonSmall';
import { secondaryButtonSmallStyles } from '../styles/secondaryButtonSmall';

export default function EliseStylesScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Text>Elise Styles</Text>

            <TouchableOpacity style={primaryButtonStyles.button} activeOpacity={0.8}>
                <Text style={primaryButtonStyles.buttonText}>Primary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={secondaryButtonStyles.button} activeOpacity={0.8}>
                <Text style={secondaryButtonStyles.buttonText}>Secondary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={primaryButtonSmallStyles.button} activeOpacity={0.8}>
                <Text style={primaryButtonSmallStyles.buttonText}>Primary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={secondaryButtonSmallStyles.button} activeOpacity={0.8}>
                <Text style={secondaryButtonSmallStyles.buttonText}>Secondary</Text>
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