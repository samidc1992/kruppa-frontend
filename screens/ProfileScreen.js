import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ScrollView,TouchableHighlight  } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SecondaryButton from '../components/SecondaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import user from '../reducers/user';
import {login, logout} from '../reducers/user';

export default function ProfileScreen({ navigation }) {

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch ();

    //const [username, setUsername] = useState('');
    //const [favoriteSports, setFavoriteSports] = useState([]);
    //const [userDescription, setUserDescription] = useState('');


    // Get user's profile information 
     const BACKEND_ADDRESS = 'http://192.168.0.30:3000';
       useEffect(() => {   
           fetch(`${BACKEND_ADDRESS}/users`, {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                token: user.token,
               })
            })
            .then(response => response.json())
            .then(data => { 
              if (data.result) { 
                console.log(data.userData.username);
                dispatch(login({
                  token: user.token, 
                  username: data.userData.username,  
                  description: data.userData.description,}
                 )); 
             };} )
        }, []);

      // Get user's favorite sports list
        const selectedSportsList =  user.favoriteSports.map((data, i) => {   
                return (     
                  <View style={styles.sportsListDisplay}>
                    <Text key={i} style={styles.boldTextStyle}>{data.sport} </Text>
                    <Text key={i} style= {styles.textStyle}>({data.level}) </Text>
                  </View>   
              ) 
      })
    
         return(

        <SafeAreaView style={styles.screenContainer}>
              <FontAwesome 
                 name='sign-out'
                 style={styles.signOutStyle} 
                 size={25} 
                 color='#F0F0F0'
                 onPress={() => { 
                   dispatch (logout);
                   navigation.navigate('Welcome');
                  }}
                /> 
                <View style={styles.headerContainer}>
                  <TouchableHighlight
                      style = {styles.profilePicture} >
                      <Text></Text>
                  </TouchableHighlight>
                  <View style={styles.userInformation}>
                      <Text style={styles.userText}>@ {user.username}</Text>
                      <Text style={styles.userText}>{user.userAge} years old</Text>
                  </View>
                </View>
                
              <View style={styles.bodyContainer}>
                 <ScrollView contentContainerStyle={styles.scrollView}>     
                    <View style={styles.sportsContainer}>
                      <Text style={styles.subTitle}>Favorite Sports</Text>
                      {selectedSportsList} 
                      </View>

                      <View style={styles.descriptionContainer}>
                          <Text style={styles.subTitle}>Description</Text>
                          <Text style={styles.textStyle}>{user.description}</Text>
                      </View>
              </ScrollView>
             </View>

                <View style={styles.bottomContainer}>
                  <SecondaryButton  
                    text='Edit profile'
                    disabled ={false}
                    activeOpacity={0.8}
                    onPress={() => handleEditButton()}
                   />          
                  </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: '#272D31', 
    },

    signOutStyle : {
     alignSelf :'flex-end',
     marginTop: '1%',
     marginRight : '5%',
   },
    headerContainer: {
      height: 180,
      alignItems :'center',
    },

    userText: {
      fontSize: 15,
      color: 'white',
      marginLeft : 50,
      marginBottom: 1,
    },


    profilePicture: {
      borderRadius: 130, 
      width: 130,
      height: 130,
      backgroundColor:'#979797',
      alignSelf: 'flex-start',
      marginTop: 25,
      marginLeft: 20
    },

    userInformation: {
      alignSelf: 'center',
      marginLeft: 10,
      marginTop: '-20%',
    },

    bodyContainer: {
      height: 300,
      justifyContent: 'space-around',
      marginTop: 15,
      marginLeft: 20,
      marginRight:20,
   },
   scrollView: {
    height: '100%',
    width: '100%',
  
    justifyContent: 'space-around',
  },

   sportsContainer: {
    flexDirection: 'column',
    height: '50%',
   },

   descriptionContainer: {
    height: '50%',
   },
 
    subTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: 'white',
      width: '85%',
      marginBottom: 1,
    },

    sportsListDisplay : {
      flexDirection: 'row',
    
    },

    boldTextStyle: {
      fontSize: 15,
      color: '#F0F0F1',
      fontWeight: 'bold',
      marginLeft: 10,
      marginTop: 5,
    },

    textStyle : {
      fontSize: 15,
      color: '#F0F0F0',
      fontStyle : 'italic',
      marginTop: 5,
    },
   

    bottomContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: '-85%',
    },

})