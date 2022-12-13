import { StyleSheet, View } from 'react-native';


// TO USE THIS STYLE :

// import { searchInputStyles } from '../styles/searchInput';

// const [text, setText] = useState('');


// <View style={styles.container}>
//   <View style={styles.labelContainer}> 
//     <Text>{label}</Text>  
//   </View>
//   <TextInput 
//    placeholder={label}
//    style={styles.textInput}
//   />
// </View>

//<View>
/*    Text style={StyleSheet.outlinedText}>{text}</Text>
  <TextInput
    placeholder ="username"
    placeholderTextColor="#7E8284"
    left={<TextInput.Icon name="account" />}
    style={{ margin: 10 }}
    mode = 'outlined'
    activeUnderlineColor="#FF6317" //when this TextInput is active, change its accent color to orange
    underlineColor="#979797" //when inactive, set color to grey
   
  />  */

  

  {/* <TextInput
    placeholder ="email"
    placeholderTextColor="#7E8284"
    left={<TextInput.Icon name="email" />}
    style={{ margin: 10 }}
    mode = 'outlined'
    keyboardType="email-address"
    activeUnderlineColor="#FF6317" //when this TextInput is active, change its accent color to orange
    underlineColor="#979797" //when inactive, set color to grey
  />
 */}
 
  /*   <TextInput
    placeholder ="password"
    placeholderTextColor="#7E8284"
    secureTextEntry
    left={<TextInput.Icon name="form-textbox-password" />}
    style={{ margin: 10 }}
    mode = 'outlined'
    activeUnderlineColor="#FF6317" //when this TextInput is active, change its accent color to orange
    underlineColor="#979797" //when inactive, set color to grey
    />
</View> */

export const formControlsStyles = StyleSheet.create({
    container: {
      height: 65, 
      position: 'relative',
    },

    outlinedText: {

    },

    labelContainer: {
      position: 'absolute',
      backgroundColor: '#FFF',
      top: -8,
      left: 25,
      padding: 5,
      zIndex: 50,
    },

    textInput: {
      flex: 1, 
      borderWidth: 1, 
      borderColor: "#FF6317",
      justifyContent: 'flex-end',
      height: 44,
      borderRadius: 5,
      paddingHorizontal: 25,
    }
  })
