import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

function TrippleTab(props) {
    const [isTabLeftFocused, setIsTabLeftFocused] = useState(true);
    const [isTabMiddleFocused, setIsTabMiddleFocused] = useState(false);
    const [isTabRightFocused, setIsTabRightFocused] = useState(false);

    function handleClickTabLeft() {
        setIsTabLeftFocused(true);
        setIsTabMiddleFocused(false);
        setIsTabRightFocused(false);
        props.onPressLeft();
    };
    function handleClickTabMiddle() {
        setIsTabLeftFocused(false);
        setIsTabMiddleFocused(true);
        setIsTabRightFocused(false);
        props.onPressMiddle();
    };
    function handleClickTabRight() {
        setIsTabLeftFocused(false);
        setIsTabMiddleFocused(false);
        setIsTabRightFocused(true);
        props.onPressRight();
    };
    return (
        <View style={styles.container}>
            <View style={ isTabLeftFocused ? styles.tabFocus : styles.tab }>
                <Text 
                    style={ isTabLeftFocused ? styles.tabTextFocus : styles.tabText }
                    onPress={() => handleClickTabLeft()}
                >
                    {props.textTabLeft}
                </Text>
            </View>
            <View style={ isTabMiddleFocused ? styles.tabFocus : styles.tab }>
                <Text 
                    style={ isTabMiddleFocused ? styles.tabTextFocus : styles.tabText }
                    onPress={() => handleClickTabMiddle()}
                >
                    {props.textTabMiddle}
                </Text>
            </View>
            <View style={ isTabRightFocused ? styles.tabFocus : styles.tab }>
                <Text 
                    style={ isTabRightFocused ? styles.tabTextFocus : styles.tabText }
                    onPress={() => handleClickTabRight()}
                >
                    {props.textTabRight}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272D31',
        height: 30,
    },
    tabFocus: {
        height: 30,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "#FF6317",
        borderBottomWidth: 1,
        margin: 1
    },
    tabTextFocus: {
        color: "#FF6317",
        fontSize: 14,
        height: '100%',
        width: '100%',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    tab: {
        height: 30,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "#7E8284",
        borderBottomWidth: 1,
        margin: 1
    },
    tabText: {
        color: "#7E8284",
        fontSize: 14,
        height: '100%',
        width: '100%',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
});

export default TrippleTab