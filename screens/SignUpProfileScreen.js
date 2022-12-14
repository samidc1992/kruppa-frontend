import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';

export default function SignUpProfileScreen({ navigation }) {

  /*   const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleUsernameInputChange = value => setUsername(value);
    const handleEmailInputChange = value => setEmail(value);
    const handlePasswordInputChange = value => setPassword(value); */
    return(
        <View style={styles.container}>
            <Text>SignUpProfile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    }
})