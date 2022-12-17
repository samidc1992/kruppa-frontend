import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'
import SearchInput from '../components/SearchInput'
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

export default function SignInScreen({ navigation }) {

    const BACKEND_ADDRESS = 'http://192.168.1.72:3000'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldError, setFieldError] = useState('');
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const dispatch = useDispatch();

    const handleSearchInputChangeMail = value => setEmail(value)
    const handleSearchInputChangePassword = value => setPassword(value)

    function handleSignIn() {
        fetch(`${BACKEND_ADDRESS}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json())
            .then(userData => {
                if (userData.result && EMAIL_REGEX.test(email)) {
                    dispatch(login({
                        token: userData.user.token,
                        username: userData.user.username
                    }));
                    setEmail('');
                    setPassword('');
                    setFieldError(false);
                    navigation.navigate('TabNavigator');
                } else {
                    //setEmail('');
                    setPassword('');
                    setFieldError(true);
                }
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Welcome back to Kruppa</Text>
            <View style={styles.content}>
                <SearchInput
                    placeholder="Email"
                    value={email}
                    handleChange={handleSearchInputChangeMail} />
                <SearchInput
                    placeholder="Password"
                    value={password}
                    handleChange={handleSearchInputChangePassword} />
                {fieldError && <Text style={styles.error}>Invalid email or password.</Text>}
                <Text style={styles.signupOption}>
                    Do not have an account yet? Sign up 
                    <Text> </Text>
                    <Text
                    style={styles.signupLink}
                    onPress={() => navigation.navigate('SignUp')}
                    >here</Text>
                .
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    text='Sign In'
                    onPress={() => handleSignIn()} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#374146',
    },
    header: {
        color: 'white',
        width: '85%',
        fontSize: 34,
        fontWeight: '600',
        //fontFamily: 'Inter',
        textAlign: 'center',
        position: 'absolute',
        top: 90,
    },
    content: {
        width: '90%',
        alignItems: 'center'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        width: '100%',
        position: 'absolute',
        bottom: 40
    },
    error: {
        color: 'red',
        width: '85%',
        marginTop: 5,
    },
    signupOption: {
        color: 'white',
        width: '85%',
        marginTop: 5,
    },
    signupLink: {
        textDecorationLine: 1,
        color: 'lightblue'
    }
})