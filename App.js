import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import BottomNavigation from './bottomNavigation';
import LoginScreen from './login';
import { UserProvider } from './userProvider'; 


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MainNavigation(){
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLoginStatus = () => {
    setIsLoggedIn(false);
    console.log(isLoggedIn) 
  };
  const setIsLoggedInfun = () => {
    setIsLoggedIn(true);
    console.log(isLoggedIn)
  };

  return(
  <Stack.Navigator
  screenOptions={{
    headerShown: false,
  }}
>
  {isLoggedIn&&<Stack.Screen name="Login" component={LoginScreen} initialParams={{ handleLoginStatus, }} />}
 {<Stack.Screen name ='bottomNavigator'component={BottomNavigation} initialParams={{setIsLoggedInfun,setIsLoggedIn}}/>}
</Stack.Navigator>
  )
}

export default function App({navigation}) {

    return (
      <PaperProvider>
       <UserProvider>
       <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="MainNavigation" component={MainNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
        </UserProvider>
      </PaperProvider>
    );
  


}
