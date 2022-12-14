import MapView, { Marker } from 'react-native-maps';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { dropdownStyles } from '../styles/dropdown';
import { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput'
import PrimaryButton from '../components/PrimaryButton'
import * as Location from 'expo-location';


export default function SearchScreen({ navigation }) {

    const BACKEND_ADRESS = 'http://192.168.10.140:3000'

    //state for user current position
    const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });

    //region view on map
    const [regionView, setRegionView] = useState({
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    console.log(regionView)

    //search input setup
    const [searchInputValue, setSearchInputValue] = useState('')
    const handleSearchInputChange = value => setSearchInputValue(value)

    //dropdown setup
    DropDownPicker.setTheme("DARK");
    const [open, setOpen] = useState(false);
    const [sportValue, setSportValue] = useState(null);

    // search results
    const [searchResults, setSearchResults] = useState([])
    // console.log('searchResults : ' + JSON.stringify(searchResults))

    //fetch sports in DB for the dropdown list
    const [sports, setSports] = useState([])
    useEffect(() => {
        fetch(`${BACKEND_ADRESS}/sports`)
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
                        setRegionView({
                            latitude: currentPosition.latitude,
                            longitude: currentPosition.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })
                    });
            }
        })();
    }, []);


    function launchSearch() {

        //if user did not fill any field, error message
        //if user did not fill location, search around me ?
        // if user did not fill sport ? 

        // get values from input
        // console.log('sport selected :' + value)
        // console.log('location searched :' + searchInputValue)

        const urlParams = { sport: null, latitude: null, longitude: null }

        //how to not search API if searchInput is empty ?
        urlParams.sport = sportValue


        //search location from Search input with API api.gouv
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${searchInputValue}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log('data from address API : ' + JSON.stringify(data))
                if (!data.features[0]) {
                    console.log('no result')
                    return
                }
                const firstLocationFound = data.features[0];
                const locationFound = {
                    name: firstLocationFound.properties.label,
                    latitude: firstLocationFound.geometry.coordinates[1],
                    longitude: firstLocationFound.geometry.coordinates[0],
                };
                console.log('location found : ' + JSON.stringify(locationFound))
                // fetch route search with location found

                urlParams.latitude = locationFound.latitude
                urlParams.longitude = locationFound.longitude
                console.log(JSON.stringify(urlParams))

                const url = (
                    `${BACKEND_ADRESS}/groups/search?` +
                    new URLSearchParams(urlParams).toString()
                );

                console.log(url)

                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        setSearchResults(data.groups)

                        //center map on research
                        setRegionView({
                            latitude: locationFound.latitude,
                            longitude: locationFound.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })

                        //clean screen
                        Keyboard.dismiss()
                        setSearchInputValue('')
                    })


            })
    }

    //get markers from search result and display on Map
    const markers = searchResults.map((data, i) => {
        return <Marker key={i} coordinate={{ latitude: data.workout_location.location.coordinates[1], longitude: data.workout_location.location.coordinates[0] }} title={data.name} />;
    });


    // console.log(markers)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <MapView
                    region={regionView}
                    style={styles.mapContainer}
                >
                    {markers}
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
                    value={sportValue}
                    items={sports}
                    setOpen={setOpen}
                    setValue={setSportValue}
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