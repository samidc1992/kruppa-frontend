
import { View, Text, StyleSheet, SafeAreaView,Image, Dimensions, TouchableHighlight, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import {TextInput} from 'react-native-paper';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';
import { dropdownStyles } from '../styles/dropdown'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect } from "react";

const myTheme = require('../styles/darkDropdownTheme');


export default function SignUpProfileScreen({ navigation }) { 

    DropDownPicker.addTheme("darkDropdownTheme", myTheme);
    DropDownPicker.setTheme("darkDropdownTheme");

    DropDownPicker.setTheme("DARK");

   //DropDown setup
    const [openGenderDrop, setOpenGenderDrop] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [GenderItems, setGenderItems] = useState([
        { label: 'your gender', value: 'your gender' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
        { label: 'Prefer not to discuss', value: 'prefer not to discuss' },
    ]);
    const [openSportDrop, setOpenSportDrop] = useState(false);
    const [sportValue, setSportValue] = useState(null);

    const [openLevelDrop, setOpenLevelDrop] = useState(false);
    const [levelValue, setLevelValue] = useState(null);
    const [levelItems, setLevelItems] = useState([
        { label: 'select your level', value: 'select your level' },
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
    ]);

    //Outline setup
    const [dateValue, setDateValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    //Selected sports setup
    const [selectedSportsandLevels, setSelectedSportsandLevels] = useState([]);
    const [availableSports, setAvailableSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');

    //Handle inputChange functions
    const handleDateInputChange = value => setDate(value);
    const handleDescriptionInputChange = value => setDescription(value);   

     // Get sports from DB for dropdown list
    const BACKEND_ADDRESS = 'http://192.168.0.30:3000';

   
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

 
     // Add selected sports to user's profile  

    const handleAddPress =() => {
        if (selectedSportsandLevels.length === 0 ) {
            setSelectedSportsandLevels([{sport:selectedSport, level:selectedLevel}]);
        } else {
            setSelectedSportsandLevels([...selectedSportsandLevels, {sport:selectedSport, level:selectedLevel}]);
        }; 
        };

        const selectedSportsList =  selectedSportsandLevels.map((data, i) => {    
            if (selectedSportsandLevels.length > 0 )   {
                return (      
                    <View style={styles.sportsListContainer}>
                        <Text key={i} style={styles.resultAddText}>{data.sport} ({data.level})</Text>
                         <FontAwesome name='trash-o' 
                           onPress={() => { setSelectedSportsandLevels(selectedSportsandLevels.filter(e => 
                            e[i] !== selectedSportsandLevels[i]))
                            } } size={15} color='#F0F0F0' /> 
                    </View>                
                ) }
        })
      
     // Handle add a picture    


    // Create the profile and add it in the DB
    const handlePressPrimaryButton = () => {
       navigation.navigate('TabNavigator', { screen: 'Profile' })
    }

   /*   // 
      if (genderValue !== null && selectedSportsandLevels.length > 0 && descriptionValue !== '' && dateValue !== '') {
        return ( 

        )
     } */

   
   
 
    return (     
        
        <SafeAreaView style={styles.screenContainer}>
            
            <View styles={styles.headerContainer}>
               <TouchableHighlight
                    style = {styles.profilePicture} >
                    <Text></Text>
                </TouchableHighlight>
                <View style={styles.uploadPicture}>
                    <Text style={styles.underlineText}>Upload Profile Picture</Text>
                    <FontAwesome name='upload' onPress={() => handleUpload()} size={18} color='#979797' />
                </View>
            </View>


             <ScrollView contentContainerStyle={styles.scrollView}>  
               <View style={styles.inputContainer}>  
                  <Text style={styles.fieldName}>Gender</Text>
                  <DropDownPicker
                    placeholder='your gender?'
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

                  <StandardFormInput
                    inputLabel='Date of birth'
                    placeholder="YYYYMMDD"   
                    type='date'     
                    value={dateValue}
                    handleChange={handleDateInputChange}
                  />

                  <Text style={styles.fieldName}>My favorite sports</Text>
                  <DropDownPicker
                    placeholder='select a sport'
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
                    onChangeValue = {(value) => {
                        setSelectedSport(value);                                           
                        }}
                  /> 

                <DropDownPicker
                    placeholder='select your level'
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
                    onChangeValue = {(value) => {
                        setSelectedLevel(value); 
                                                      
                        }}
                  /> 
                  <Text style={styles.addSportsText} onPress={() => handleAddPress()}>+ add sport</Text>
                  { selectedSportsList}
                  

                  <StandardFormInput
                    inputLabel= 'Description'
                    placeholder="How do your describe yourself?"  
                    style={styles.textInputStyles}      
                    value={descriptionValue}
                    handleChange={handleDescriptionInputChange}
                  />
           </View>  
            </ScrollView>  

            <View style={styles.bottomContainer}>
              <PrimaryButton  
                    text='Create a profile'
                    disabled ={false}
                    activeOpacity={0}
                    onPress={() => handlePressPrimaryButton()}
                />          
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#272D31', 
        justifyContent: 'center', 
    },

     scrollView: {
        height: '100%',
        width: '100%',
        paddingBottom: 20,
      }, 

    inputContainer: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',  
        height: '100%',
        width: '100%',  
    },

    headerContainer: {
       /*  alignSelf: 'center',
        marginTop: '35%',
        fontSize: 30,
        fontWeight: "bold",
        color: '#F0F0F0',       
        marginBottom: '10%',  */
    },
    
    profilePicture: {
        borderRadius: 100, 
        width: 100,
        height: 100,
        backgroundColor:'#979797',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '2%',
    },

    uploadPicture: {
        flexDirection: 'row',
        marginTop: '2%',
    },

    underlineText: {
        color:'#979797',
        marginTop:'2%',
        marginBottom: '5%',
        marginRight: '5%',
    },

    sportsListContainer: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'flex-start',
    },

    resultAddText: {
        fontSize: 14,
        color : '#F0F0F0',
        alignSelf : 'stretch',
        marginLeft : 15,
        marginBottom : 20,
        paddingRight: '2%',

    },


    fieldName: {       
        color :"white",
        marginTop:'4%',       
        fontSize: 15,  
        alignSelf: 'stretch',
        marginLeft: '7%',
        marginBottom :'-2%',
    },

    error: {
        marginTop : 15,
        fontSize : '15',
        color : 'red',
    },

    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40
    },

    addSportsText: {
        fontSize: 18,
        color: '#FF6317',
        alignSelf : 'flex-end',
        marginTop: '5%',
        marginRight: '7%',
    },

    bottomContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 30,
        bottom: 30,
    },

    bottomContainer: {
        width: '100%',
        alignItems:'center',
        
    },

    

})

  
            
   