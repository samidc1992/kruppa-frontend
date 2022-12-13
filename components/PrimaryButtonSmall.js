import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export default function PrimaryButtonSmall(props) {
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
