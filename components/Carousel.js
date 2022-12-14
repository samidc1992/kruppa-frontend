import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';

//https://blog.logrocket.com/implement-react-native-snap-carousel/
//https://amanhimself.dev/blog/custom-preview-image-gallery-in-react-native/

export const slider_width = Dimensions.get('window').width;
export const item_width = Math.round(slider_width);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <ImageBackground
        source={item.image}
        style={styles.image}
      >
        <View style={styles.textContainer}>
          <Text style={styles.header}>{item.header}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      </ImageBackground>
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
  textContainer: {
    width: '85%',
    position: 'absolute',
    bottom: 200
  },
  body: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  header: {
    color: 'white',
    width: '85%',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
  }
})

export default CarouselCardItem