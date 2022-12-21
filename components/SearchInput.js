import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';





function SearchInput(props) {
    const [searchIsFocused, setSearchIsFocused] = useState(false);
    // const handleChangeText = () => {
    //     props.handleChange(props.value)
    // }
    return (
        <View style={{ width: '85%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>

            <TextInput style={searchIsFocused ? styles.inputFocus : styles.input}
                onChangeText={value => props.handleChange(value)}
                value={props.value}
                placeholder={props.placeholder}
                placeholderTextColor="#7E8284"
                onBlur={() => setSearchIsFocused(false)}
                onFocus={() => setSearchIsFocused(true)}

            />
            <FontAwesome style={styles.icon} name='times' onPress={() => props.handleDelete()} size={20} color='#979797' />
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A474E',
        width: '100%',
        height: 50,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // margin: 5,
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
        width: '100%',
        height: 50,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // margin: 5,
        borderBottomColor: '#FF6317',
        borderBottomWidth: 2,
        paddingLeft: 10,
        fontSize: 20,
        color: '#fff',

    },
    icon: {
        position: 'absolute',
        right: '5%'
    }
})

export default SearchInput