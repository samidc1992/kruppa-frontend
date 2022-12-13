import { StyleSheet, Text, View, SafeAreaView, TextInput, Image } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';



export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameIsFocused, setUsernameIsFocused] = useState(false);
    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [passwordIsFocused, setPasswordIsFocused] = useState(false);

    const handlePressPrimaryButton = () => {

        const BACKEND_ADDRESS = 'http://192.168.0.30:3000';
        
        fetch(`${BACKEND_ADDRESS }/users/signup`, {
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
              if (data.result) {               
                 navigation.navigate('SignUpProfile');              
              }
            });  
    }

    return (
        <SafeAreaView style={styles.container}>
             {/* <Image  source={require('')} style={styles.image}/> */}

            <Text style={styles.title}>Welcome to Kruppa</Text>
  
            <View style={styles.inputContainer}>
            
                 <TextInput style={usernameIsFocused ? styles.inputFocus : styles.input}
                    placeholder="your username" 
                    placeholderTextColor= '#7E8284'
                    mode = 'flat'
                    onChangeText={(value) => setUsername(value)} 
                    value={username}                
                    onBlur={() => setUsernameIsFocused(false)}
                    onFocus={() => setUsernameIsFocused(true)}
                    />

                <TextInput style={emailIsFocused? styles.inputFocus : styles.input}
                    placeholder ="your email"
                    placeholderTextColor="#7E8284"           
                    mode = 'flat'
                    keyboardType="email-address"
                    onChangeText={(value) => setEmail(value)} 
                    value={email} 
                    onBlur={() => setEmailIsFocused(false)}
                        onFocus={() => setEmailIsFocused(true)} 
                    
                    />

                <TextInput style={passwordIsFocused ? styles.inputFocus : styles.input}
                        placeholder ="your password"
                        placeholderTextColor="#7E8284"
                        secureTextEntry              
                    
                        mode = 'flat'
                        onChangeText={(value) => setPassword(value)} 
                        value={password} 
                        onBlur={() => setPasswordIsFocused(false)}
                        onFocus={() => setPasswordIsFocused(true)} 
                  />

                <PrimaryButton
                text='Sign Up'
                onPress={() => handlePressPrimaryButton()}
            />
        </View>   
          
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#251E1E',
          
    },

    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
        height: '100%',
        width: '100%', 
    },

    image: {

    },

    title: {
        alignSelf: 'center',
        marginTop: '50%',
        fontSize: 30,
        fontWeight: "bold",
        color: '#F0F0F0',
    },

    input: {
        marginTop : '70%',
        fontSize : 30,
        fontWeight : "bold",
        color : '#979797',
    },

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