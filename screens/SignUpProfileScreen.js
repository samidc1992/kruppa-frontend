
import { View, Text, StyleSheet, SafeAreaView,Image, Dimensions, TouchableHighlight, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import {TextInput} from 'react-native-paper';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';
import { dropdownStyles } from '../styles/dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const myTheme = require('../styles/darkDropdownTheme');


export default function SignUpProfileScreen({ navigation }) { 

    DropDownPicker.addTheme("darkDropdownTheme", myTheme);
    DropDownPicker.setTheme("darkDropdownTheme");

    DropDownPicker.setTheme("DARK");

    const [openGenderDrop, setOpenGenderDrop] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [GenderItems, setGenderItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
        { label: 'Prefer not to discuss', value: 'prefer not to discuss' },
    ]);
    const [openSportDrop, setOpenSportDrop] = useState(false);
    const [sportValue, setSportValue] = useState(null);
    const [sportItems, setSportItems] = useState([]);

    const [levelSportDrop, setLevelSportDrop] = useState(false);
    const [levelValue, setLevelValue] = useState(null);
    const [levelItems, setLevelItems] = useState([
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
    ]);

    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleDateInputChange = value => setDate(value);
    const handleDescriptionInputChange = value => setDescription(value);   
    
    const handlePressPrimaryButton = () => {

        navigation.navigate('Profile');  
    }


 
    return (     
        
        <SafeAreaView style={styles.pageContainer}>

            <View styles={styles.headerContainer}>
            {/* <Image  source={require('')} style={styles.image}/> */} 
            <TouchableHighlight
                style = {styles.profilePicture} >
                <Text></Text>
                </TouchableHighlight>
                <View style={styles.uploadPicture}>

                 <Text style={styles.underlineText}>Upload Profile Picture</Text>
                 <FontAwesome name='upload' onPress={() => handleUpload()} size={18} color='#979797' />
                </View>

            </View>

          
              <View style={styles.inputContainer}> 

                  <Text style={styles.fieldName}>Gender</Text>
                  <DropDownPicker
                    placeholder='your gender?'
                    style={dropdownStyles.header}
                    textStyle={dropdownStyles.text}
                    containerStyle={dropdownStyles.container}                    
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
                    value={date}
                    handleChange={handleDateInputChange}
                  />

                  <Text style={styles.fieldName}>My favorite sport</Text>
                  <DropDownPicker
                    placeholder='select a sport'
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

                <DropDownPicker
                    placeholder='select your level'
                    style={dropdownStyles.header}
                    textStyle={dropdownStyles.text}
                    containerStyle={dropdownStyles.container}
                    multiple={false}
                    open={levelSportDrop}
                    value={levelValue}
                    items={levelItems}
                    setOpen={setLevelSportDrop}
                    setValue={setLevelValue}
                    setItems={setLevelItems}
                  /> 

                  <Text style={styles.rightUnderlineText} onPress={() => handleTextPress()}>+ add another sport</Text>

                  <StandardFormInput
                    inputLabel= 'Description'
                    placeholder="How do your describe yourself?"  
                    style={styles.textInputStyles}      
                    value={description}
                    handleChange={handleDescriptionInputChange}
                  />
           </View> 

            <PrimaryButton                    
                    text='Save'
                    onPress={() => handlePressPrimaryButton()}
                />           

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#251E1E', 
        justifyContent: 'center', 
    },

    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        height: '100%',
        width: '100%', 
    },
   

    image: {

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


    fieldName: {       
        color :"white",
        marginTop:'4%',       
        fontSize: 15,  
        alignSelf: 'stretch',
        marginLeft: '8%',
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

    rightUnderlineText: {
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
    }

})

  
            
   