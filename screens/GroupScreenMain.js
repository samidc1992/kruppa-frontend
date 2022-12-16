import { StyleSheet, Text, View, Image } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import group from '../reducers/group';


export default function GroupScreenMain({ navigation }) {

    const BACKEND_ADRESS = 'http://192.168.10.154:3000';
    const group_id = useSelector((state) => state.group.value);
    const [groupDataToDisplay, setGroupDataToDisplay] = useState({});

    useEffect(()=> {
        fetch(`${BACKEND_ADRESS}/groups/main`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({group_id}),
        }).then(response => response.json())
        .then(data => {
            if(data.result) {
                let { name, description, genders, levels, sport, admin, workout_location} = data.groupData;
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
                })
            }
        })
    }, [])


    return(
        <View style={styles.container}>
            <TopBar
                onPress={() => navigation.goBack()}
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
            <Image 
                style={styles.image}
                source={require('../assets/yoga-2.jpg')}
            />
            <Text style={styles.subHeader}>{groupDataToDisplay.sport}</Text>
            <View style={styles.groupInformationContainer}>
                <View style={styles.infoIconsContainer}>
                    <FontAwesome
                        name="level-up"
                        color="white"
                        size={14}
                    />
                    <FontAwesome
                        name="group"
                        color="white"
                        size={14}
                    />
                    <FontAwesome
                        name="map-pin"
                        color="white"
                        size={14}
                    />
                    <FontAwesome
                        name="user"
                        color="white"
                        size={14}
                    />
                </View>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.body}>{groupDataToDisplay.level}</Text>
                    <Text style={styles.body}> [Hardcoded] 3/5 members</Text>
                    <Text style={styles.body}>Gather at
                        <Text> </Text>
                        <Text style={styles.location}>{groupDataToDisplay.location}</Text>
                    </Text>
                    <Text style={styles.body}>Created by 
                        <Text> </Text>
                        <Text style={styles.admin}>{groupDataToDisplay.username}</Text>
                    </Text>
                </View>
            </View>
            <Text style={styles.subHeader}>Description</Text>
            <Text style={styles.description}>{groupDataToDisplay.description}</Text>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    text="join group"
                    //onPress={()=> handleGroupJoin()}
                />
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
        height: 200,
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
        marginTop: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center'
    },
    infoIconsContainer: {
        height: 80,
        justifyContent: 'space-around'
    },
    infoTextContainer: {
        height: 80,
        justifyContent: 'space-around'
    },
    location: {
        textDecorationLine: 1,
    },
    admin: {
        textDecorationLine: 1,
    }
})