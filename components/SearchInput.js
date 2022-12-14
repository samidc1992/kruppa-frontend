import React from 'react'
import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';



function SearchInput(props) {
    const [searchIsFocused, setSearchIsFocused] = useState(false);
    // const handleChangeText = () => {
    //     props.handleChange(props.value)
    // }
    return (
        <TextInput style={searchIsFocused ? styles.inputFocus : styles.input}
            onChangeText={value => props.handleChange(value)}
            value={props.value}
            placeholder={props.placeholder}
            placeholderTextColor="#7E8284"
            onBlur={() => setSearchIsFocused(false)}
            onFocus={() => setSearchIsFocused(true)}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A474E',
        width: '85%',
        height: 45,
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
        width: '85%',
        height: 45,
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

export default SearchInput