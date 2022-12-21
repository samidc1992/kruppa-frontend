import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { BACKEND_ADDRESS } from '../backendAdress';


export default function SignUpScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldError, setFieldError] = useState('');
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleUsernameInputChange = value => setUsername(value);
    const handleEmailInputChange = value => setEmail(value);
    const handlePasswordInputChange = value => setPassword(value);
    const dispatch = useDispatch();

    const handlePressPrimaryButton = () => {
        fetch(`${BACKEND_ADDRESS}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.result && EMAIL_REGEX.test(email)) {
                    dispatch(login({
                        token: data.token,
                        username,
                    }));
                    navigation.navigate('SignUpProfile');
                } else {
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setFieldError(true);
                }
            });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.contentContainer}>
            <Text style={styles.header}>Welcome to Kruppa</Text>
                <StandardFormInput
                    placeholder="Username"
                    value={username}
                    handleChange={handleUsernameInputChange}
                />
                <StandardFormInput
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    handleChange={handleEmailInputChange}
                />
                <StandardFormInput
                    placeholder="Password"
                    secureTextEntry='true'
                    value={password}
                    handleChange={handlePasswordInputChange}
                />
                {fieldError && <Text style={styles.error}>Missing or empty fields.</Text>}
                <Text style={styles.signinOption}>
                    Already have an account? Sign in
                    <Text> </Text>
                    <Text
                        style={styles.signinLink}
                        onPress={() => navigation.navigate('SignIn')}
                    >here</Text>
                    .
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    text='Sign Up'
                    onPress={() => handlePressPrimaryButton()}
                />
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#272D31',
    },
    header: {
        color: 'white',
        width: '85%',
        fontSize: 34,
        fontWeight: '600',
        //fontFamily: 'Inter',
        // position: 'absolute',
        // top: 60,
        marginBottom: 30,
        textAlign: 'center'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        marginTop: 15,
        fontSize: '15',
        fontWeight: 'bold',
        color: 'red',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        bottom: 40
    },
    signinOption: {
        color: 'white',
        marginTop: 5,
    },
    signinLink: {
        textDecorationLine: 1,
        color: 'lightblue'
    }
})