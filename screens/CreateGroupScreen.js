import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, TouchableHighlight, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';
import { dropdownStyles } from '../styles/dropdown';
import NumericInput from 'react-native-numeric-input'
import { useSelector } from 'react-redux';
import workoutLocation from '../reducers/workoutLocation';



export default function CreateGroupScreen({ navigation }) {
    const BACKEND_ADDRESS = 'http://192.168.10.132:3000'

    //get workout location chosen by user on screen "search workout location" from reducer
    const workoutLocationSelected = useSelector((state) => state.workoutLocation.value);

    //dropdown style
    DropDownPicker.setTheme("DARK");

    //group name
    const [name, setName] = useState("")

    //level dropdown
    const [levelSportDrop, setLevelSportDrop] = useState(false);
    const [levelValue, setLevelValue] = useState(null);
    const [levelItems, setLevelItems] = useState([
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
    ]);


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

    //submit group creation
    const handleSubmit = () => {
        //clean reducer
        console.log('submit')
    }

    return (

        <SafeAreaView style={styles.pageContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <ScrollView style={{ width: '100%' }}>
                        <View style={styles.contentContainer}>

                            <View styles={styles.headerContainer}>
                                <TouchableHighlight
                                    style={styles.profilePicture} >
                                    <Text></Text>
                                </TouchableHighlight>
                                <View style={styles.uploadPicture}>

                                    <Text style={styles.underlineText}>Upload Group Picture</Text>
                                    <FontAwesome name='upload' onPress={() => handleUpload()} size={18} color='#979797' />
                                </View>

                            </View>

                            <StandardFormInput
                                inputLabel='Group Name'
                                placeholder="Group name"
                                value={name}
                                handleChange={(value) => setName(value)}
                            />

                            <Text style={styles.fieldName}>Sport</Text>
                            <DropDownPicker
                                placeholder='Select a sport'
                                style={dropdownStyles.header}
                                textStyle={dropdownStyles.text}
                                containerStyle={dropdownStyles.container}
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
                                containerStyle={dropdownStyles.container}
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
                                    step={1}
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

                            <Text style={styles.fieldName}>This group is made up of ...</Text>
                            <DropDownPicker
                                placeholder='Select genders'
                                style={dropdownStyles.header}
                                textStyle={dropdownStyles.text}
                                containerStyle={dropdownStyles.container}
                                multiple={false}
                                open={openGenderDrop}
                                value={gendersValue}
                                items={gendersItems}
                                setOpen={setOpenGenderDrop}
                                setValue={setGendersValue}
                                setItems={setGendersItems}
                            />

                            <Text style={styles.fieldName}>Workout location</Text>
                            {workoutLocationSelected.label != null && workoutLocationElement}

                            {workoutLocationSelected.label === null && <Text style={styles.rightUnderlineText} onPress={() => handleMapClick()}>Pick your location on the Map...</Text>}

                            <StandardFormInput
                                inputLabel='Description'
                                placeholder="Group description"
                                value={description}
                                handleChange={(value) => setDescription(value)}
                            />

                            <PrimaryButton
                                text='Create group'
                                onPress={() => handleSubmit()}
                            />
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
        backgroundColor: '#251E1E',
        justifyContent: 'center',
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },

    profilePicture: {
        borderRadius: 100,
        width: 100,
        height: 100,
        backgroundColor: '#979797',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '2%',
    },

    uploadPicture: {
        flexDirection: 'row',
        marginTop: '2%',
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
        marginTop: 15,
        fontSize: '15',
        color: 'red',
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