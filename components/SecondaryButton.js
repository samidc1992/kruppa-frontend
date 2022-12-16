import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


function SecondaryButton(props) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => props.onPress()}
        >
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({


    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '85%',
        height: '10%',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        margin: 5,
    },
    buttonText: {
        color: '#ec6e5b',
        fontWeight: 'bold',
        letterSpacing: 0.75,
        fontSize: 14,
        textTransform: 'uppercase',
        lineHeight: 17
    },
})


export default SecondaryButton