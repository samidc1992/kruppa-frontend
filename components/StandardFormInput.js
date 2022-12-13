import React from 'react'
import { StyleSheet, View, Text  } from 'react-native';
import { InputOutline } from 'react-native-input-outline'; 
import { useState } from 'react';


function StandardFormInput (props) {
   

    const [inputOutlineIsFocused, setInputOutlineIsFocused] = useState('');
    
    return (
      <View>
        <Text style={styles.inputLabel}>{props.inputLabel}</Text>
        <InputOutline
         
         style={inputOutlineIsFocused ? styles.inputFocus : styles.input}
         onChangeText={value => props.handleChange(value)}
         value={props.value}
         placeholder={props.placeholder}
         placeholderTextColor="#7E8284"
         activeColor ='#FF6317'    
         secureTextEntry ={props.secureTextEntry }
         keyboardType={props.keyboardType}

         onBlur={() => setInputOutlineIsFocused(false)}
         onFocus={() => setInputOutlineIsFocused(true)}
         
         
        />
      </View>
    )
}

const styles = StyleSheet.create({

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

    },
    
  
})

export default StandardFormInput