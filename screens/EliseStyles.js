import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { primaryButtonStyles } from '../styles/primaryButton';
import { secondaryButtonStyles } from '../styles/secondaryButton';
import { primaryButtonSmallStyles } from '../styles/primaryButtonSmall';
import { secondaryButtonSmallStyles } from '../styles/secondaryButtonSmall';
import { searchInputStyles } from '../styles/searchInput';
import { dropdownStyles } from '../styles/dropdown';

// const myTheme = require('../styles/darkDropdownTheme');

// DropDownPicker.addTheme("darkDropdownTheme", myTheme);
// DropDownPicker.setTheme("darkDropdownTheme");

import { useState } from 'react';
import React from 'react';

export default function EliseStylesScreen({ navigation }) {


    const [textInputValue, setTextInputValue] = useState('');
    const [searchIsFocused, setSearchIsFocused] = useState(false);



    DropDownPicker.setTheme("DARK");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Pear', value: 'pear' },
        { label: 'Kiwi', value: 'kiwi' },
        { label: 'Ananas', value: 'ananas' },
    ]);

    //To get the items selected : value


    return (
        <View style={styles.container}>
            <DropDownPicker
                style={dropdownStyles.header}
                textStyle={dropdownStyles.text}
                containerStyle={dropdownStyles.container}
                multiple={true}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />

            <TextInput style={searchIsFocused ? searchInputStyles.inputFocus : searchInputStyles.input}
                onChangeText={text => setTextInputValue(text)}
                value={textInputValue}
                placeholder="Where ?"
                placeholderTextColor="#7E8284"
                onBlur={() => setSearchIsFocused(false)}
                onFocus={() => setSearchIsFocused(true)}
            />

            <TouchableOpacity style={primaryButtonStyles.button} activeOpacity={0.8}>
                <Text style={primaryButtonStyles.buttonText}>Primary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={secondaryButtonStyles.button} activeOpacity={0.8}>
                <Text style={secondaryButtonStyles.buttonText}>Secondary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={primaryButtonSmallStyles.button} activeOpacity={0.8}>
                <Text style={primaryButtonSmallStyles.buttonText}>Primary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={secondaryButtonSmallStyles.button} activeOpacity={0.8}>
                <Text style={secondaryButtonSmallStyles.buttonText}>Secondary</Text>
            </TouchableOpacity>

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

})