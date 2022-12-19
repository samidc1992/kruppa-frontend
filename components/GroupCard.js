import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

function GroupCard(props) {

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/tennis.jpg')}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.text}>
                    {props.sport}
                </Text>
                <Text style={styles.title}>
                    {props.name}
                </Text>
                <Text style={styles.text}>
                    {props.membersNum}/{props.maxMembers} members
                </Text>
                <Text style={styles.link} onPress={() => { props.handlePress() }}>
                    see more
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
        backgroundColor: '#3A474E'
    },
    image: {
        width: '20%',
        height: '60%',
        marginLeft: '5%',
        marginTop: '3%'
        // marginTop: '5%'
    },
    content: {
        width: '75%',
        padding: '5%',
        marginTop: '3%',

    },
    link: {
        // alignSelf: 'flex-end',
        // borderWidth: 1,
        textAlign: 'right',
        alignSelf: 'flex-end',
        // fontWeight: 'bold',
        color: '#FF6317'

    },
    text: {
        color: '#979797',
        fontSize: 16,
        paddingRight: 3,
        // borderWidth: 1,
        width: '95%'


    },
    title: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    }


})

export default GroupCard