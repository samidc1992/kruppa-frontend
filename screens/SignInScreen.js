import { TouchableOpacity, StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'
import SearchInput from '../components/SearchInput'
import React from 'react';
import { useState } from 'react';

export default function SignInScreen({ navigation }) {

        const [SearchMail, setSearchMail] = useState('')
        const handleSearchInputChangeMail = value => setSearchMail(value)

        const [SearchPassword, setSearchPassword] = useState('')
        const handleSearchInputChangePassword = value => setSearchPassword(value)

        console.log(SearchMail) 
        console.log(SearchPassword)

     function login() {

         const newUser = {email: SearchMail, password: SearchPassword }
         fetch('http://192.168.10.197:3000/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
        };
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                
            <SearchInput
                placeholder="Votre Email"
                value={SearchMail}
                handleChange={handleSearchInputChangeMail}/>
          
                
            <SearchInput
                    placeholder="Mot de passe"
                    value={SearchPassword}
                    handleChange={handleSearchInputChangePassword}/>
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