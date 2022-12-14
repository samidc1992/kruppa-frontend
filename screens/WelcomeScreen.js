import { StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, { slider_width, item_width }from '../components/Carousel';
import { useRef } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryButtonSmall from '../components/PrimaryButtonSmall';

export default function WelcomeScreen({ navigation }) {
    
    const isCarousel = useRef(null);

    const data = [
        {
            header: "New to Kruppa?",
            body: "Join now and discover what your neighboors are doing to keep in shape.",
            image: require("../assets/running-2.jpg"),
        },
        {
            header: "EXPLORE AROUND YOU",
            body: "Search workout groups in your city and neighbourhood.",
            image: require("../assets/cycling-1.jpg"),
        },
        {
            header: "CONNECT TO PEOPLE",
            body: "Reach out to people and workout with them.",
            image: require("../assets/workout-1.jpg"),
          },
      ];

    return (
        <View style={styles.container}>
            <Carousel
                layout="default"
                layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={slider_width}
                itemWidth={item_width}
                inactiveSlideShift={0}
                useScrollView={true}
                autoplay={true}
                autoplayInterval={5000}
                loop={true}
            />
            <Text style={styles.header}>Welcome to Kruppa</Text>
            <View style={styles.buttonsContainer}>
                <PrimaryButtonSmall 
                text='Sami Styles' 
                onPress={() => navigation.navigate('Sami')}/>
                <View style={styles.smallBtnsContainer}>
                    <PrimaryButtonSmall 
                    text='Join Now' 
                    onPress={() => navigation.navigate('SignUp')}/>
                    <PrimaryButtonSmall 
                    text='Sign In' 
                    onPress={() => navigation.navigate('SignIn')}/>
                </View>
                <PrimaryButton 
                text='Explore' 
                onPress={() => navigation.navigate('TabNavigator', { screen: 'Search' })}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    header: {
        color: 'white',
        width: '85%',
        fontSize: 34,
        fontWeight: '600',
        fontFamily: 'Inter',
        position: 'absolute',
        top: 60,
        textAlign: 'center'
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40
    },
    smallBtnsContainer: {
        flexDirection: 'row',
    }
})

// <TouchableOpacity
//     onPress={() => navigation.navigate('Elise')}>
//     <Text>Elise Styles</Text>
// </TouchableOpacity>
// <TouchableOpacity
//     onPress={() => navigation.navigate('Nawel')}>
//     <Text>Nawel Styles</Text>
// </TouchableOpacity>
// <TouchableOpacity
//     onPress={() => navigation.navigate('Search')}>
//     <Text>Search screen</Text>
// </TouchableOpacity>