
import { View, Text, StyleSheet, SafeAreaView,TouchableHighlight, ScrollView, Pressable} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';
import { dropdownStyles } from '../styles/dropdown'; 
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import user from '../reducers/user';
import {login, updateDate, addFavoriteSports} from '../reducers/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from  "react-native-datepicker";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
//import { BACKEND_ADDRESS } from '../backendAdress';


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
    const [userAge, setUserAge] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState('');

    //Selected sports setup
    const [selectedSportsandLevels, setSelectedSportsandLevels] = useState([]);
    const [availableSports, setAvailableSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');

    const [fieldError, setFieldError] = useState('');
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch ();
   
    //Handle inputChange functions
    const handleDescriptionInputChange = value => setDescriptionValue(value);   

     // Get sports from DB for dropdown list
    const BACKEND_ADDRESS = 'http://192.168.0.30:3000';

    useEffect(() => {   
        fetch(`${BACKEND_ADDRESS}/sports`)
            .then(response => response.json())
            .then(data => {       
                const dropdownSports = data.sports.map(e => { return ({ label: e, value: e }) })
                setAvailableSports(dropdownSports);
                setSelectedSportsandLevels([]);
            });
     }, []);


    // Calculate user's age 
    const calculateAge = (birthDate) => {
        const ageInMs = Date.now() - new Date(birthDate).getTime();
        const ageDate = new Date(ageInMs);
        const Age = Math.abs(ageDate.getUTCFullYear()-1970);
         setUserAge (Age);
      };
   
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
                           onPress={() => handleRemoveSport ()}
                           size={15} color='#F0F0F0' /> 
                    </View>                
                ) }
        })

     // Remove a selected sport to delete from DB
     //   const handleRemoveSport = () => {}
     // Handle add a picture    


    // Create and add the user's  profile in DB
  
    const handlePressPrimaryButton = () => {
        fetch(`${BACKEND_ADDRESS}/users/signup`, {
            method : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                gender: genderValue,
                birthDate: dateValue,
                description: descriptionValue,
                favoriteSports: selectedSportsandLevels,
                registrations: [],
                token: user.token,
             })})
            .then(response => response.json())
            .then (data => {
                console.log('information', userAge);
              if (data.result) {   
                 dispatch(login({ 
                    token: user.token, 
                    //userAge: userAge,
                }));  
                  dispatch(updateDate({userAge : userAge}));
                  dispatch (addFavoriteSports(selectedSportsandLevels));
                  navigation.navigate('TabNavigator', { screen: 'Profile' });
                } else {  
                setFieldError(true);
              } 
            });   
      
    }
 
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

            {fieldError && <Text style={styles.error}>Oops! Something went wrong... Please try again! </Text>}

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


                 <Text style={styles.fieldName}>Date of birth</Text>
                 <DatePicker
                    style={styles.datePickerStyle}
                    date={dateValue} 
                    mode="date" 
                    placeholder="YYYY-MM-DD"
                    format="YYYY-MM-DD"
                    minDate={1960-12-31}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={styles.customDatePickerStyles}
                    onDateChange={(date) => { 
                        setDateValue(date);
                        calculateAge(date);
                       
                    }}
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
                    onChangeValue = {(value) => { setSelectedSport(value) }}
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
                    onChangeValue = {(value) => { setSelectedLevel(value) }}
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

    error: {
        marginTop : 15,
        fontSize : '15',
        fontWeight: 'bold',
        color : 'red',
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


    datePickerStyle: {
      width: 321,
      height: 45,
      backgroundColor: '#3A474E',     
      marginTop : '2%',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomColor: '#7E8284',
      borderBottomWidth: 1,
    },

    customDatePickerStyles: {    
            dateIcon: {
            position: 'absolute',
            right: 0,
            top: 4,
            marginLeft: 0,
            }, 
            dateInput: {     
            borderWidth: 0,
            bborderRadius: 5,
            }, 
            dateText: {
                color: '#F0F0F0',
                alignSelf:'',
                marginLeft: 10,
              },
            btnTextConfirm : {
                color: '#FF6317',
                fontWeight :'600',
            },
            btnTextCancel : {
                color: '#7E8284',
                fontWeight :'600',
            },
            placeholderText: {
                fontSize: 15,
                color: '#7E8284',
                alignSelf : '',
                marginLeft : 10,
            },
           
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

    textInputStyles: {
        fontSize: 15,
        color: 'white',
    },


    fieldName: {       
        color :"white",
        marginTop:'4%',       
        fontSize: 15,  
        alignSelf: 'stretch',
        marginLeft: '2%',
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

  
            
   