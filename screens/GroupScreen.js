import { StyleSheet, Text, View, Image } from 'react-native';
import TrippleTab from '../components/TrippleTab';
import TopBar from '../components/TopBar';
import PrimaryButton from '../components/PrimaryButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function GroupScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <TopBar
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.header}>Nina's Yoga Club</Text>
            <View style={styles.tabContainer}>
                <TrippleTab
                    textTabLeft="information"
                    textTabMiddle="sessions"
                    textTabRight="members"
                //onPressLeft={() =>}
                //onPressMiddle={() =>}
                //onPressRight={() =>}
                />
            </View>
            <Image 
                style={styles.image}
                source={require('../assets/yoga-2.jpg')}
            />
            <Text style={styles.subHeader}>Yoga</Text>
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
                    <Text style={styles.body}>Intermediate and beginner</Text>
                    <Text style={styles.body}>3/5 members</Text>
                    <Text style={styles.body}>Gather at Parc Monceau</Text>
                    <Text style={styles.body}>Create by Nawel</Text>
                </View>
            </View>
            <Text style={styles.subHeader}>Description</Text>
            <Text style={styles.description}>We do yoga at Parc Monceau every Tuesday and Thursday from 7 to 8:00 PM. We’re a group of 3 people willing to meet our neighboors.</Text>
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
    }
})