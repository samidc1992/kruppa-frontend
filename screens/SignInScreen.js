import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'
import SearchInput from '../components/SearchInput'
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
//import { BACKEND_ADDRESS } from '../backendAdress';

export default function SignInScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldError, setFieldError] = useState('');
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const dispatch = useDispatch();

    const handleSearchInputChangeMail = value => setEmail(value)
    const handleSearchInputChangePassword = value => setPassword(value)

    function handleSignIn() {
        fetch('http://192.168.10.128:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json())
            .then(userData => {
                console.log(userData);
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
                    setEmail('');
                    setPassword('');
                    setFieldError(true);
                }
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <SearchInput
                    placeholder="Email"
                    value={email}
                    handleChange={handleSearchInputChangeMail} />
                <SearchInput
                    placeholder="Password"
                    value={password}
                    handleChange={handleSearchInputChangePassword} />
                {fieldError && <Text style={styles.error}>Oops! Invalid information! Please try again.. </Text>}
            </View>
            <View style={styles.inputContainer}>
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#374146',
    },
    content: {
        width: '90%',
        marginLeft: '20%',
        marginRight: '10%',
    },
    signinview: {
        backgroundColor: 'red'
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        width: '100%',
    },
})