import MapView, { Marker } from 'react-native-maps';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { dropdownStyles } from '../styles/dropdown';
import { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput'
import PrimaryButton from '../components/PrimaryButton'
import * as Location from 'expo-location';


export default function SearchScreen({ navigation }) {

    //state for user current position
    const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });

    //search input setup
    const [searchInputValue, setSearchInputValue] = useState('')
    const handleSearchInputChange = value => setSearchInputValue(value)

    //dropdown setup
    DropDownPicker.setTheme("DARK");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    //fetch sports in DB for the dropdown list
    const [sports, setSports] = useState([])
    useEffect(() => {
        fetch('http://192.168.10.152:3000/sports')
            .then(response => response.json())
            .then(data => {
                //format sports for the dropdown list
                const dropdownSports = data.sports.map(e => { return ({ label: e, value: e }) })
                setSports(dropdownSports);
            });
    }, []);


    // get user permission and current location
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                Location.watchPositionAsync({ distanceInterval: 10 },
                    (location) => {
                        setCurrentPosition(location.coords);
                    });
            }
        })();
    }, []);


    function launchSearch() {
        console.log('launch search')

        //if user did not fill any field, error message
        //if user did not fill location, search around me ?
        // if user did not fill sport ? 

        // get values from input
        console.log('sport selected :' + value)
        console.log('location searched :' + searchInputValue)

        //search location from Search input with API api.gouv
        if (searchInputValue.length === 0) {
            return
        }
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${searchInputValue}`)
            .then((response) => response.json())
            .then((data) => {
                const firstLocationFound = data.features[0];
                const locationFound = {
                    name: firstCity.properties.city,
                    latitude: firstCity.geometry.coordinates[1],
                    longitude: firstCity.geometry.coordinates[0],
                };
                console.log('location found : ' + locationFound)
            })
        // fetch route search
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <MapView
                    region={{
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.mapContainer}
                >
                    {currentPosition && <Marker
                        coordinate={currentPosition}
                        title="My position"
                        pinColor="red"
                    />}
                </MapView>
            </TouchableWithoutFeedback>

            <View style={styles.contentContainer}>
                <DropDownPicker
                    style={dropdownStyles.header}
                    textStyle={dropdownStyles.text}
                    containerStyle={dropdownStyles.container}
                    multiple={false}
                    open={open}
                    value={value}
                    items={sports}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setSports}
                />
                <SearchInput
                    placeholder="Where ?"
                    value={searchInputValue}
                    handleChange={handleSearchInputChange}
                />
                <PrimaryButton
                    text='Search'
                    onPress={() => launchSearch()}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272D31',
    },
    contentContainer: {
        height: '40%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
    },
    mapContainer: {
        height: '60%',
        width: '100%',
    }

})