import { TouchableOpacity, StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'
import SearchInput from '../components/SearchInput'
import React from 'react';
import { useState } from 'react';

export default function SignInScreen({ navigation }) {

        const [email, setEmail] = useState('');
        const handleSearchInputChangeMail = value => setEmail(value)


        const [password, setPassword] = useState('');

        const handleSearchInputChangePassword = value => setPassword(value)


        console.log(email) 
        console.log(password)

        const [fieldError, setFieldError] = useState('');
        
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     function login() {

         const newUser = {email: email, password: password }
         fetch('http://192.168.10.197:3000/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((data) => { console.log(data);
            if (data.result && EMAIL_REGEX.test(email)) {
                setEmail('');
                setPassword('');    
                navigation.navigate('Home');

            } else {
                setEmail('');
                setPassword('');
                setFieldError(true);
            }
            })
      
        };
         return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                
            <SearchInput
                placeholder="Email"
                value={email}
                handleChange={handleSearchInputChangeMail}/>
          
                
            <SearchInput
                    placeholder="Password"
                    value={password}
                    handleChange={handleSearchInputChangePassword}/>            
         {fieldError && <Text style={styles.error}>Oops! Invalid information! Please try again.. </Text>}

                </View>


            <View style={styles.inputContainer}>

            <PrimaryButton
                text='Sign In'
                onPress={() => login()}/>
         </View>
        </SafeAreaView>
    )
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#374146',
    },
    content :{
        width: '90%',
        marginLeft: '20%',
        marginRight: '10%',
        
    },
    signinview : {
        backgroundColor:'red'
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        width: '100%',
    },

    // 

    // inputContainer: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '100%',
    //     width: '100%',
    // },

    // title: {
    //     alignSelf: 'center',
    //     marginTop: '50%',
    //     fontSize: 30,
    //     fontWeight: "bold",
    // },

})