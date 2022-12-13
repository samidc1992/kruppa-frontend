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
          body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
          imgUrl: "../assets/running-1.jpg",
        },
        {
          body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
          imgUrl: "../assets/running-2.jpg",
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
            />
            <Text style={styles.header}>Welcome to Kruppa</Text>
            <Text style={styles.body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...</Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.smallBtnsContainer}>
                    <PrimaryButtonSmall 
                    text='Sign Up' 
                    onPress={() => navigation.navigate('SignUp')}/>
                    <PrimaryButtonSmall 
                    text='Sign In' 
                    onPress={() => navigation.navigate('SignIn')}/>
                </View>
                <PrimaryButton 
                text='Explore' 
                onPress={() => navigation.navigate('Search')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#3A474E',
    },
    header: {
        color: 'white',

        width: '85%',
        fontSize: 34,
        fontWeight: '600',
        fontFamily: 'Inter',
        position: 'absolute',
        paddingTop: '20%'
    },
    body: {
        color: 'white',
        width: '85%',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Inter',
        position: 'absolute',
        paddingTop: '160%'
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        paddingTop: '175%'
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