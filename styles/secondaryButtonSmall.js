import { StyleSheet } from 'react-native';

// TO USE THIS STYLE :

// import { secondaryButtonSmallStyles } from '../styles/secondaryButtonSmall';

// <TouchableOpacity style={secondaryButtonSmallStyles.button} activeOpacity={0.8}>
// <Text style={secondaryButtonSmallStyles.buttonText}>Secondary</Text>
// </TouchableOpacity>

export const secondaryButtonSmallStyles = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '40%',
        height: '10%',
        backgroundColor: '#fff',
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

