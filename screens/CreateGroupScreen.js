import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, TouchableHighlight, ScrollView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from '../components/PrimaryButton';
import StandardFormInput from '../components/StandardFormInput';
import { dropdownStyles } from '../styles/dropdown';

const CreateGroupScreen = () => {
    const [name, setName] = useState("")

    const handleNameInputChange = () => {
        console.log('name')
    }

    const handleSubmit = () => {
        console.log('submit')
    }



    return (

        <SafeAreaView style={styles.pageContainer}>

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

            <View style={styles.inputContainer}>
                <StandardFormInput
                    inputLabel='GroupName'
                    placeholder="Group name"
                    value={name}
                    handleChange={handleNameInputChange}
                />

            </View>


            <PrimaryButton
                text='Create group'
                onPress={() => handleSubmit()}
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
        marginTop: '2%',
        marginBottom: '5%',
        marginRight: '5%',

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
        fontSize: 18,
        color: '#FF6317',
        alignSelf: 'flex-end',
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






export default CreateGroupScreen