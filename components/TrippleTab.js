import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleLeftTabFocused, handleMiddleTabFocused, handleRightTabFocused } from '../reducers/tab';

function TrippleTab(props) {
    /*     const [isTabLeftFocused, setIsTabLeftFocused] = useState(true);
        const [isTabMiddleFocused, setIsTabMiddleFocused] = useState(false);
        const [isTabRightFocused, setIsTabRightFocused] = useState(false);  */
    const tab = useSelector((state) => state.tab.value);
    const dispatch = useDispatch();

    function handleClickTabLeft() {
        dispatch(handleLeftTabFocused(true));
        dispatch(handleMiddleTabFocused(false));
        dispatch(handleRightTabFocused(false));
        props.onPressLeft();

    };
    function handleClickTabMiddle() {
        dispatch(handleLeftTabFocused(false));
        dispatch(handleMiddleTabFocused(true));
        dispatch(handleRightTabFocused(false));
        props.onPressMiddle();

    };
    function handleClickTabRight() {
        dispatch(handleLeftTabFocused(false));
        dispatch(handleMiddleTabFocused(false));
        dispatch(handleRightTabFocused(true));
        props.onPressRight();
    };
    return (
        <View style={styles.container}>
            <View style={tab.leftTabFocused ? styles.tabFocus : styles.tab}>
                <Text
                    style={tab.leftTabFocused ? styles.tabTextFocus : styles.tabText}
                    onPress={() => handleClickTabLeft()}
                >
                    {props.textTabLeft}
                </Text>
            </View>
            <View style={tab.middleTabFocused ? styles.tabFocus : styles.tab}>
                <Text
                    style={tab.middleTabFocused ? styles.tabTextFocus : styles.tabText}
                    onPress={() => handleClickTabMiddle()}
                >
                    {props.textTabMiddle}
                </Text>
            </View>
            <View style={tab.rightTabFocused ? styles.tabFocus : styles.tab}>
                <Text
                    style={tab.rightTabFocused ? styles.tabTextFocus : styles.tabText}
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