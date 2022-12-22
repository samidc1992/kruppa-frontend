import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback} from 'react';
import {handleLeftTabFocused, handleMiddleTabFocused, handleRightTabFocused } from '../reducers/tab';
import MemberCard from '../components/MemberCard';
import { storeJoinStatus } from  '../reducers/group';
import { BACKEND_ADDRESS } from '../backendAdress';

export default function GroupScreenMembers({ navigation }) {

    const group = useSelector((state) => state.group.value);
    let { group_id, joined } = group;
    const user = useSelector((state) => state.user.value);
    const [groupDataToDisplay, setGroupDataToDisplay] = useState({});
    const [groupMembers, setGroupMembers] = useState([]);

    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
        fetch(`${BACKEND_ADDRESS}/groups/main`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ group_id }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    let { name, genders, levels, sport, ageMax, ageMin } = data.groupData;
                    let formattedLevels = levels.map(level => {
                        return level[0].toUpperCase() + level.slice(1).toLowerCase()
                    });
                    let level = formattedLevels.join(' | ');
                    setGroupDataToDisplay({
                        name,
                        genders,
                        level,
                        sport: sport.label,
                        ageMax,
                        ageMin
                    })
                    dispatch(handleLeftTabFocused(false)); 
                    dispatch(handleMiddleTabFocused(false)); 
                    dispatch(handleRightTabFocused(true)); 
                }
            })
    }, [])
    );

    useFocusEffect(
        useCallback(() => {
            fetch(`${BACKEND_ADDRESS}/groups/members`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ group_id }),
            })
                .then((response) => response.json())
                .then((data) => {  
                    setGroupMembers(data.userdata)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }, [joined])
    );
      
    useFocusEffect(
        useCallback(() => {
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
        }, [])
    ); 

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
    };

//handle leaving the current group
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

     //Render a group's members card
     const members = groupMembers.map((e, i) => {
        let age = Math.floor((new Date() - new Date(e.birthDate))/31556952000);  
        let level;
        e.favoriteSports.forEach(sport => {
            if(sport.sport === groupDataToDisplay.sport) {
                level = sport.level;
            }
        })
        return (
            <View 
                key={i}
                style={styles.memberContainer}
            >
                <MemberCard
                    memberUsername={joined ? e.username : null}
                    memberAge={age}
                    memeberGender={e.gender}
                    memberLevel={level}
                    handlePress={() => {
                        navigation.navigate('Profile');
                    }}
                    photo={e.photo}
                />
            </View>
        )
       })  

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
            <Text style={styles.header}>{groupDataToDisplay.name}</Text>
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
            <Text style={styles.subHeader}>Members' Information</Text>
            <View style={styles.groupInformationContainer}>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.body}>Gender(s): {groupDataToDisplay.genders}</Text>
                    <Text style={styles.body}>Level(s): {groupDataToDisplay.level}</Text>
                    <Text style={styles.body}>Age: {groupDataToDisplay.ageMin} - {groupDataToDisplay.ageMax}</Text>
                </View>
            </View>
            <Text style={styles.subHeader}>Members</Text>
            <View style={styles.bodyContainer}>
                <Text style={styles.body}>Other members information are hidden until you join the group.</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                {members}
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
        marginTop: -10,
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
    infoTextContainer: {
        height: 80,
        justifyContent: 'space-around'
    },
    memberContainer: {
        marginTop: 3,
        alignItems: 'center',
    },
    scrollView: {
        width: '85%',
        marginTop: 10
    },
    bodyContainer: {
        width: '85%',
        marginTop: 5,
    },
})