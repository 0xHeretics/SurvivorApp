import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
//import Button from '../components/Button';
import {Button, Drawer , Appbar} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ProfileScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.loggedIn) {
          const response = await fetch('https://masurao.fr/api/employees/me', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
              'X-Group-Authorization': 'T3GaqarVQwo6e799gSNF7wY28tktBd02',
            },
          });
          if (response.ok) {
            const responseData = await response.json();
            //console.log('Employee Data:', responseData);
            setUserDetails(responseData);
          } else {
            console.error('API Request Error:', response.status);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      <Drawer.Section title="Menu" style={{ display: isDrawerOpen ? 'flex' : 'none' }}>
        <Drawer.Item
          label="Home"
          icon="home"
          onPress={() => {
            closeDrawer();
            navigation.navigate('HomeScreen');
          }}
        />
          <Drawer.Item
            label="Profile"
            icon="account"
            onPress={() => {
              closeDrawer();
              navigation.navigate('ProfileScreen');
            }}
          />
        <Drawer.Item
          label="Widgets"
          icon="television-shimmer"
          onPress={() => {
            logout();
          }}
        />
          <Drawer.Item
            label="Logout"
            icon="logout"
            onPress={() => {
              logout();
            }}
          />
      </Drawer.Section>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome {userDetails?.name} {userDetails?.surname}</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;