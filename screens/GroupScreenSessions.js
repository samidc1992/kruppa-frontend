import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { BACKEND_ADDRESS } from '../backendAdress';

export default function GroupScreenSessionsBeta({ navigation }) {

    const group = useSelector((state) => state.group.value);
    let { group_id, group_name } = group;
    const user = useSelector((state) => state.user.value);
    const [joined, setJoined] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.token) {
            fetch(`${BACKEND_ADDRESS}/users/join-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ group_id, token: user.token }),
            }).then(response => response.json())
            .then(data => {
                if (!data.result) {
                    setJoined(true);
                } 
            });
        } 
    }, []);

    function handleJoinGroup() {
        if (user.token) {
            fetch(`${BACKEND_ADDRESS}/users/join-group`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ group_id, token: user.token }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        setJoined(true);
                    }
                })
        } else {
            navigation.navigate('SignIn')
        }
    }

    function handleLeaveGroup() {
        if (user.token) {
            fetch(`${BACKEND_ADDRESS}/users/leave-group`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ group_id, token: user.token }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        setJoined(false);
                    } else {
                        setJoined(true);
                    }
                })
        } else {
            navigation.navigate('SignIn')
        }
    }

    return (
        <View style={styles.container}>
            <TopBar
                onPress={() => {
                    dispatch(handleLeftTabFocused (true)); 
                    dispatch(handleMiddleTabFocused(false)); 
                    dispatch(handleRightTabFocused(false)); 
                    navigation.navigate('Group')
                }}
            />
            <Text style={styles.header}>{group_name}</Text>
            <View style={styles.tabContainer}>
                <TrippleTab
                    textTabLeft="information"
                    textTabMiddle="sessions"
                    textTabRight="members"
                    onPressLeft={() => navigation.navigate('Group')}
                    onPressMiddle={() => navigation.navigate('GroupSessions')}
                    onPressRight={() => navigation.navigate('GroupMembers')} 
                />
            </View>
             
            <View style={styles.buttonContainer}>
                {
                    joined ?
                        (<SecondaryButton
                            text="leave group"
                            onPress={() => handleLeaveGroup()}
                        />)
                        :
                        (<PrimaryButton
                            text="join group"
                            onPress={() => handleJoinGroup()}
                        />)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#272D31',
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        width: '85%',
        marginTop: 20,
    },
    tabContainer: {
        height: 90,
        width: '100%',
    },
    image: {
        width: 360,
        height: '25%',
        borderRadius: 10,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        width: '85%',
        marginTop: 10,
    },
    groupInformationContainer: {
        width: '85%',
        marginTop: 5,
        flexDirection: 'row',
        height: 100,
    },
    body: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
    description: {
        color: 'white',
        fontSize: 16,
        width: '85%',
        fontWeight: '400',
        marginTop: 5
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center'
    },
    infoIconsContainer: {
        height: 80,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    infoTextContainer: {
        height: 80,
        justifyContent: 'space-around'
    },
    location: {
        textDecorationLine: 1,
        color: 'lightblue'
    },
    admin: {
        textDecorationLine: 1,
        color: 'lightblue'
    }, 

})