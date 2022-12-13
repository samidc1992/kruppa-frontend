import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, TextInput, Image } from 'react-native';
import { useState } from 'react';
import { primaryButtonStyles } from '../styles/primaryButton';
export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
    const [usernameIsFocused, setUsernameIsFocused] = useState(false);
    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [passwordIsFocused, setPasswordIsFocused] = useState(false);

    //const BACKEND_ADDRESS = '';

    const handleSubmit = () => {       
        fetch('http://192.168.10.134:3000/users/signup', {
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

    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Image  source={require('')} style={styles.image}/> */}

            <Text style={styles.title}>Welcome to Kruppa</Text>

            <View style={styles.inputContainer}>
                <TextInput placeholder="your username" onChangeText={(value) => setUsername(value)} value={username} style={styles.input} />
                <TextInput placeholder="your email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
                <TextInput placeholder="your password" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} />
                <TouchableOpacity style={primaryButtonStyles.button} activeOpacity={0.8}>
                    <Text style={primaryButtonStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
          <TouchableOpacity style={primaryButtonStyles.button} activeOpacity={0.8}  onPress={() => handleSubmit()}>
                <Text style={primaryButtonStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>   
          
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        /*   alignItems: 'center',
          justifyContent: 'center', */
        backgroundColor: '#374146',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor : '#272D31',     
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
    },

    input: {


    }
        marginTop : '30%',
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
        borderBottomColor: '#7E8284',
        borderBottomWidth: 1,
        paddingLeft: 10,
        fontSize: 20,
        color: '#fff',
    },
    inputFocus: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A474E',
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