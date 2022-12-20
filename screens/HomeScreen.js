import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'
import { useSelector, useDispatch } from 'react-redux';
import GroupCard from '../components/GroupCard';
import { useEffect, useState } from 'react';
import { storeGroupId } from '../reducers/group';
import { BACKEND_ADDRESS } from '../backendAdress';
import { useFocusEffect } from '@react-navigation/native';
import {handleLeftTabFocused, handleMiddleTabFocused, handleRightTabFocused } from '../reducers/tab';
import React from 'react';

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch()

    const [groups, setGroups] = useState([])

    // get info of user logged in
    const username = useSelector((state) => state.user.value.username);
    const token = useSelector((state) => state.user.value.token);
    const tab = useSelector((state) => state.tab.value);

    //updating groups when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetch(`${BACKEND_ADDRESS}/users/groups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ token: token }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setGroups(data.userGroups)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }, [])
    );


    console.log(groups)
    //display groups on page
    const groupsElements = groups.map((e, i) => {
        return (
            <GroupCard
                key={i}
                // image='../assets/tennis.jpg'
                name={e.group.name}
                sport={e.group.sport.label}
                membersNum={3}
                maxMembers={e.group.maxMembers}
                handlePress={() => {
                    dispatch(storeGroupId(e.group._id));
                    dispatch(handleLeftTabFocused (true)); 
                    dispatch(handleMiddleTabFocused(false)); 
                    dispatch(handleRightTabFocused(false)); 
                    navigation.navigate('Group');
                }
                }
            />
        )
    })


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>

                <Text style={styles.title}>{username}'s Groups</Text>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <PrimaryButton
                        text='Create new group'
                        onPress={() => navigation.navigate('GroupCreation')}
                    />
                </View>
                <Text style={styles.sectionTitle}>
                    My groups
                </Text>
                <View style={styles.groupsContainer}>
                    <ScrollView>
                        {groupsElements}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#374146',
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    title: {
        // fontWeight: 'bold',
        fontSize: 40,
        color: '#ffffff',
        textAlign: 'left',
        alignSelf: 'center',
        width: '85%',
        marginTop: 20, marginBottom: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
        alignSelf: 'center',
        width: '85%',
        margin: 10
    },
    groupsContainer: {
        alignSelf: 'center',
        width: '85%',
        // height: '50%'
    }
})