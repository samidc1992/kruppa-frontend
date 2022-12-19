import React from 'react'
import { StyleSheet, View } from 'react-native';
import { InputOutline } from 'react-native-input-outline';

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
        fontColor="white"
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        backgroundColor='#3A474E'
        assistiveTextFontSize={15}
        fontSize={17}
        paddingVertical={17}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '85%',
    height: 55,
    marginTop: 10
  },
})

export default StandardFormInput