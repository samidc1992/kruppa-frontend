import MapView, { Marker } from 'react-native-maps';
import { Keyboard, Text, TouchableWithoutFeedback, Platform, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import * as Location from 'expo-location';
import { saveWorkoutLocation, removeWorkoutLocation } from '../reducers/workoutLocation'
import { useDispatch } from 'react-redux';


export default function SearchWorkoutLocationScreen({ navigation }) {

    const dispatch = useDispatch()



    // const BACKEND_ADRESS = 'http://192.168.10.132:3000'

    //state for user current position
    const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });

    //state to store workout location chosen by the user
    const [location, setLocation] = useState({ label: '', latitude: 0, longitude: 0 })
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

    //search for locations
    const launchSearch = async () => {

        //clean previous research
        setErrorMessage('')

        // manage inputs 
        if (!searchInputValue) {
            setErrorMessage('Please search for an address or touch the map to choose a location.')
            Keyboard.dismiss()
            return
        }
        if (searchInputValue && searchInputValue.length < 3) {
            setErrorMessage('Location must contain at least 3 characters.')
            Keyboard.dismiss()
            return
        }

        //search location from Search input with API api.gouv
        if (searchInputValue.length) {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${searchInputValue}`)
            const data = await response.json()

            //manage error from API
            if (data.code === 400) {
                setErrorMessage('Location not found.')
                Keyboard.dismiss()
                return
            }

            //location found with the API
            setLocation(
                {
                    label: data.features[0].properties.label,
                    latitude: data.features[0].geometry.coordinates[1],
                    longitude: data.features[0].geometry.coordinates[0],
                })

            //center map on research
            setRegionView({
                latitude: data.features[0].geometry.coordinates[1],
                longitude: data.features[0].geometry.coordinates[0],
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })

            // display name of the location found in search input
            setSearchInputValue(data.features[0].properties.label)
        }

        //clean screen
        Keyboard.dismiss()
    }

    //display marker on the map
    const marker = (<Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title={location.label} />);

    //save location in reducer and go back to create group screen
    const handleSaveLocation = () => {
        //dispatch workoutLocation in reducer
        dispatch(saveWorkoutLocation(location))
        //go back to screen
        navigation.navigate('GroupCreation')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <MapView
                    region={regionView}
                    style={styles.mapContainer}
                >
                    {marker}
                </MapView>
            </TouchableWithoutFeedback>

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
            <SecondaryButton
                text='Save location'
                onPress={() => handleSaveLocation()}
            />
        </KeyboardAvoidingView >
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