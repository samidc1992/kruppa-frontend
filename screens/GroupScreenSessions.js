import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { handleLeftTabFocused, handleMiddleTabFocused, handleRightTabFocused } from '../reducers/tab';
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
                Next sessions
            </Text>
            <ScrollView>

                <View style={styles.sessionsContainer}>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            December 27th
                        </Text>
                        <Text style={styles.title}>
                            6:30 pm - 8 pm
                        </Text>
                        <Text style={styles.text}>
                            5/10 members
                        </Text>
                        <Text style={styles.link} >
                            join session
                        </Text>
                    </View>
                </View>
                <View style={styles.sessionsContainer}>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            December 29th
                        </Text>
                        <Text style={styles.title}>
                            6:30 pm - 8 pm
                        </Text>
                        <Text style={styles.text}>
                            1/10 members
                        </Text>
                        <Text style={styles.link} >
                            join session
                        </Text>
                    </View>
                </View>
                <View style={styles.sessionsContainer}>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            January 3rd
                        </Text>
                        <Text style={styles.title}>
                            6:30 pm - 8 pm
                        </Text>
                        <Text style={styles.text}>
                            2/10 members
                        </Text>
                        <Text style={styles.link} >
                            join session
                        </Text>
                    </View>
                </View>
                <View style={styles.sessionsContainer}>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            January 6th
                        </Text>
                        <Text style={styles.title}>
                            6:30 pm - 8 pm
                        </Text>
                        <Text style={styles.text}>
                            0/10 members
                        </Text>
                        <Text style={styles.link} >
                            join session
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
        alignSelf: 'center',
        width: '85%',
        margin: 10
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
        // marginTop: '3%',

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