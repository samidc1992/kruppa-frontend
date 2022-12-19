import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight, Image } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { BACKEND_ADDRESS } from '../backendAdress';

export default function GroupScreenMembers({ navigation }) {

    const group_id = useSelector((state) => state.group.value);
    const user = useSelector((state) => state.user.value);
    const [groupDataToDisplay, setGroupDataToDisplay] = useState({});
    const [joined, setJoined] = useState(false);
    const [isTabLeftFocused, setIsTabLeftFocused] = useState(true);
    const [isTabMiddleFocused, setIsTabMiddleFocused] = useState(false);
    const [isTabRightFocused, setIsTabRightFocused] = useState(true);
    

    
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
   
/*     const groupUsers = groups.map((e, i) => {
        return (
            <GroupCard
                key={i}
                // image='../assets/tennis.jpg'
                name={e.group.name}
                sport={e.group.sport.label}
                membersNum={3}
                maxMembers={e.group.maxMembers}
                handlePress={() => {
                    dispatch(storeGroupId(e.group._id))
                    navigation.navigate('Group')
                }
                }
            />
        )
    }) */



    const handleClickTabRight = () =>{
        setIsTabRightFocused(true);
        navigation.navigate('GroupMembers');
    }

    return(
        <SafeAreaView style={styles.screenContainer}>
            <TopBar
                onPress={() => navigation.goBack()}
            />
             <Text style={styles.header}>{groupDataToDisplay.name}</Text>
            <View style={styles.tabContainer}>
                <TrippleTab
                   style={ isTabRightFocused ? styles.tabFocus : styles.tab }
                    textTabLeft="information"
                    textTabMiddle="sessions"
                    textTabRight="members"
                    onPressLeft={() => handleClickTabLeft}/* setIsTabLeftFocused(false);navigation.navigate('Group')}} */
                    onPressMiddle={() => {setIsTabMiddleFocused(false);navigation.navigate('GroupSessions')}}
                    onPressRight={() => handleClickTabRight}/* {setIsTabRightFocused(true);navigation.navigate('GroupMembers')}} */
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

                <View style={styles.userInfoContainer}>
                  <ScrollView contentContainerStyle={styles.scrollView}>
                   <Text style={styles.subTitle} > Other members information are hidden until you join the group </Text>
                    <TouchableHighlight
                      style = {styles.profilePicture} >
                       <Text></Text>
                     </TouchableHighlight> 
                     <View style={styles.userInfoList}>
                     </View>
                  </ScrollView>
               </View>
            

            <View style={styles.bottomContainer}>
            <PrimaryButton  
                    text='Create a profile'
                    disabled ={false}
                    activeOpacity={0}
                    onPress={() => navigation.navigate('SignUp')}
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
    },

    image: {
        width: 360,
        height: 200,
        borderRadius: 10,
    },
    scrollView: {
      marginTop: 10,
      height: '20%',
    },

    bodyContainer: {
   
     
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
        fontSize: 18,
        color: 'white',
        fontWeight: '400',
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

    userInfoContainer: {
        height :'20%',
        marginTop: 15,
    },
    
    bottomContainer: {
      alignItems: 'center',
    },
    
})