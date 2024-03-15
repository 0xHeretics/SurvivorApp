import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {Text, View, Image, Linking, ScrollView} from 'react-native';
import ColorfulCard from "@freakycoder/react-native-colorful-card";
import COLORS from '../color/colors';
import {Button, Drawer , Appbar} from 'react-native-paper';

const Widgets = ({navigation}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const viewTrombi = () => {
        navigation.navigate('Trombi');
    };
    const openSpotify = () => {
        Linking.openURL('spotify://').catch((err) => {
            Linking.openURL('market://details?id=com.spotify.music');
        });
    };
    const openDeezer = () => {
        Linking.openURL('deezer://').catch((err) => {
            Linking.openURL('market://details?id=deezer.android.app');
        });
    };
    const updateMeteo = async () => {
        
    };
    const openTeams = () => {
        Linking.openURL('msteams://').catch((err) => {
            Linking.openURL('market://details?id=com.microsoft.teams');
        });
    };
    const openX = () => {
        Linking.openURL('https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://twitter.com/%3Flang%3Dfr&ved=2ahUKEwiHmIyci5aBAxWufKQEHctSARgQjjh6BAgNEAE&usg=AOvVaw1FOcBmphgVAnEWKC7eSXn_').catch((err) => {
            Linking.openURL('market://details?id=com.twitter.android');
        });
    };
    const openLinkedIn = () => {
        Linking.openURL('https://www.linkedinmobileapp.com/login/fr?trk=homepage-basic_guest_apptivation').catch((err) => {
            Linking.openURL('market://details?id=com.linkedin.android');
        });
    };
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
      };
    
    const closeDrawer = () => {
        setIsDrawerOpen(false);
      };

    return(
    <ScrollView>
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
              closeDrawer();
              logout();
            }}
          />
      </Drawer.Section>
        <Text style={{top: 50, left:140, color: COLORS.black, fontSize: 35, fontWeight: 'bold'}}>
          Apps
        </Text>
    <ColorfulCard
        title="Info"
        value="Trombinoscope"
        iconImageSource={require("../logos/profil.png")}
        style={{top: 80, left: 10,
            justifyContent: 'center',
            backgroundColor: "#2BD1D1", }}
        onPress={viewTrombi}
    /><ColorfulCard
    title="Music"
    value="Spotify"
    iconImageSource={require("../logos/Spotify-Logo.png")}
    style={{top: -93, left: 190,
        justifyContent: 'center',
        backgroundColor: "#2AAB57", }}
    onPress={openSpotify}
/><ColorfulCard
        title="Music"
        value="Deezer"
        iconImageSource={require("../logos/deezer-logo-circle.png")}
        style={{top: -80, left: 10,
            justifyContent: 'center',
            backgroundColor: "#8049A9", }}
        onPress={openDeezer}
    /><ColorfulCard
    title="Info"
    value="Weather"
    iconImageSource={require("../logos/weather.png")}
    style={{top: -253, left: 190,
        justifyContent: 'center',
        backgroundColor: "#2AAB57", }}
    onPress={updateMeteo}
/><ColorfulCard
        title="Social Network"
        value="Teams"
        iconImageSource={require("../logos/microsoft-teams-logo.png")}
        style={{top: -240, left: 10,
            justifyContent: 'center',
            backgroundColor: "#2D4AAE", }}
        onPress={openTeams}
    /><ColorfulCard
    title="Social Network"
    value="X"
    iconImageSource={require("../logos/twitter-x-logo.png")}
    style={{top: -412, left: 190,
        justifyContent: 'center',
        backgroundColor: "grey", }}
    onPress={openX}
/><ColorfulCard
        title="Social Network"
        value="LinkedIn"
        iconImageSource={require("../logos/linkedin.png")}
        style={{top: -400, left: 10,
            justifyContent: 'center',
            backgroundColor: "blue", }}
        onPress={openLinkedIn}
    /></ScrollView>)
}

export default Widgets