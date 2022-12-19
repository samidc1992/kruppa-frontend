import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { InputOutline } from 'react-native-input-outline';

import { useState } from 'react';


function StandardFormInput(props) {

  return (
    <View style={styles.container}>
      <InputOutline
        style={styles.input}
        onChangeText={value => props.handleChange(value)}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor="#7E8284"
        activeColor='#FF6317'
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        onBlur={() => setInputOutlineIsFocused(false)}
        onFocus={() => setInputOutlineIsFocused(true)}
        backgroundColor='#3A474E'
        assistiveTextFontSize={15}
        fontSize={15}
        paddingVertical={17}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },

  inputLabel: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'stretch',
    marginTop: '3%'
  },

  input: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A474E',
    height: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: '#7E8284',
    borderBottomWidth: 1,
    fontSize: 15,
    color: '#F0F0F0',
    width: '100%',
  },

  inputFocus: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A474E',
    height: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: '#FF6317',
    borderBottomWidth: 2,
    fontSize: 15,
    color: '#F0F0F0',
    width: '100%',
  },


  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '85%',
    height: 55,
    marginTop: 10
  },
})

export default StandardFormInput