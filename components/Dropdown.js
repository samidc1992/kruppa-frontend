import React from 'react'
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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


function Dropdown(props) {
    return (
        <DropDownPicker
            style={styles.header}
            textStyle={styles.text}
            containerStyle={styles.container}
            multiple={props.mulitple}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    )
}

export const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A474E',
        height: 50,
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
    container: {
        width: '80%',
        margin: 5
    },

})

export default Dropdown