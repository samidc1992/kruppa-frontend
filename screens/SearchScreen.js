import MapView, { Marker } from 'react-native-maps';
import { Keyboard, Text, TouchableWithoutFeedback, Platform, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
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

    //search input setup
    const [searchInputValue, setSearchInputValue] = useState('')
    const handleSearchInputChange = value => setSearchInputValue(value)

    //manage error messages
    const [errorMessage, setErrorMessage] = useState('')

    //dropdown setup
    DropDownPicker.setTheme("DARK");
    const [open, setOpen] = useState(false);
    const [sportValue, setSportValue] = useState(null);

    // search results
    const [searchResults, setSearchResults] = useState([])

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
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })
                    });
            }
        })();
    }, []);


    const launchSearch = async () => {
        setErrorMessage('')

        //manage inputs : at least sport or location should be filled
        if (!sportValue && !searchInputValue) {
            setErrorMessage('Please indicate location or sport.')
            Keyboard.dismiss()
            return
        }
        if (searchInputValue && searchInputValue.length < 3) {
            setErrorMessage('Location must contain at least 3 characters.')
            Keyboard.dismiss()
            return
        }

        // prepare query fetch GET group
        let urlParams = {
            sport: '', latitude: '', longitude: ''
        }

        //get sport from input
        urlParams.sport = sportValue

        //search location from Search input with API api.gouv
        if (searchInputValue.length) {
            response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${searchInputValue}`)
            data = await response.json()

            // console.log('data.feature[0]: ' + data.features[0])

            if (data.code === 400) {
                setErrorMessage('Location not found.')
                Keyboard.dismiss()
                return
            }
            const locationFound = {
                name: data.features[0].properties.label,
                latitude: data.features[0].geometry.coordinates[1],
                longitude: data.features[0].geometry.coordinates[0],
            };

            // console.log('location found : ' + JSON.stringify(locationFound))

            // fetch route search with location found

            urlParams.latitude = locationFound.latitude
            urlParams.longitude = locationFound.longitude
        }

        const url = (
            `${BACKEND_ADRESS}/groups/search?sport${urlParams.sport && '=' + urlParams.sport}&latitude${urlParams.latitude && '=' + urlParams.latitude}&longitude${urlParams.longitude && '=' + urlParams.longitude}`
        );

        console.log(url)

        const groupsResponse = await fetch(url)
        const groupsData = await groupsResponse.json()
        setSearchResults(groupsData.groups)

        // console.log(groupsData)

        //center map on research
        // setRegionView({
        //     latitude: locationFound.latitude,
        //     longitude: locationFound.longitude,
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421,
        // })

        //clean screen
        Keyboard.dismiss()
        // setSearchInputValue(locationFound.name)
    }

    // console.log('searchResults : ' + searchResults)

    //get markers from search result and display on Map
    const markers = searchResults.map((data, i) => {
        return <Marker key={i} coordinate={{ latitude: data.workout_location.location.coordinates[1], longitude: data.workout_location.location.coordinates[0] }} title={data.name} />;
    });

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
                        pinColor="#FF6317"
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
                {errorMessage.length > 0 && <Text style={styles.error}>{errorMessage}</Text>}
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
    },
    error: {
        color: 'red',
        textAlign: 'left',
        width: '85%',
        fontSize: 16,
    }

})