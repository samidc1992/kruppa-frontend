import { StyleSheet } from 'react-native';

// TO USE THIS STYLE :

// import { secondaryButtonStyles } from '../styles/secondaryButton';

// <TouchableOpacity style={secondaryButtonStyles.button} activeOpacity={0.8}>
// <Text style={secondaryButtonStyles.buttonText}>Secondary Button</Text>
// </TouchableOpacity>

export const secondaryButtonStyles = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '85%',
        height: '10%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        margin: 5,
    },
    buttonText: {
        color: '#ec6e5b',
        fontWeight: '500',
        letterSpacing: 0.75,
        fontSize: 14,
        textTransform: 'uppercase',
        lineHeight: 17
    },
})

