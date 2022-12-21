import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, TouchableHighlight, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from '../components/PrimaryButton';
import SearchInput from '../components/SearchInput'
import { dropdownStyles } from '../styles/dropdown';
import NumericInput from 'react-native-numeric-input'
import { useSelector, useDispatch } from 'react-redux';
import { storeGroupId } from '../reducers/group';
import { removeWorkoutLocation } from '../reducers/workoutLocation';
import { BACKEND_ADDRESS } from '../backendAdress';
import TopBar from '../components/TopBar';
import { LogBox } from 'react-native'

export default function CreateGroupScreen({ navigation }) {

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])

    const dispatch = useDispatch()

    //get workout location chosen by user on screen "search workout location" from reducer
    const workoutLocationSelected = useSelector((state) => state.workoutLocation.value);

    //get user connected from reducer
    const userLogged = useSelector((state) => state.user.value)

    //dropdown style
    DropDownPicker.setTheme("DARK");

    //group name
    const [name, setName] = useState("")

    //ages input
    const [ageMin, setAgeMin] = useState(18)
    const [ageMax, setAgeMax] = useState(99)

    //level dropdown
    const [levelSportDrop, setLevelSportDrop] = useState(false);
    const [levelValue, setLevelValue] = useState(null);
    const [levelItems, setLevelItems] = useState([
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
    ]);

    //manage error messages
    const [errorMessage, setErrorMessage] = useState('')

    //sports dropdown
    const [openSportDrop, setOpenSportDrop] = useState(false);
    const [sportValue, setSportValue] = useState(null);
    const [sportItems, setSportItems] = useState([]);

    //genders dropdown
    const [openGenderDrop, setOpenGenderDrop] = useState(false);
    const [gendersValue, setGendersValue] = useState([]);
    const [gendersItems, setGendersItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'All genders', value: 'all' },
    ]);

    //max number of members
    const [maxNumber, setMaxNumber] = useState(0)

    //description
    const [description, setDescription] = useState('')


    //fetch sports in DB for the dropdown list
    useEffect(() => {
        fetch(`${BACKEND_ADDRESS}/sports`)
            .then(response => response.json())
            .then(data => {
                //format sports for the dropdown list
                const dropdownSports = data.sports.map(e => { return ({ label: e, value: e }) })
                setSportItems(dropdownSports);
            });
    }, []);

    //display workout location from reducer
    const workoutLocationElement = (
        <Text onPress={() => handleMapClick()} style={styles.location}>{workoutLocationSelected.label}</Text>
    )

    //redirirection to map for workout location
    const handleMapClick = () => {
        navigation.navigate('SearchWorkoutLocation')
    }

    const cleanScreen = () => {
        dispatch(removeWorkoutLocation())
        setName('')
        setDescription('')
        setErrorMessage('')
        setLevelValue(null)
        setMaxNumber(0)
        setSportValue(null)
        setGendersValue(null)
        setAgeMin(18)
        setAgeMax(99)
    }

    //submit group creation
    const handleSubmit = () => {

        if (!userLogged.token) {
            setErrorMessage('Please sign in before creating a group.')
            return
        }

        //fields control
        if (!name || !sportValue || !maxNumber || !gendersValue || !levelValue || !ageMin || !ageMax || !workoutLocationSelected) {
            setErrorMessage('Please fill all informations before creating the group.')
            return

        }

        //create request body
        const newGroup = {
            token: userLogged.token,
            photo: '.jpeg',
            name: name,
            sport: sportValue,
            maxMembers: maxNumber,
            genders: gendersValue,
            levels: levelValue,
            ageMin: ageMin,
            ageMax: ageMax,
            description: description,
            label: workoutLocationSelected.label,
            latitude: workoutLocationSelected.latitude,
            longitude: workoutLocationSelected.longitude
        }

        //POST new group 
        fetch(`${BACKEND_ADDRESS}/groups/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGroup),
        }).then((response) => response.json())
            .then((newEntry) => {

                //clean reducer and states
                cleanScreen()

                //dipatch group id for navigation
                dispatch(storeGroupId(newEntry.data._id))

                //go to group page
                navigation.navigate('Group')
            })

    }

    return (

        <SafeAreaView style={styles.pageContainer}>

            <TopBar
                onPress={() => {
                    cleanScreen()
                    navigation.goBack(null)
                }}
                text='Back'
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ width: '100%', height: '100%' }}>


                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


                    <ScrollView style={{ width: '100%' }}>
                        <View style={styles.contentContainer}>

                            <View styles={styles.pictureUploadContainer}>
                                <Image
                                    source={require('../assets/group-placeholder.jpg')}
                                    style={{ width: 250, height: 150, margin: 10 }} />

                                <View style={styles.uploadPictureText}>
                                    <Text style={styles.underlineText}>Upload Group Picture</Text>
                                    <FontAwesome name='upload' onPress={() => handleUpload()} size={18} color='#979797' />
                                </View>

                            </View>
                            <View style={{ width: '100%', marginLeft: '15%' }}>
                                <SearchInput
                                    placeholder="Group name"
                                    value={name}
                                    handleChange={(value) => setName(value)}
                                />
                            </View>

                            <Text style={styles.fieldName}>Sport</Text>
                            <DropDownPicker
                                placeholder='Select a sport'
                                style={dropdownStyles.header}
                                textStyle={dropdownStyles.text}
                                containerStyle={openSportDrop ? dropdownStyles.openDropContainer : dropdownStyles.closedDropContainer}
                                multiple={false}
                                open={openSportDrop}
                                value={sportValue}
                                items={sportItems}
                                setOpen={setOpenSportDrop}
                                setValue={setSportValue}
                                setItems={setSportItems}
                            />

                            <Text style={styles.fieldName}>Levels</Text>
                            <DropDownPicker
                                placeholder='Which levels does your group accept ?'
                                style={dropdownStyles.header}
                                textStyle={dropdownStyles.text}
                                containerStyle={levelSportDrop ? dropdownStyles.openDropContainer : dropdownStyles.closedDropContainer}
                                multiple={true}
                                open={levelSportDrop}
                                value={levelValue}
                                items={levelItems}
                                setOpen={setLevelSportDrop}
                                setValue={setLevelValue}
                                setItems={setLevelItems}
                            />

                            <Text style={styles.fieldName}>Maximum number of members</Text>
                            <View style={{ width: '85%' }}>

                                <NumericInput type='up-down'
                                    onChange={value => setMaxNumber(value)}
                                    totalWidth={150}
                                    totalHeight={45}
                                    iconSize={25}
                                    separatorWidth={0}
                                    step={1}
                                    rounded
                                    valueType='real'
                                    containerStyle={styles.numericInput}
                                    minValue={0}
                                    value={maxNumber}
                                    textColor='#7E8284'
                                    iconStyle={{ color: 'grey' }}
                                    upDownButtonsBackgroundColor='#3A474E'
                                    borderColor='#7E8284'
                                    leftButtonBackgroundColor='#3A474E'
                                    rightButtonBackgroundColor='#3A474E'
                                />
                            </View>

                            <Text style={styles.fieldName}>This group is made up of ...</Text>
                            <DropDownPicker
                                placeholder='Select genders'
                                style={dropdownStyles.header}
                                textStyle={dropdownStyles.text}
                                containerStyle={openGenderDrop ? dropdownStyles.openDropContainer : dropdownStyles.closedDropContainer}
                                multiple={false}
                                open={openGenderDrop}
                                value={gendersValue}
                                items={gendersItems}
                                setOpen={setOpenGenderDrop}
                                setValue={setGendersValue}
                                setItems={setGendersItems}
                            />

                            <Text style={styles.fieldName}>Minimum age</Text>
                            <View style={{ width: '85%' }}>

                                <NumericInput type='up-down'
                                    onChange={value => setAgeMin(value)}
                                    totalWidth={150}
                                    totalHeight={45}
                                    iconSize={25}
                                    step={1}
                                    rounded
                                    value={ageMin}
                                    valueType='real'
                                    containerStyle={styles.numericInput}
                                    minValue={0}
                                    textColor='#7E8284'
                                    iconStyle={{ color: 'grey' }}
                                    upDownButtonsBackgroundColor='#3A474E'
                                    borderColor='#7E8284'
                                    leftButtonBackgroundColor='#3A474E'
                                    rightButtonBackgroundColor='#3A474E'
                                />
                            </View>

                            <Text style={styles.fieldName}>Maximum age</Text>
                            <View style={{ width: '85%' }}>

                                <NumericInput type='up-down'
                                    onChange={value => setAgeMax(value)}
                                    totalWidth={150}
                                    totalHeight={45}
                                    iconSize={25}
                                    step={1}
                                    rounded
                                    valueType='real'
                                    value={ageMax}
                                    containerStyle={styles.numericInput}
                                    minValue={0}
                                    textColor='#7E8284'
                                    iconStyle={{ color: 'grey' }}
                                    upDownButtonsBackgroundColor='#3A474E'
                                    borderColor='#7E8284'
                                    leftButtonBackgroundColor='#3A474E'
                                    rightButtonBackgroundColor='#3A474E'
                                />
                            </View>

                            <Text style={styles.fieldName}>Workout location</Text>
                            {workoutLocationSelected.label != null && workoutLocationElement}

                            {workoutLocationSelected.label === null && <Text style={styles.rightUnderlineText} onPress={() => handleMapClick()}>Click here to choose your workout location on the map...</Text>}

                            <View style={{ width: '100%', marginLeft: '15%' }}>

                                <SearchInput
                                    placeholder="Group description"
                                    value={description}
                                    handleChange={(value) => setDescription(value)}
                                />
                            </View>
                            {errorMessage.length > 0 && <Text style={styles.error}>{errorMessage}</Text>}
                            <View style={{ width: '100%', margin: '5%', alignItems: 'center', justifyContent: 'center' }}>

                                <PrimaryButton
                                    text='Create group'
                                    onPress={() => handleSubmit()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({

    pageContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#272D31',
        // backgroundColor: 'green',
        justifyContent: 'center',
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        width: '100%',

    },
    pictureUploadContainer: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },

    uploadPictureText: {
        flexDirection: 'row',
        marginTop: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        marginBottom: 20,
        alignSelf: 'center'
    },

    underlineText: {
        color: '#979797',
        width: '85%',
        fontSize: 15

    },

    fieldName: {
        color: "white",
        marginTop: '4%',
        fontSize: 15,
        alignSelf: 'stretch',
        marginLeft: '8%',
        marginBottom: '-2%',
    },

    error: {
        color: 'red',
        textAlign: 'left',
        width: '85%',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 5
    },

    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40
    },

    rightUnderlineText: {
        fontSize: 15,
        color: '#FF6317',
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 10,
        width: '85%'

    },

    bottomContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 30,
        bottom: 30,
    },
    numericInput: {
        backgroundColor: '#3A474E',
        marginTop: 10,
        alignSelf: 'flex-start',
        fontSize: 14,
        borderWidth: 0,


    },

    location: {
        color: '#979797',
        // fontWeight: 'bold',
        textAlign: 'left',
        paddingTop: 10,
        fontSize: 16,
        width: '85%',
        textDecorationLine: 'underline'
    }

})