import { StyleSheet } from 'react-native';

// TO USE THIS STYLE :

// import { dropdownStyles } from '../styles/dropdown';

// DropDownPicker.setTheme("DARK");
// const [open, setOpen] = useState(false);
// const [value, setValue] = useState(null);
// const [items, setItems] = useState([
//     { label: 'Apple', value: 'apple' },
//     { label: 'Banana', value: 'banana' },
//     { label: 'Pear', value: 'pear' },
//     { label: 'Kiwi', value: 'kiwi' },
//     { label: 'Ananas', value: 'ananas' },
// ]);


//To get the items selected : value

//  <DropDownPicker
//     style={dropdownStyles.header}
//     textStyle={dropdownStyles.text}
//     containerStyle={dropdownStyles.container}
//     multiple={true}
//     open={open}
//     value={value}
//     items={items}
//     setOpen={setOpen}
//     setValue={setValue}
//     setItems={setItems}
//   
// /> 


// WORK IN PROGRESS : CUSTOM THEME

// const myTheme = require('../styles/darkDropdownTheme');

// DropDownPicker.addTheme("darkDropdownTheme", myTheme);
// DropDownPicker.setTheme("darkDropdownTheme");

export const dropdownStyles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A474E',
        height: 45,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: '#7E8284',
        borderBottomWidth: 1,
        paddingLeft: 10,
    },
    text: {
        fontSize: 20,
        color: '#7E8284',
    },

    closedDropContainer: {
        width: '85%',
        margin: 5,
        zIndex: 1,
    },

    openDropContainer: {
        width: '85%',
        margin: 5,
        zIndex: 999,
    },


})

