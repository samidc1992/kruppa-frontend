import MapView, { Marker } from 'react-native-maps';
import { Keyboard, Text, TouchableWithoutFeedback, Platform, StyleSheet, View, KeyboardAvoidingView, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import * as Location from 'expo-location';
import { saveWorkoutLocation, removeWorkoutLocation } from '../reducers/workoutLocation'
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



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

    // manage adding a custom location
    const [modalVisible, setModalVisible] = useState(false);
    const [customLocationName, setCustomLocationName] = useState('')

    //search input setup
    const [searchInputValue, setSearchInputValue] = useState('')
    const handleSearchInputChange = value => setSearchInputValue(value)

    //manage error messages
    const [errorMessage, setErrorMessage] = useState('')
    const [modalErrorMessage, setModalErrorMessage] = useState('')

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

    //open modal on long press
    const handleLongPress = (e) => {
        setLocation({ label: 'my custom workout location', ...e.nativeEvent.coordinate });
        setModalVisible(true);
    };

    // close modal
    const handleClose = () => {
        setModalVisible(false);
        setCustomLocationName('');
        setLocation({ label: '', latitude: 0, longitude: 0 });
        setModalErrorMessage('')
    };

    const handlecustomLocationName = () => {
        if (!customLocationName.length) {
            setModalErrorMessage('Please add a name to your custom localisation.')
        }
        else {
            setModalVisible(false);
            setSearchInputValue(customLocationName)
            setLocation(prev => { return { ...prev, label: customLocationName } })
        }
    }

    //display marker on the map
    const marker = (<Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}
        title={location.label ? location.label : customLocationName}
    />);

    //save location in reducer and go back to create group screen
    const handleSaveLocation = () => {
        //dispatch workoutLocation in reducer

        // //if custom location is filled
        // if(customLocationName) {
        //     dispatch()
        // }
        dispatch(saveWorkoutLocation(location))
        //go back to screen
        navigation.navigate('GroupCreation')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>


            <Modal visible={modalVisible} animationType="fade" transparent>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FontAwesome
                            name='times'
                            size={25}
                            color='#F0F0F0'
                            onPress={handlecustomLocationName}
                            style={{ alignSelf: 'flex-end', margin: '5%' }}
                        />
                        <SearchInput
                            value={customLocationName}
                            placeholder="Add a name ..."
                            handleChange={(value) => setCustomLocationName(value)}
                        />
                        <PrimaryButton
                            text='Use this location'
                            onPress={handlecustomLocationName}
                        />


                    </View>
                </View>
            </Modal>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <MapView
                    region={regionView}
                    style={modalVisible ? styles.mapContainerFullScreen : styles.mapContainer}
                    onLongPress={(e) => handleLongPress(e)}
                >
                    {marker}
                </MapView>
            </TouchableWithoutFeedback>

            <View style={modalVisible ? { display: 'none' } : styles.contentContainer}>


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
            </View>
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
    mapContainerFullScreen: {
        height: '100%',
        width: '100%',

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#272D31',
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
        height: '35%',
    },

    error: {
        color: 'red',
        textAlign: 'left',
        width: '85%',
        fontSize: 16,

    },
    modalerror: {
        width: 150,
        color: 'red',
        textAlign: 'left',
        fontSize: 16,
    }

})