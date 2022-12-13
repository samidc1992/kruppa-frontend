import { TouchableOpacity, StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';

import React from 'react';
import { useState } from 'react';
import StandardFormInput from '../components/StandardFormInput';


export default function NawelStylesScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleUsernameInputChange = value => setUsername(value);
    const handleEmailInputChange = value => setEmail(value);
    const handlePasswordInputChange = value => setPassword(value);

  
   
return (      
    
   <View style={styles.container}>
        <TextInput style={styles.fieldName}>username</TextInput>
        <StandardFormInput
        placeholder="username"        
        value={username}
        handleChange={handleUsernameInputChange}
    />
    <Text style={styles.fieldName}>email</Text>
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
    </View>

)

}

const styles = StyleSheet.create({
     container: {
        flex: 1,      
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272D31'
    },  
    fieldName: {
        alignItems: 'flex-start',
        color :"white",
        marginTop:'5%',
        marginBottom: '-3%',
        marginLeft: '-53%',
        fontSize: 14,        
    }

   
})