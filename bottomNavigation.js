import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, AntDesign } from '@expo/vector-icons';
import HomeScreenNavigator from './homescreenNavigator';
import SearchScreenNavigator from './searchScreennavigator';
import LoginScreen from './login';
import ProfileScreen from './profileScreen';
import FavouriteScreenNavigator from './favourtieScreenNavigator';
import { useUserContext } from './userProvider';
import { useState } from 'react';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function BottomNavigation({ route, navigation }) {
  const { setIsLoggedInfun, setIsLoggedIn } = route.params;
  const { currentUser } = useUserContext();



  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle:{marginBottom:11,backgroundColor:'white',borderRadius:20},
        tabBarInactiveTintColor:'black',
        tabBarActiveBackgroundColor:'#ead7f5',
        tabBarItemStyle:{borderRadius:25}

      }}
    >
      <Tab.Screen name="home" component={HomeScreenNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='home' size={30} />
          )
        }}
      />
      <Tab.Screen name="Search" component={SearchScreenNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='search1' size={30} />
          )
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreenNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='hearto' size={30} />
          ),
          tabBarBadge: currentUser.favouriteItems.length > 0 ? currentUser.favouriteItems.length : null
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ setIsLoggedInfun, setIsLoggedIn }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='user' size={30} />
          )
        }}
      />

    </Tab.Navigator>
  )
}