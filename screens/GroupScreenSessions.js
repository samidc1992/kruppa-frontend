import { View, Text, StyleSheet, SafeAreaView  } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {handleLeftTabFocused, handleMiddleTabFocused, handleRightTabFocused } from '../reducers/tab';
import { BACKEND_ADDRESS } from '../backendAdress';

export default function GroupScreenSessions({ navigation }) {

    const [groupDataToDisplay, setGroupDataToDisplay] = useState({});
    const tab = useSelector((state) => state.tab.value);
    const group_id = useSelector((state) => state.group.value);

    const dispatch = useDispatch();

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
                    let { name, description, genders, levels, sport, admin, workout_location, photo, ageMin, ageMax } = data.groupData;
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
             <View style={styles.bodyConatiner}>

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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    subHeader: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        width: '85%',
        marginTop: 10,
    },
    bodyConatiner: {
      height: '50%',
    },
    bottomContainer: {
        alignItems: 'center',

    }
})