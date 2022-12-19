import { View, Text, StyleSheet } from 'react-native';
import TrippleTab from '../components/TrippleTab';

export default function GroupScreenSessions({ navigation }) {
    return(
        <View style={styles.container}>
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
            <Text>Group Sessions</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabContainer: {
        height: 90,
        width: '100%',
    },
})