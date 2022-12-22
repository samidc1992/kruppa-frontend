import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import GroupScreenMain from './screens/GroupScreenMain';
import GroupScreenMembers from './screens/GroupScreenMembers';
import GroupScreenSessions from './screens/GroupScreenSessions';
import SearchScreen from './screens/SearchScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignUpProfileScreen from './screens/SignUpProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MessagesScreen from './screens/MessagesScreen';
import EliseStylesScreen from './screens/EliseStyles';
import NawelStylesScreen from './screens/NawelStyles';
import SamiStylesScreen from './screens/SamiStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import group from './reducers/group';
import tab from './reducers/tab'
import workoutLocation from './reducers/workoutLocation';
import CreateGroupScreen from './screens/CreateGroupScreen';
import SearchWorkoutLocationScreen from './screens/SearchWorkoutLocationScreen';

const store = configureStore({
  reducer: { user, group, workoutLocation, tab },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = "";

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Search") {
          iconName = "search";
        } else if (route.name === "Messages") {
          iconName = "envelope";
        } else if (route.name === "Profile") {
          iconName = "user";
        }
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#FF6317",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#251E1E',
        borderTopColor: '#251E1E'
      }
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Elise" component={EliseStylesScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Group" component={GroupScreenMain} />
          <Stack.Screen name="GroupMembers" component={GroupScreenMembers} />
          <Stack.Screen name="GroupSessions" component={GroupScreenSessions} />
          <Stack.Screen name="SignUpProfile" component={SignUpProfileScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="SearchWorkoutLocation" component={SearchWorkoutLocationScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="GroupCreation" component={CreateGroupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
