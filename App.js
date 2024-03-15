import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/views/LoginScreen';
import HomeScreen from './src/views/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/components/Loader';
import ProfileScreen from './src/views/ProfileScren';
import Widgets from './src/views/WidgetScreen';
import Trombi from './src/views/TrombiScreen';
//import ProfileScreen from './src/views/Profiletest';
//import ProfileScreens from './src/views/Profiletest';

const Stack = createNativeStackNavigator();


const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      // if (userData) {
      //   userData = JSON.parse(userData);
      //   if (userData.loggedIn) {
      //     setInitialRouteName('HomeScreen');
      //   } else {
      //     setInitialRouteName('LoginScreen');
      //   }
      // } else {
        setInitialRouteName('LoginScreen');
      //}
      } 
    catch (error) {
      setInitialRouteName('LoginScreen');
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={false} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="WidgetsScreen" component={Widgets} />
            <Stack.Screen name="Trombi" component={Trombi} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;