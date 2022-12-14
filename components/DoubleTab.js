import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

function DoubleTab(props) {
    const [isTabLeftFocused, setIsTabLeftFocused] = useState(false);
    const [isTabRightFocused, setIsTabRightFocused] = useState(false);

    function handleClickTabLeft() {
        setIsTabLeftFocused(true);
        setIsTabRightFocused(false);
        props.onPressLeft()
    };
    function handleClickTabRight() {
        setIsTabRightFocused(true);
        setIsTabLeftFocused(false);
        props.onPressRight()
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
        backgroundColor: '#272D31'
    },
    tabFocus: {
        height: 30,
        width: '42.5%',
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
        width: '42.5%',
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

export default DoubleTab