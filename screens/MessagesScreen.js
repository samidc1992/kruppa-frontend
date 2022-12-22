import { StyleSheet, View, Text } from 'react-native';
import MessageCard from '../components/MessageCard';

export default function MessagesScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Chat</Text>
            <MessageCard
                memberUsername={'Brian'}
                message={'Are we still running together tomorrow?'}
                photo={'https://res.cloudinary.com/dtizjnga8/image/upload/v1671707985/rdekzluf72d6dozhwrex.jpg'}
            />
            <MessageCard
                memberUsername={'Jane'}
                message={'See you for yoga next Monday at 8:00 AM.'}
                photo={'https://res.cloudinary.com/dtizjnga8/image/upload/v1671708052/kbiqu4bhnjn6xemmi5wr.jpg'}   
            />
            <MessageCard
                memberUsername={'Marie'}
                message={'Are you guys down for a run on Sunday?'}
                photo={'https://res.cloudinary.com/dtizjnga8/image/upload/v1671708492/tkzm9o4q8y9ruhcaz1if.jpg'}   
            />
            <MessageCard
                memberUsername={'Daniel'}
                message={'Daniel is typing...'}
                photo={'https://res.cloudinary.com/dtizjnga8/image/upload/v1671708188/ygp6lt6p1wialhe3gdhm.jpg'}   
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#272D31',
        paddingTop: '15%',
    },
    header: {
        fontSize: 28,
        fontWeight: '600',
        color: 'white',
        width: '85%',
        marginBottom: 20,
    },
})