import MapView, { Marker } from 'react-native-maps';
import { Keyboard, Text, TouchableWithoutFeedback, Platform, StyleSheet, View, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { dropdownStyles } from '../styles/dropdown';
import { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput'
import PrimaryButton from '../components/PrimaryButton'
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { storeGroupId } from '../reducers/group';
import { BACKEND_ADDRESS } from '../backendAdress';
import DoubleTab from '../components/DoubleTab'
import GroupCard from '../components/GroupCard'

export default function SearchScreen({ navigation }) {

    const dispatch = useDispatch();

    const [displayMap, setDisplayMap] = useState(true)

    //state for user current position
    const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });

    //region view on map
    const [regionView, setRegionView] = useState({
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [searchResultView, setSearchRegionView] = useState(null)

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
        fetch(`${BACKEND_ADDRESS}/sports`)
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

    //search for groups
    const launchSearch = async () => {

        //clean previous research
        setErrorMessage('')
        setSearchResults([])
        let urlParams = { sport: '', latitude: '', longitude: '' }

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

        //get sport from input
        urlParams.sport = sportValue

        //search location from Search input with API api.gouv
        if (searchInputValue.length) {
            response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${searchInputValue}`)
            data = await response.json()

            //manage error from API
            if (data.code === 400) {
                setErrorMessage('Location not found.')
                Keyboard.dismiss()
                return
            }

            //location found with the API
            const locationFound = {
                name: data.features[0].properties.label,
                latitude: data.features[0].geometry.coordinates[1],
                longitude: data.features[0].geometry.coordinates[0],
            };

            // store latitude and longitude for the backend fetch later
            urlParams.latitude = locationFound.latitude
            urlParams.longitude = locationFound.longitude

            //center map on research
            setSearchRegionView({
                latitude: locationFound.latitude,
                longitude: locationFound.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            })

            // display name of the location found in search input
            setSearchInputValue(locationFound.name)
        }



        //if no location was researched, use the current location of the user instead
        else if (currentPosition.latitude) { //check if current location is filled
            urlParams.latitude = currentPosition.latitude
            urlParams.longitude = currentPosition.longitude

            //center map on user position
            setRegionView({
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
        //building query URL for fetching route search
        const url = (
            `${BACKEND_ADDRESS}/groups/search?sport${urlParams.sport && '=' + urlParams.sport}&latitude${urlParams.latitude && '=' + urlParams.latitude}&longitude${urlParams.longitude && '=' + urlParams.longitude}`
        );
        //fetch route search
        const groupsResponse = await fetch(url)
        const groupsData = await groupsResponse.json()

        //if query is successful, set the search results and clean the error message
        if (groupsData.result) {
            setSearchResults(groupsData.groups)
            setErrorMessage('')
        }
        //else, put an error message
        else {
            setErrorMessage('No groups found.')
        }
        //clean screen
        Keyboard.dismiss()
    }

    //get markers from search result and display on Map
    const markers = searchResults.map((data, i) => {
        return <Marker
            key={i}
            coordinate={{
                latitude: data.workout_location.location.coordinates[1],
                longitude: data.workout_location.location.coordinates[0]
            }}
            title={data.name}
            description={data.description}
            onPress={() => dispatch(storeGroupId(data._id))}
            onCalloutPress={() => navigation.navigate('Group')}
            pinColor='green'
        />;
    });

    const groups = searchResults.map((data, i) => {
        let { sport, name, maxMembers, _id } = data
        return <View style={styles.group} key={i}>
            <GroupCard
                sport={sport.label}
                name={name}
                membersNum={3}
                maxMembers={maxMembers}
                handlePress={() => {
                    dispatch(storeGroupId(_id))
                    navigation.navigate('Group')
                }}
            />
        </View>
        
    })

    const map = (<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MapView
            region={searchResultView ? searchResultView : regionView}
            style={styles.mapContainer}
        >
            {markers}
            {currentPosition && <Marker
                coordinate={currentPosition}
                title="My position"
                pinColor="#FF6317"
            />}
        </MapView>
    </TouchableWithoutFeedback>)

    const list = (
    <ScrollView styles={styles.scrollView}>
        <View style={styles.groupsListContainer}>
            {groups}
        </View>
    </ScrollView>
    )

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
                { displayMap ? map : list }
            <View style={styles.contentContainer}>
                <View style={styles.tabContainer}>
                <DoubleTab
                    textTabLeft="Map"
                    textTabRight="List"
                    onPressLeft={()=> setDisplayMap(true)}
                    onPressRight={()=> setDisplayMap(false)}
                />
                </View>
                <View style={{ width: '100%', marginBottom: 5, alignItems: 'center', zIndex: 999 }}>
                    <DropDownPicker
                        style={dropdownStyles.header}
                        textStyle={dropdownStyles.text}
                        containerStyle={open ? dropdownStyles.openDropContainer : dropdownStyles.closedDropContainer}
                        multiple={false}
                        open={open}
                        value={sportValue}
                        items={sports}
                        setOpen={setOpen}
                        setValue={setSportValue}
                        setItems={setSports}
                    />
                </View>
                <SearchInput
                    placeholder="Where?"
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
    groupsListContainer: {
        alignItems: 'center',
        paddingTop: '10%'
    },
    error: {
        color: 'red',
        textAlign: 'left',
        width: '85%',
        fontSize: 16,
    },
    tabContainer: {
        height: 40,
        width: '100%',
        top: -25,
    },
    group: {
        width: '96%',
        alignItems: 'center'
    },
})