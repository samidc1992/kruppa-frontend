import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import MemberCard from '../components/MemberCard';

export default function EliseStylesScreen({ navigation }) {
    // const [image, setImage] = useState(null);
    let image = null

    const BACKEND_ADDRESS = 'http://192.168.10.132:3000'


    //pick image from user's gallery
    const pickImage = async () => {
        console.log('enter pick image')
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result)

        if (!result.canceled) {
            console.log('!result.canceled')
            image = result.assets[0].uri;

            //upload photo to backend
            const formData = new FormData();


            formData.append('profilePicture', {
                uri: image,
                name: 'profilePicture.jpg',
                type: 'image/jpeg',
            });
            console.log('fromData : ' + JSON.stringify(formData))

            //travail en cours - on entre bien dans le backend mais ça plante - à continuer

            //UPLOAD picture in backend
            fetch(`${BACKEND_ADDRESS}/users/upload`, {
                method: 'POST',
                body: formData,
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    const userToUpdate = { token: 'h6q18eUZKrMIaAdiYE3jseSmW0hvTTz9', url: data.url };
                    console.log(userToUpdate)

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
                        })

                });
        }
    };

    return (

        <View style={styles.container}>

            <MemberCard
                username='@johndoe'
                age={30}
                level='intermediate'
            />
            <MemberCard
                username='@johndoe'
                age={30}
                level='intermediate'
            />
            <MemberCard
                username='@johndoe'
                age={30}
                level='intermediate'
            />
            <MemberCard
                username='@johndoe'
                age={30}
                level='intermediate'
            />

            {/* <View styles={styles.headerContainer}>
                {image && <Image source={{ uri: image }} style={{
                    width: 100, height: 100, borderRadius: 100, justifyContent: 'center', alignSelf: 'center', marginTop: '2%'
                }}
                />}

                <View style={styles.uploadPicture}>
                    <Text style={styles.underlineText}>Upload Profile Picture</Text>
                    <FontAwesome name='upload' onPress={() => pickImage()} size={18} color='#979797' />
                </View>

            </View> */}

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272D31'
    },


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


