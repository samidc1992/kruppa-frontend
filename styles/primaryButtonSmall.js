import { StyleSheet } from 'react-native';

// TO USE THIS STYLE :

// import { primaryButtonSmallStyles } from '../styles/primaryButtonSmall';

// <TouchableOpacity style={primaryButtonSmallStyles.button} activeOpacity={0.8}>
// <Text style={primaryButtonSmallStyles.buttonText}>Primary</Text>
// </TouchableOpacity>

export const primaryButtonSmallStyles = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '40%',
        height: '10%',
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

