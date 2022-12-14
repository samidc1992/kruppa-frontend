import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';



export default function SignUpScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emptyField, SetEmptyField] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    
    const handleUsernameInputChange = value => {
        setUsername(value);
    };
    const handleEmailInputChange = value => {
        setEmail(value);
       /*  if (EMAIL_REGEX.test(email)) {
        
        }; */
     };

    const handlePasswordInputChange = value => setPassword(value);
    

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
                setUsername('');
                setEmail('');
                setPassword(''); 
                 navigation.navigate('SignUpProfile');              
              } else {
                SetEmptyField(true);
                setErrorMessage ('Required fields should be filled out');
              }
            });  
    }

    return (     
            
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
             {/* <Image  source={require('')} style={styles.image}/> */}  
            <View style={styles.inputContainer}>
            
             <Text style={styles.title}>Welcome to Kruppa</Text>
                <Text style={styles.fieldName}>username</Text>
                <StandardFormInput
                    placeholder="username"        
                    value={username}
                    handleChange={handleUsernameInputChange}
                />

                <Text style={styles.fieldName}>email       </Text>
                <StandardFormInput
                    placeholder="email"        
                    keyboardType="email-address"
                    value={email}
                    handleChange={handleEmailInputChange}
                />

                <Text style={styles.fieldName}>password</Text>
                <StandardFormInput                        
                    placeholder="password"   
                    secureTextEntry ='true'     
                    value={password}
                    handleChange={handlePasswordInputChange}
                />
                <Text style={styles.errorInput}>{errorMessage}</Text>
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
        paddingBottom : '40%',
      
    },

    image: {

    },

    title: {
        alignSelf: 'center',
        marginTop: '50%',
        fontSize: 30,
        fontWeight: "bold",
        color: '#F0F0F0',
        marginBottom: '15%',
    },

    fieldName: {
        alignItems: 'flex-start',
        color :"white",
        marginTop:'3%',
        marginBottom: '-3%',
        marginLeft: '-65%',
        fontSize: 14,        
    },

    errorInput: {
        fontSize : '12',
        color : 'red',

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