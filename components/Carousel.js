import React from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryButtonSmall from '../components/PrimaryButtonSmall';

//https://blog.logrocket.com/implement-react-native-snap-carousel/

export const slider_width = Dimensions.get('window').width;
export const item_width = Math.round(slider_width);

const CarouselCardItem = ({ item, index }) => {
  console.log(item.imgUrl)
  const img = item.imgUrl
  return (
    <View style={styles.container} key={index}>
      <ImageBackground
        source={require("../assets/running-2.jpg")}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    color: 'white',
    height: 55,
    width: '85%',
    fontSize: 34,
    fontWeight: '600',
  },
  body: {
    color: 'white',
    width: '85%',
    fontSize: 16,
    fontWeight: '400',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  smallBtnsContainer: {
      flexDirection: 'row',
  }
})

export default CarouselCardItem