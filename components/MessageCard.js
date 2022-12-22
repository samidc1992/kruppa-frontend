import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

function MessageCard(props) {

    return (
        <View style={styles.container}>
            <Image
                source={ props.photo ? { uri: props.photo } : require('../assets/profilepic.jpg') }
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>
                    {props.memberUsername}
                </Text>
                <Text style={styles.text}>
                    {props.message}
                </Text>
                <Text style={styles.link}>
                    see message
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        margin: 3,
        borderColor: '#3A474E',
        backgroundColor: '#3A474E',
        height: '15%',
        width: '90%'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 80,
        marginLeft: '5%',
    },
    content: {
        width: '75%',
        padding: '2%',
        marginRight: '1%',
        marginTop: '3%'
    },
    link: {
        textAlign: 'right',
        alignSelf: 'flex-end',
        color: '#FF6317'
    },
    text: {
        color: '#979797',
        fontSize: 16,
        paddingRight: 3,
        marginTop: 5,
        width: '95%'
    },
    title: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    }
})

export default MessageCard