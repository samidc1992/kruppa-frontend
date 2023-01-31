
import { View, Text, StyleSheet, SafeAreaView, TouchableHighlight, ScrollView, KeyboardAvoidingView, Image } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import PrimaryButton from '../components/PrimaryButton';
import SearchInput from '../components/SearchInput';
import { dropdownStyles } from '../styles/dropdown';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BACKEND_ADDRESS } from "../backendAddress";
import { LogBox } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const myTheme = require('../styles/darkDropdownTheme');

export default function SignUpProfileScreen({ navigation }) {

    //upload picture variables
    let image = null
    const [imageURL, setImageURL] = useState(null)

    DropDownPicker.addTheme("darkDropdownTheme", myTheme);
    DropDownPicker.setTheme("darkDropdownTheme");

    DropDownPicker.setTheme("DARK");

    //DropDown setup
    const [openGenderDrop, setOpenGenderDrop] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [GenderItems, setGenderItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
        { label: 'Prefer not to disclose', value: 'prefer not to disclose' },
    ]);
    const [openSportDrop, setOpenSportDrop] = useState(false);
    const [sportValue, setSportValue] = useState(null);

    const [openLevelDrop, setOpenLevelDrop] = useState(false);
    const [levelValue, setLevelValue] = useState(null);
    const [levelItems, setLevelItems] = useState([
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
    ]);

    //Outline setup
    const [dateValue, setDateValue] = useState(new Date());
    const [descriptionValue, setDescriptionValue] = useState('');

    //Selected sports setup
    const [selectedSportsandLevels, setSelectedSportsandLevels] = useState([]);
    const [availableSports, setAvailableSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');

    const [fieldError, setFieldError] = useState('');
    const user = useSelector(state => state.user.value);
    const group = useSelector(state => state.group.value);
    let { group_id } = group;

    //Handle inputChange functions
    const handleDescriptionInputChange = value => setDescriptionValue(value);

    // Get sports from DB for dropdown list
    useEffect(() => {
        fetch(`${BACKEND_ADDRESS}/sports`)
            .then(response => response.json())
            .then(data => {
                //format sports for the dropdown list              
                const dropdownSports = data.sports.map(e => { return ({ label: e, value: e }) })
                setAvailableSports(dropdownSports);
                setSelectedSportsandLevels([]);
            });
    }, []);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, []);

    // Add selected sports to user's profile  
    const handleAddPress = () => {
        if (selectedSportsandLevels.length === 0) {
            setSelectedSportsandLevels([{ sport: selectedSport, level: selectedLevel }]);
        } else {
            setSelectedSportsandLevels([...selectedSportsandLevels, { sport: selectedSport, level: selectedLevel }]);
        };
    };
    const selectedSportsList = selectedSportsandLevels.map((data, i) => {
        if (selectedSportsandLevels.length > 0) {
            return (
                <View style={styles.sportsListContainer} key={i}>
                    <Text style={styles.sports}>{data.sport} ({data.level})</Text>
                    <FontAwesome name='trash-o'
                        //onPress={() => handleRemoveSport()}
                        size={15} color='#F0F0F0' />
                </View>
            )
        }
    })

    //manage picture upload
    //pick image from user's gallery
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            image = result.assets[0].uri;

            //upload photo to backend
            const formData = new FormData();

            formData.append('profilePicture', {
                uri: image,
                name: 'profilePicture.jpg',
                type: 'image/jpeg',
            });

            //UPLOAD picture in backend
            fetch(`${BACKEND_ADDRESS}/users/upload`, {
                method: 'POST',
                body: formData,
            }).then((response) => response.json())
                .then((data) => {
                    const userToUpdate = { token: user.token, url: data.url };

                    //update user with photo url
                    fetch(`${BACKEND_ADDRESS}/users/picture`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userToUpdate),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data);
                            setImageURL(data.photo)

                        })
                });
        }
    };

    const handleSignup = () => {
        fetch(`${BACKEND_ADDRESS}/users/signup`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gender: genderValue,
                birthDate: dateValue,
                description: descriptionValue,
                favoriteSports: selectedSportsandLevels,
                registrations: [],
                token: user.token,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.result && group_id === null) {
                    navigation.navigate('TabNavigator', { screen: 'Profile' });
                } else {
                    setFieldError(true);
                    navigation.navigate('Group');
                }
            });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.profilePictureContainer}>
                    {!imageURL && <Image
                        source={require('../assets/profilepic.jpg')}
                        style={styles.image}
                    />}
                    {imageURL && <Image
                        source={{ uri: imageURL }}
                        style={styles.image}
                    />}
                    <View style={styles.uploadPicture}>
                        <Text style={styles.underlineText}>Upload Profile Picture</Text>
                        <FontAwesome name='upload' onPress={() => pickImage()} size={18} color='#979797' />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.fieldName}>Gender</Text>
                    <DropDownPicker
                        placeholder='Gender'
                        style={dropdownStyles.header}
                        textStyle={dropdownStyles.text}
                        containerStyle={openGenderDrop ? dropdownStyles.openDropContainer : dropdownStyles.closedDropContainer}
                        multiple={false}
                        open={openGenderDrop}
                        value={genderValue}
                        items={GenderItems}
                        setOpen={setOpenGenderDrop}
                        setValue={setGenderValue}
                        setItems={setGenderItems}
                    />
                    <Text style={styles.fieldName}>Birthday</Text>
                    <View style={styles.birthDate}>
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={dateValue}
                            mode='date'
                            is24Hour={true}
                            display='calendar'
                            onChange={(value) => {
                                setDateValue(new Date(value.nativeEvent.timestamp));
                            }}
                            textColor='white'
                            themeVariant='dark'
                            style={{ flex: 1, alignItems: 'stretch' }}
                        />
                    </View>
                    <Text style={styles.fieldName}>My favorite sports</Text>
                    <DropDownPicker
                        placeholder='Sport'
                        style={dropdownStyles.header}
                        textStyle={dropdownStyles.text}
                        containerStyle={openSportDrop ? dropdownStyles.openDropContainer : dropdownStyles.closedDropContainer}
                        multiple={false}
                        open={openSportDrop}
                        value={sportValue}
                        items={availableSports}
                        setOpen={setOpenSportDrop}
                        setValue={setSportValue}
                        setItems={setAvailableSports}
                        onChangeValue={(value) => {
                            setSelectedSport(value);
                        }}
                    />
                    <DropDownPicker
                        placeholder='Level'
                        style={dropdownStyles.header}
                        textStyle={dropdownStyles.text}
                        containerStyle={openLevelDrop ? dropdownStyles.openDropContainer : dropdownStyles.closedDropContainer}
                        multiple={false}
                        open={openLevelDrop}
                        value={levelValue}
                        items={levelItems}
                        setOpen={setOpenLevelDrop}
                        setValue={setLevelValue}
                        setItems={setLevelItems}
                        onChangeValue={(value) => {
                            setSelectedLevel(value);
                        }}
                    />
                    <Text style={styles.addSport} onPress={() => handleAddPress()}>+ add sport</Text>
                    {selectedSportsList}
                </View>
                <View style={styles.descriptionContainer}>
                    <SearchInput
                        style={styles.descriptionInput}
                        placeholder="Profile Description"
                        value={descriptionValue}
                        handleChange={handleDescriptionInputChange}
                        handleDelete={() => setDescriptionValue('')}
                    />
                </View>
                {fieldError && <Text style={styles.error}>Empty or missing fileds.</Text>}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    text='Create profile'
                    disabled={false}
                    activeOpacity={0}
                    onPress={() => handleSignup()}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272D31',
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    error: {
        fontSize: '15',
        fontWeight: 'bold',
        color: 'red',
        marginLeft: '8%',
    },
    profilePictureContainer: {
        alignItems: 'center',
    },
    profilePicture: {
        borderRadius: 100,
        width: 100,
        height: 100,
        backgroundColor: '#979797',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '15%',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150,
        marginLeft: '5%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '15%',

    },
    uploadPicture: {
        flexDirection: 'row',
        marginTop: '2%',
    },
    underlineText: {
        color: '#979797',
        marginTop: '2%',
        marginBottom: '5%',
        marginRight: '5%',
    },
    datePickerStyle: {
        width: 355,
        height: 45,
        backgroundColor: '#3A474E',
        marginTop: '2%',
        color: 'white'
    },
    sportsListContainer: {
        marginLeft: '4%',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    sports: {
        fontSize: 14,
        color: '#F0F0F0',
        alignSelf: 'stretch',
        marginLeft: 15,
        marginBottom: 20,
        paddingRight: '2%',
    },
    fieldName: {
        color: 'white',
        marginTop: '4%',
        fontSize: 15,
        alignSelf: 'stretch',
        marginLeft: '6%',
    },
    addSport: {
        fontSize: 16,
        color: '#FF6317',
        alignSelf: 'flex-end',
        marginRight: '5%',
        marginBottom: '3%'
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40
    },
    descriptionContainer: {
        alignItems: 'center',
        width: '100%',
        zIndex: '-1',
    },
    birthDate: {
        height: 55,
        width: '85%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },


})



