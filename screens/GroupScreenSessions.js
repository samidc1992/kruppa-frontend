import { StyleSheet, Text, View, ScrollView } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { handleLeftTabFocused, handleMiddleTabFocused, handleRightTabFocused } from '../reducers/tab';
import { BACKEND_ADDRESS } from '../backendAddress';
import { storeJoinStatus } from  '../reducers/group';

export default function GroupScreenSessions({ navigation }) {

    const group = useSelector((state) => state.group.value);
    let { group_id, group_name, joined } = group;
    const user = useSelector((state) => state.user.value);

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
                    dispatch(storeJoinStatus(true));
                } else {
                    dispatch(storeJoinStatus(false));
                }
            });
        } else { dispatch(storeJoinStatus(false)) }
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
                        dispatch(storeJoinStatus(true));
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
                        dispatch(storeJoinStatus(false));
                    } else {
                        dispatch(storeJoinStatus(true));
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
                    dispatch(handleLeftTabFocused(true));
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
            <Text style={styles.sectionTitle}>
                Upcoming sessions
            </Text>
            <ScrollView>
                <View style={styles.sessionsContainer}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            December 27th
                        </Text>
                        <Text style={styles.title}>
                            6:30 - 8 PM
                        </Text>
                        <Text style={styles.text}>
                            5 out of 8 members attending
                        </Text>
                        <Text style={styles.link} >
                            Click here to join this session.
                        </Text>
                    </View>
                </View>
                <View style={styles.sessionsContainer}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            December 29th
                        </Text>
                        <Text style={styles.title}>
                            6:30 - 8 PM
                        </Text>
                        <Text style={styles.text}>
                            1 out of 8 members attending
                        </Text>
                        <Text style={styles.link} >
                            Click here to join this session.
                        </Text>
                    </View>
                </View>
                <View style={styles.sessionsContainer}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            January 3rd
                        </Text>
                        <Text style={styles.title}>
                            6:30 - 8 PM
                        </Text>
                        <Text style={styles.text}>
                            2 out of 8 members attending
                        </Text>
                        <Text style={styles.link} >
                            Click here to join this session.
                        </Text>
                    </View>
                </View>
                <View style={styles.sessionsContainer}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            January 6th
                        </Text>
                        <Text style={styles.title}>
                            6:30 - 8 PM
                        </Text>
                        <Text style={styles.text}>
                            No members attending
                        </Text>
                        <Text style={styles.link} >
                            Click here to join this session.
                        </Text>
                    </View>
                </View>
            </ScrollView>

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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
        alignSelf: 'center',
        width: '85%',
        marginBottom: 10,
        marginTop: -10
    },
    body: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center'
    },
    sessionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        margin: 3,
        borderColor: '#3A474E',
        backgroundColor: '#3A474E'
    },
    content: {
        width: '90%',
        padding: '5%',
    },
    link: {
        color: '#FF6317'
    },
    text: {
        color: '#979797',
        fontSize: 16,
        paddingRight: 3,
        width: '95%'
    },
    title: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    }
})