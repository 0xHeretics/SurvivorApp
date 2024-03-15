import React from 'react';
import {View, Text, SafeAreaView, Keyboard, Alert, KeyboardAvoidingView} from 'react-native';
import COLORS from '../color/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import BackgroundAnimation from '../constants/Background';
import { Card } from 'react-native-paper';
import ColorfulCard from "@freakycoder/react-native-colorful-card";

const LoginScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({email: '', password: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://masurao.fr/api/employees/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Group-Authorization': 'T3GaqarVQwo6e799gSNF7wY28tktBd02',
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        // Successful response
        // Do something with responseData.access_token
        const accessToken = responseData.access_token; // Assuming the access token key is 'access_token'
        AsyncStorage.setItem('accessToken', accessToken);
        navigation.navigate('HomeScreen');
        // Note: You need to define 'userData' or remove this line if not needed
        AsyncStorage.setItem('userData', JSON.stringify({ loggedIn: true }));
      } else if (response.status === 401) {
        // Unauthorized
        Alert.alert('Error', 'Invalid Email and Password combination.');
      } else {
        // Other error responses
        console.error('Error:', responseData.detail);
      }
    } catch (error) {
      console.error('API Request Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    <View>
      <BackgroundAnimation></BackgroundAnimation>
      <Loader visible={loading} />
      <ColorfulCard
        title="Info"
        value=""
        iconImageSource={require("../logos/profil.png")}
        style={{top: 80, left: 15,
            justifyContent: 'center',
            backgroundColor: "#fff",
            width: 330,
            height: 600,
          opacity: 0.5 }}
    />
      <View style={{position: 'absolute', top: 120, left: 30, right: 30 }}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Sign In
        </Text>
        <Text style={{color: COLORS.black, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
            />
          <Button title="Log In" onPress={validate} />
          <Text
            //onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Forgot Password ?
          </Text>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;