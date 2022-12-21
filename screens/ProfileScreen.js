import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableHighlight, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SecondaryButton from '../components/SecondaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../reducers/user';
import { BACKEND_ADDRESS } from '../backendAdress';

export default function ProfileScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [sports, setSports] = useState([])


  // Get user's profile information 
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/users/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({token: user.token,})
    })
    .then(response => response.json())
    .then(data => {
      if(data.result) {
        let { username, birthDate, favoriteSports, description } = data.userData;
        let age = Math.floor((new Date() - new Date(birthDate))/31556952000);
        setUserInfo({
          username,
          age,
          description,
        });
        setSports(favoriteSports);
      }
    })
  }, []);

  // Get user's favorite sports list
  const sportsToDisplay = sports.map((data, i) => {
    return (
      <View key={i} style={styles.sportsListDisplay}>
        <Text style={styles.boldTextStyle}>{data.sport} </Text>
        <Text style={styles.textItalicStyle}>({data.level}) </Text>
      </View>
    )
  })

  return (
    <SafeAreaView style={styles.screenContainer}>
      <FontAwesome
        name='sign-out'
        style={styles.signOutStyle}
        size={25}
        color='#F0F0F0'
        onPress={() => {
          dispatch(logout());
          navigation.navigate('Welcome');
        }}
      />
      <View style={styles.headerContainer}>
       {/*  <TouchableHighlight
          style={styles.profilePicture} >
          <Text></Text>
        </TouchableHighlight> */}
        <Image
               source={require('../assets/profilepic.jpg')}
                style={styles.image}
            />
        <View style={styles.userInformation}>
          <Text style={styles.body}>{user.username}</Text>
          <Text style={styles.body}>{userInfo.age} years old</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.sportsContainer}>
            <Text style={styles.subTitle}>Favorite Sports</Text>
            {sportsToDisplay}
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.subTitle}>Description</Text>
            <Text style={styles.body}>{userInfo.description}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <SecondaryButton
          text='Edit profile'
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
  signOutStyle: {
    alignSelf: 'flex-end',
    marginTop: '1%',
    marginRight: '5%',
  },
  headerContainer: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    fontSize: 15,
    color: 'white',
    marginLeft: 10,
    marginBottom: 1,
  },
  profilePicture: {
    borderRadius: 130,
    width: 130,
    height: 130,
    backgroundColor: '#979797',
    alignSelf: 'flex-start',
    marginTop: 25,
    marginLeft: 20
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: '#979797',
    alignSelf: 'flex-start',
    marginTop: 25,
    marginLeft: 20
  
},
  bodyContainer: {
    height: 300,
    justifyContent: 'space-around',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
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
  sportsListDisplay: {
    flexDirection: 'row',
  },
  boldTextStyle: {
    fontSize: 15,
    color: '#F0F0F1',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  textItalicStyle: {
    fontSize: 15,
    color: '#F0F0F0',
    fontStyle: 'italic',
    marginTop: 5,
  },
  body: {
    fontSize: 15,
    color: '#F0F0F0',
    marginTop: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 40,
  },

})