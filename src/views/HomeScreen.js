import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import {Button, Drawer , Appbar, Title} from 'react-native-paper';
import UserCard from '../components/Card';
import ColorfulCard from "@freakycoder/react-native-colorful-card";
import BasicCard from '../components/Card2';

const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();
  const [userProfile, setUserProfile]= useState();
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
            setUserDetails(responseData);
            const userID = responseData.id;
            await AsyncStorage.setItem('userID', userID.toString());
            getUserPicture();
          }
          } else { 
            console.error('API Request Error:', response.status);
          }
      }
    } catch (error) {
      console.error('aError:', error);
    }
  };

  const getUserPicture = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userID = await AsyncStorage.getItem('userID');
      console.log('caca', userID);
  
      if (accessToken && userID) {
        const img = await fetch(`https://masurao.fr/api/employees/${userID}/image`, {
          method: 'GET',
          headers: {
            Accept: 'image/png',
            'X-Group-Authorization': 'T3GaqarVQwo6e799gSNF7wY28tktBd02',
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (img.ok) {
        const imageBlob = await img.blob();
        const reader = new FileReader();
        reader.onload = () => {
          setUserProfile(reader.result); // Utilisez reader.result comme source d'image
        };
        reader.readAsDataURL(imageBlob);
        } else if (img.status === 404) {
          console.error('Employee not found');
        } else {
          console.error('API Request Error:', img.status);
        }
      } else {
        console.error('Access token or user ID not found in AsyncStorage');
      }
    } catch (error) {
      console.error('cError:', error);
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
    <View style={{position:'absolute', flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <Appbar.Content title="Home" />
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
            closeDrawer();
            navigation.navigate('WidgetsScreen')
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

      <View style={{top:30,left:15, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <UserCard img={userProfile} name={userDetails?.name} surname={userDetails?.surname}/>
      </View>
      <View style={{top:50, left:15}}>
        <BasicCard img={require("../assets/news.jpg") } Title={"Lorem Ipsum"} text={"Lorem Ipsum"} style={{}}></BasicCard>
      </View>
    </View>
  );
};

export default HomeScreen;