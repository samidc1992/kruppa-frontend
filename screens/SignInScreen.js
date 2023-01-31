import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'
// import SearchInput from '../components/SearchInput'
import StandardFormInput from '../components/StandardFormInput';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import { BACKEND_ADDRESS } from '../backendAddress';


export default function SignInScreen({ navigation }) {

    const group = useSelector((state) => state.group.value);
    let { group_id } = group;
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
                    group_id === null ? navigation.navigate('TabNavigator') : navigation.navigate('Group');
                } else {
                    //setEmail('');
                    setPassword('');
                    setFieldError(true);
                }
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                <View style={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.header}>Welcome back to Kruppa</Text>
                    <View style={styles.content}>
                        <View style={{ width: '100%' }}>

                            <StandardFormInput
                                placeholder="Email"
                                value={email}
                                handleChange={handleSearchInputChangeMail}
                                keyboardType="email-address"
                            />
                            <StandardFormInput
                                placeholder="Password"
                                value={password}
                                handleChange={handleSearchInputChangePassword}
                                secureTextEntry='true'
                            />
                        </View>
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
                </View>
                {/* </TouchableWithoutFeedback> */}
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#272D31',
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

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