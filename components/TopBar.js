import { View, StyleSheet, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function TopBar(props) {
    return (
    <View style={styles.container}>
        <View style={styles.topBar}>
            <FontAwesome
                style={styles.icon}
                name="arrow-left"
                color="white"
                size={25}
                onPress={() => props.onPress()} 
            />
            <Text style={styles.topBarText}>{props.text}</Text>
        </View>
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 100,
        width: '100%'
    },
    topBar: {
        height: 100,
        width: '100%',
        backgroundColor: '#251E1E',
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    icon: {
        margin: 20,
    },
    topBarText: {
        marginBottom: 20,
        fontSize: 20,
        //fontFamily: 'Inter',
        color: 'white',
        textTransform: 'lowercase'
    }
});

export default TopBar