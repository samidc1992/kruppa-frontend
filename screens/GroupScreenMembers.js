import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight, Image } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {handleLeftTabFocused, handleMiddleTabFocused, handleRightTabFocused } from '../reducers/tab';
import MemberCard from '../components/MemberCard';
import React, { Component } from "react";
import { BACKEND_ADDRESS } from '../backendAdress';

export default function GroupScreenMembers({ navigation }) {

    const group_id = useSelector((state) => state.group.value);
  
    const dispatch = useDispatch ();

    const [groupDataToDisplay, setGroupDataToDisplay] = useState({});
    const [groupMembers, setGroupMembers] = useState([]);
  
    
    
     useEffect(() => {
        fetch(`${BACKEND_ADDRESS}/groups/main`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ group_id }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    let { name, genders, levels, sport, admin, workout_location, photo, ageMin, ageMax } = data.groupData;
                    let formattedLevels = levels.map(level => {
                        return level[0].toUpperCase() + level.slice(1).toLowerCase()
                    });
                    let level = formattedLevels.join(' | ');
                    setGroupDataToDisplay({
                        name,
                        description,
                        genders,
                        levels,
                        sport: sport.label,
                        username: admin.username[0].toUpperCase() + admin.username.slice(1).toLowerCase(),
                        location: workout_location.label,
                        photo,
                        ageMin, 
                        ageMax
                    })
                }
            })
    }, []) 

     //updating members when screen is focused
     useFocusEffect(
        React.useCallback(() => {
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

      const members = groupMembers.map((e, i) => {
      
         let age = Math.floor((new Date() - new Date(e.birthDate))/31556952000);
        return (
            <MemberCard
                key={i}
                // image='../assets/tennis.jpg'
                memberAge={age}
                memeberGender= {e.genders}
                handlePress={() => {
                    navigation.navigate('Profile');
                }
                }
            />
        )
    })  


    return(
        <SafeAreaView style={styles.screenContainer}>
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
                        <Text style={styles.subTitle} > This group accepts </Text>
                        <View style={styles.groupInfoList}>
                        <Text style={styles.listStyle} > Genders : {groupDataToDisplay.genders} </Text>
                        <Text style={styles.listStyle} > Levels : {groupDataToDisplay.levels} </Text>
                        <Text style={styles.listStyle} > Age : {groupDataToDisplay.ageMin} - {groupDataToDisplay.ageMax}</Text>
                        </View> 
                    </View>

                   <Text style={styles.subTitle} > Other members information are hidden until you join the group </Text>
              
                  <View style={styles.userInfoContainer}>
                    <ScrollView>
                        {members}
                    </ScrollView>
                  </View>
                
            <View style={styles.bottomContainer}>
            <PrimaryButton  
                    text='Join a group'
                    disabled ={false}
                    activeOpacity={0}
                    onPress={() => navigation.navigate('SignIn')}
                />  

            </View>
           
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#272D31',

    },
 /*    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, */
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
    
    bodyContainer: {

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
    tab: {
        height: 30,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "#7E8284",
        borderBottomWidth: 1,
        margin: 1
    },
    
    subTitle: {
        fontSize: 17,
        color: 'white',
        fontWeight: '500',
        width: '85%',
        marginTop: 10,
        marginLeft: 10,
    },
    
    listStyle: {
        fontSize: 15,
        color: 'white',
        width: '85%',
        marginLeft: 20,
        marginTop: 5,
    },
    
    bottomContainer: {
      alignItems: 'center',
    },
    
})