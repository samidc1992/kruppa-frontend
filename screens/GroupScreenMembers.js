import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight, Image } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback} from 'react';
import { useIsFocused } from '@react-navigation/native';
import {handleLeftTabFocused, handleMiddleTabFocused, handleRightTabFocused } from '../reducers/tab';
import MemberCard from '../components/MemberCard';
import { storeJoinStatus } from  '../reducers/group';
import { BACKEND_ADDRESS } from '../backendAdress';

export default function GroupScreenMembers({ navigation }) {

    const user = useSelector((state) => state.user.value);
    const group = useSelector((state) => state.group.value);
    let { group_id, joined } = group; 
    
    const [groupDataToDisplay, setGroupDataToDisplay] = useState({});
    const [groupMembers, setGroupMembers] = useState([]);

    const isFocused = useIsFocused();
    const dispatch = useDispatch ();
  
    useFocusEffect(
        useCallback(() => {
        fetch(`${BACKEND_ADDRESS}/groups/main`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ group_id }),
          })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    let { name, description, genders, levels, sport, admin, workout_location, photo, ageMax, ageMin } = data.groupData;
                    let formattedLevels = levels.map(level => {
                        return level[0].toUpperCase() + level.slice(1).toLowerCase()
                    });
                    let level = formattedLevels.join(' | ');
                    setGroupDataToDisplay({
                        name,
                        description,
                        genders,
                        level,
                        sport: sport.label,
                        username: admin.username[0].toUpperCase() + admin.username.slice(1).toLowerCase(),
                        location: workout_location.label,
                        photo,
                        ageMax,
                        ageMin
                    })
                }
            })
    }, []))
    
    //updating members when screen is focused
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
        }, [])
    );

   //handle joining a group
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
                        //setJoined(true);
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
                        //setJoined(false);
                        dispatch(storeJoinStatus(false));
                    } else {
                        //setJoined(true);
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
         e.favoriteSports.forEach((element) => { 
            if(element.sport === groupDataToDisplay.sport) {
               level= element.level;
            }})
            if (!joined ) {     
                return (
                    <MemberCard
                        key={i}
                        memberAge={age}
                        memeberGender={e.gender}
                        memberLevel={level}
                        handlePress={() => {
                            navigation.navigate('Profile');
                        }}
                    />
                )
            } else {
                return (
                    <MemberCard
                        key={i}
                        memberUsername={e.username}
                        memberAge={age}
                        memeberGender={e.gender}
                        memberLevel={level}
                        handlePress={() => {
                            navigation.navigate('Profile');
                        }
                        }
                    />
                )
            }
        })  

    if (!isFocused) {
        return <View />;
    }

    return (
        <View style={styles.screenContainer}>
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
                    <View style={styles.bodyContainer}>
                        <Text style={styles.subHeader} > Group profile </Text>
                        <Text style={styles.listStyle} > Gender(s): {groupDataToDisplay.genders} </Text>
                        <Text style={styles.listStyle} > Level(s): {groupDataToDisplay.level} </Text>
                        <Text style={styles.listStyle} > Age: {groupDataToDisplay.ageMin} - {groupDataToDisplay.ageMax}</Text>
                    </View>

                   <Text style={styles.subHeader} > Other members information are hidden until you join the group </Text>
              
                  <View style={styles.userInfoContainer}>
                    <ScrollView>
                        {members}
                    </ScrollView>
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
    screenContainer: {
        flex: 1,
        backgroundColor: '#272D31',
    },
    tabContainer: {
        height: 90,
        width: '100%',
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        width: '85%',
        marginTop: 20,
        marginLeft: 20,
    },
    userInfoContainer: {
        marginTop : 15,
        alignSelf: 'center',
        width: '85%',
        height: '20%',
    },
    scrollView: {
        marginTop: 10,
        height: '100%',
    },
    tabTextFocus: {
        color: "#FF6317",
        fontSize: 14,
        height: '100%',
        width: '100%',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    subHeader: {
        fontSize: 17,
        color: 'white',
        fontWeight: '500',
        width: '85%',
        marginLeft: 10,
    },
    listStyle: {
        fontSize: 15,
        color: 'white',
        width: '85%',
        marginLeft: 20,
        marginTop: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center'
    },
    tabContainer: {
        height: 90,
        width: '100%',
    },
})