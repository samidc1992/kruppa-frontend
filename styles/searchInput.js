import { StyleSheet } from 'react-native';

// TO USE THIS STYLE :

// import { searchInputStyles } from '../styles/searchInput';

// const [searchIsFocused, setSearchIsFocused] = useState(false);

// <TextInput style={searchIsFocused ? searchInputStyles.inputFocus : searchInputStyles.input}
//     onChangeText={text => setTextInputValue(text)}
//     value={textInputValue}
//     placeholder="Where ?"
//     placeholderTextColor="#7E8284"
//     onBlur={() => setSearchIsFocused(false)}
//     onFocus={() => setSearchIsFocused(true)}
// />

export const searchInputStyles = StyleSheet.create({

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

    }
})

