import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// import { primaryButtonStyles } from '../styles/primaryButton';
// import { secondaryButtonStyles } from '../styles/secondaryButton';
// import { primaryButtonSmallStyles } from '../styles/primaryButtonSmall';
// import { secondaryButtonSmallStyles } from '../styles/secondaryButtonSmall';
import { searchInputStyles } from '../styles/searchInput';
import { dropdownStyles } from '../styles/dropdown';

import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import PrimaryButtonSmall from '../components/PrimaryButtonSmall'
import SecondaryButtonSmall from '../components/SecondaryButtonSmall'

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


    const handlePressPrimaryButton = () => {
        console.log('handlePressPrimaryButton')
    }
    const handlePressSecondaryButton = () => {
        console.log('handlePressSecondaryButton')
    }

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

            <PrimaryButton
                text='Primary Button'
                onPress={() => handlePressPrimaryButton()}
            />
            <SecondaryButton
                text='Secondary Button'
                onPress={() => handlePressSecondaryButton()}
            />
            <PrimaryButtonSmall
                text='Primary'
                onPress={() => handlePressPrimaryButton()}
            />
            <SecondaryButtonSmall
                text='Secondary'
                onPress={() => handlePressSecondaryButton()}
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

})