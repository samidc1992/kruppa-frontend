import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../reducers/user';
import user from '../reducers/user';
//import { BACKEND_ADDRESS } from '../backendAdress';
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
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    

    const handlePressPrimaryButton = () => {

          const BACKEND_ADDRESS = 'http://192.168.0.30:3000';
        
        fetch(`${BACKEND_ADDRESS}/users/signup`, {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              username : username, 
              email : email , 
              password : password,
             }),
             })
            .then(response => response.json())
            .then (data => {               
              if (data.result && EMAIL_REGEX.test(email)) {  
                dispatch(login({
                      token: data.token
                }));      
                 navigation.navigate('SignUpProfile');              
                 } else {          
                setUsername('');
                setEmail('');
                setPassword('');               
                setFieldError(true);
              } 
            });  
        navigation.navigate('SignUpProfile');
    }

    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.inputContainer}>

            <Text style={styles.header}>Welcome to Kruppa</Text>
                <StandardFormInput
                    inputLabel="Username"
                    placeholder="your username"
                    value={username}
                    handleChange={handleUsernameInputChange}
                />

                <StandardFormInput
                    inputLabel="Email"
                    placeholder="your email"
                    keyboardType="email-address"
                    value={email}
                    handleChange={handleEmailInputChange}
                />


                <StandardFormInput
                    inputLabel="Password"
                    placeholder="your password"
                    secureTextEntry='true'
                    value={password}
                    handleChange={handlePasswordInputChange}
                />
                 {fieldError && <Text style={styles.error}>Oops! Invalid information! Please try again.. </Text>}
               </View> 
                 
                <PrimaryButton                    
                    text='Sign Up'
                    onPress={() => handlePressPrimaryButton()}
                />       
              
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#251E1E',

    },

    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        paddingTop: '5%',
        paddingBottom: '40%',
    },


    header: {
        alignSelf: 'center',
        marginTop: '35%',
        fontSize: 30,
        fontWeight: "bold",
        color: '#F0F0F0',
        marginBottom: '10%',

    },

    fieldName: {
        color: "white",
        marginTop: '4%',
        fontSize: 15,
        alignSelf: 'stretch',
        marginLeft: '8%',
    },

    error: {
        marginTop : 15,
        fontSize : '15',
        fontWeight: 'bold',
        color : 'red',
    },

    /*  bottomContainer: {        
         alignItems: 'center',
         position: 'absolute',
         bottom: 100,
     }, */

    input: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A474E',
        width: '80%',
        height: 50,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        margin: 5,
        borderBottomColor: '#545A5E',
        borderBottomWidth: 1,
        paddingLeft: 10,
        fontSize: 20,
        color: '#fff',
    },

    inputFocus: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#545A5E',
        width: '80%',
        height: 50,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        margin: 5,
        borderBottomColor: '#ec6e5b',
        borderBottomWidth: 2,
        paddingLeft: 10,
        fontSize: 20,
        color: '#fff',

    }

})