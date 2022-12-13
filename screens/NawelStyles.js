import { TouchableOpacity, StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
//import { formControlsStyles } from '../styles/formControls';
import React from 'react';
import { useState } from 'react';


export default function NawelStylesScreen({ navigation }) {
     const [textInputValue, setTextInputValue] = useState('');
     const [searchIsFocused, setSearchIsFocused] = useState(false);
  
   
return (      
 <SafeAreaView style={styles.container}>
    <Text style={styles.outlinedText}>username</Text>

<TextInput style={searchIsFocused ? styles.inputFocus : styles.input}
    onChangeText={text => setTextInputValue(text)}
     value={textInputValue}
     placeholder="username"
    placeholderTextColor="#7E8284"
    mode = 'flat'
     onBlur={() => setSearchIsFocused(false)}
    onFocus={() => setSearchIsFocused(true)}
   />
 </SafeAreaView>
)}

const styles = StyleSheet.create({
     container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272D31'
    },  

    outlinedText: {
        fontSize : 18,
        color : '#fff',
        marginRight: 5,        
    },

    input: {
       /*  alignItems: 'center',
        justifyContent: 'center', */
        backgroundColor: '#3A474E',
        width: '75%',
        height: 40,
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
        width: '75%',
        height: 40,
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