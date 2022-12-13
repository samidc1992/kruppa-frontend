import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { dropdownStyles } from '../styles/dropdown';
import { useState } from 'react';
import SearchInput from '../components/SearchInput'
import PrimaryButton from '../components/PrimaryButton'




export default function SearchScreen({ navigation }) {
    //search input setup
    const [searchInputValue, setSearchInputValue] = useState('')
    const handleSearchInputChange = value => setSearchInputValue(value)

    //add here useEffect to fetch all the sports to put in the dropdown

    //dropdown setup
    DropDownPicker.setTheme("DARK");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Running', value: 'running' },
        { label: 'Football', value: 'football' },
        { label: 'Yoga', value: 'yoga' },
        { label: 'Tennis', value: 'tennis' },
    ]);

    function launchSearch() {
        console.log('launch search')
    }


    return (
        // <SafeAreaView >
        <View style={styles.container}>

            <View style={styles.mapContainer}>
                <Text>Map here</Text>
            </View>

            <View style={styles.contentContainer}>
                <Text style={{ color: 'white' }}>Tabs here</Text>
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
                <SearchInput
                    placeholder="Where ?"
                    value={searchInputValue}
                    handleChange={handleSearchInputChange}
                />
                <PrimaryButton
                    text='Primary Button'
                    onPress={() => launchSearch()}
                />
            </View>
        </View>
        // {/* </SafeAreaView> */ }
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow'
    },
    contentContainer: {
        height: '50%',
        width: '100%',
        backgroundColor: '#272D31',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    mapContainer: {
        height: '50%'

    }


})