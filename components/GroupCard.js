import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

function GroupCard(props) {

    return (
        <View>
            {/* <Image
                source={require(props.image)}
            /> */}
            <Text>
                {props.name}
            </Text>
            <Text>
                {props.sport}
            </Text>
            <Text>
                {props.sport}
            </Text>
            <Text>
                {props.membersNum}/{props.maxMembers} members
            </Text>
            <Text onPress={() => { props.handlePress() }}>
                see more
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default GroupCard