import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import GroupScreen from './screens/GroupScreen';
import SearchScreen from './screens/SearchScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignUpProfileScreen from './screens/SignUpProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MessagesScreen from './screens/MessagesScreen';
import EliseStylesScreen from './screens/EliseStyles';
import NawelStylesScreen from './screens/NawelStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


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
          iconName = "bell";
        } else if (route.name === "Profile") {
          iconName = "user";
        }
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#FF6317",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Group" component={GroupScreen} />
        <Stack.Screen name="Elise" component={EliseStylesScreen} />
        <Stack.Screen name="Nawel" component={NawelStylesScreen} />
        <Stack.Screen name="SignUpProfile" component={SignUpProfileScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Search" component={SearchScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
