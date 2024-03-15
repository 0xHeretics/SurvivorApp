import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {Text, View, FlatList } from 'react-native';
import Button from '../components/Button';
import UserCard from '../components/Card';

const Trombi = ({navigation}) => {
    var count = 1;
    const [data, setData] = useState([]);
    var max = 0;
    const changePage = async () => {
        var DATA = [];
        max = await AsyncStorage.getItem("MAX");
        count = await AsyncStorage.getItem("COUNT");
        const accessToken = await AsyncStorage.getItem("accessToken");
        var diff = 5;
        if (count <= 0) {
            diff = max % 5;
            count = max - diff + 1;
        }
        else if (count == max) {
            count = 1;
        }
        else if (count + 5 > max) {
            diff = max % 5;
        }
        for (var i = 0; i < diff && count <= max; i++, count++) {
            var user = [];
            const name = await AsyncStorage.getItem(String(count) + " name");
            const surname = await AsyncStorage.getItem(String(count) + " surname");
            const email = await AsyncStorage.getItem(String(count) + " email");
            user.push(String(count));
            user.push(name);
            user.push(surname);
            user.push(email);
            try {
                const tmp = await AsyncStorage.getItem(String(count) + " img");
            } catch (err) {
                const img = await fetch('https://masurao.fr/api/employees/' + String(count) + '/image', {
                    method: 'GET',
                    headers: {
                    Accept: 'image/png',
                    'X-Group-Authorization': 'T3GaqarVQwo6e799gSNF7wY28tktBd02',
                    Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (img.ok) {
                    const blob = await img.blob();
                    const reader = new FileReader();
                    reader.onload = () => {
                        AsyncStorage.setItem(String(count) + " img", reader.result);
                    };
                    reader.readAsDataURL(blob);
                } else if (img.status === 404) {
                    console.log('Employee not found');
                } else {
                    console.log('API Request Error:', img.status);
                }
            }
            DATA.push(user);
        }
        if (count >= max) {
            count = max;
        }
        AsyncStorage.setItem("COUNT", String(count));
        setData(DATA);
    }
    const nextPage = async () => {
        count = await AsyncStorage.getItem("COUNT");
        max = await AsyncStorage.getItem("MAX");
        if (count === max) {
            count = 1
        }
        AsyncStorage.setItem("COUNT", String(count));
        changePage();
    }
    const previousPage = async () => {
        count = await AsyncStorage.getItem("COUNT");
        max = await AsyncStorage.getItem("MAX");
        if (count === max) {
            count -=5;
            count -= max % 5;
            count++;
        } else {
            count -= 10;
        }
        AsyncStorage.setItem("COUNT", String(count));
        changePage();
    }
    async function getEmployees () {
        var GDATA = [];
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch('https://masurao.fr/api/employees', {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Group-Authorization': 'T3GaqarVQwo6e799gSNF7wY28tktBd02',
            Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            for (key of data) {
                /*try {
                    await AsyncStorage.getItem(String(max) + " name");
                    await AsyncStorage.getItem(String(max) + " surname");
                    await AsyncStorage.getItem(String(max) + " email");
                } catch (e) {
                    
                }*/
                max++;
                AsyncStorage.setItem(String(max) + " name", key.name);
                AsyncStorage.setItem(String(max) + " surname", key.surname);
                AsyncStorage.setItem(String(max) + " email", key.email);
            }
            AsyncStorage.setItem("MAX", String(max));
            for (; count < 6 && count < max; count++) {
                var user = [];
                const name = await AsyncStorage.getItem(String(count) + " name");
                const surname = await AsyncStorage.getItem(String(count) + " surname");
                const email = await AsyncStorage.getItem(String(count) + " email");
                user.push(String(count));
                user.push(name);
                user.push(surname);
                user.push(email);
                /*try {
                    const tmp = await AsyncStorage.getItem(String(count) + " img");
                } catch (err) {*/
                    const img = await fetch('https://masurao.fr/api/employees/' + String(count) + '/image', {
                        method: 'GET',
                        headers: {
                        Accept: 'image/png',
                        'X-Group-Authorization': 'T3GaqarVQwo6e799gSNF7wY28tktBd02',
                        Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (img.ok) {
                        const blob = await img.blob();
                        const reader = new FileReader();
                        reader.onload = () => {
                            AsyncStorage.setItem(String(count) + " img", reader.result);
                        };
                        reader.readAsDataURL(blob);
                    } else if (img.status === 404) {
                        console.log('Employee not found');
                    } else {
                        console.log('API Request Error:', img.status);
                    }
                //}
                GDATA.push(user);
            }
            AsyncStorage.setItem("COUNT", String(count));
            setData(GDATA);
        } else {
            console.log(response.status);
            return(<View>
                <Text style={{top: 50}}>No datas</Text>
            </View>)
        }
    }
    const getPhoto = async (id) => {
        const item = await AsyncStorage.getItem(String(id) + " img");
        if (item != null) {
            return(String(item));
        }
    }
    useEffect(() => {
        getEmployees();
    }, []);
    return (<View><Text style={{top:60, left:110, fontSize: 20,fontWeight: 'bold'}}>Trombinoscope</Text>
        <FlatList style={{top:100, left: 15}}
            data={data}
            renderItem={({ item }) => (
                <View>
                    <UserCard name={item[1]} surname={item[2]} email={item[3]}/>
                </View>
            )}
            keyExtractor={(item) => item[0]}
        />
        <View style={{flexDirection: 'row'}}>
            <View style={{left:20, bottom:-120, width:70}}><Button title="Back" onPress={previousPage}/></View>
            <View style={{position: "absolute",right:20, bottom:-120, width:70}}><Button title="Next" onPress={nextPage}/></View>
        </View>
    </View>);
}

export default Trombi
