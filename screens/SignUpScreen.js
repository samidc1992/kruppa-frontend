import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';



export default function SignUpScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldError, setFieldError] = useState('');

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    
    const handleUsernameInputChange = value => yasetUsername(value);
    const handleEmailInputChange = value => setEmail(value);     
    const handlePasswordInputChange = value => setPassword(value);
    

    const handlePressPrimaryButton = () => {

        const BACKEND_ADDRESS = 'http://192.168.10.147:3000';
        
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
                setUsername('');
                setEmail('');
                setPassword(''); 
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
            {/* <Image  source={require('')} style={styles.image}/> */}  

            <View style={styles.inputContainer}>
            <Text style={styles.header}>Welcome to Kruppa</Text>
            
                <Text style={styles.fieldName}>username</Text>
                <StandardFormInput
                    placeholder="your username"        
                    value={username}
                    handleChange={handleUsernameInputChange}
                />

                <Text style={styles.fieldName}>email       </Text>
                <StandardFormInput
                    placeholder="your email"        
                   keyboardType="email-address"
                    value={email}
                    handleChange={handleEmailInputChange}
                />

                <Text style={styles.fieldName}>password</Text>
                <StandardFormInput                        
                    placeholder="your password"   
                    secureTextEntry ='true'     
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
        /* flexDirection: 'column', */
        alignItems: 'center',
       /*  justifyContent: 'center', */
        backgroundColor: '#251E1E',      
          
    },

    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        height: '100%',
        width: '100%', 
        paddingTop: '5%',
        paddingBottom : '40%',      
    },

    image: {

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
        alignItems: 'flex-start',
        color :"white",
        marginTop:'3%',
        marginBottom: '-3%',
        marginLeft: '-65%',
        fontSize: 14,        
    },

    error: {
        marginTop : 15,
        fontSize : '15',
        color : 'red',
    },

    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40
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