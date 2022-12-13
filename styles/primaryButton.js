import { StyleSheet } from 'react-native';

// TO USE THIS STYLE :

// import { primaryButtonStyles } from '../styles/primaryButton';

// <TouchableOpacity style={primaryButtonStyles.button} activeOpacity={0.8}>
// <Text style={primaryButtonStyles.buttonText}>Primary Button</Text>
// </TouchableOpacity>


export const primaryButtonStyles = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '80%',
        height: 50,
        backgroundColor: '#ec6e5b',
        borderRadius: 10,
        margin: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '500',
        letterSpacing: 0.75,
        fontSize: 14,
        textTransform: 'uppercase',
        lineHeight: 17
    },
})

