import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ScrollView,TouchableHighlight  } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SecondaryButton from '../components/SecondaryButton';

export default function ProfileScreen({ navigation }) {


    // 
    const handleEditButton = () => {

    }

    return(

        <SafeAreaView style={styles.screenContainer}>
             <ScrollView contentContainerStyle={styles.scrollView}>  
              <View styles={styles.headerContainer}>
              <FontAwesome name='cog'style={styles.settingsStyle} onPress={() => { }} size={30} color='#F0F0F0' /> 
                <TouchableHighlight
                    style = {styles.profilePicture} >
                    <Text></Text>
                 </TouchableHighlight>
                 <View style={styles.uploadPicture}>
                    <Text style={styles.userText}>@username</Text>
                    <Text style={styles.userText}>age</Text>
                   {/*  <FontAwesome name='upload' onPress={() => handleUpload()} size={18} color='#979797' /> */}
                 </View>
                </View>

                <View style={styles.bodyContainer}>

                   {/* Favorite sports
                      reducer user.selectedSports
                      user.description */}

                </View>

             </ScrollView>
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

    scrollView: {
        height: '100%',
        width: '100%',
        paddingBottom: 20,
      },

      settingsStyle : {
        alignSelf :'flex-end',
        marginTop: '1%',
        marginRight : '2%',
      },

      profilePicture: {
        borderRadius: 130, 
        width: 130,
        height: 130,
        backgroundColor:'#979797',
        alignSelf: 'flex-start',
        marginTop: '10%',
        marginLeft: '10%',
    },

    uploadPicture: {
      alignSelf: 'center',
       marginLeft: '35%',
       marginTop: '-20%',
    },

    userText : {
        fontSize: 18,
        color: '#F0F0F0',
    },
   
    bottomContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: -500,
    }

})