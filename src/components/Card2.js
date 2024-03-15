import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from './Button';

const BasicCard = ({ img, Title, text }) => {
    return (
        <View style={styles.mainCardView}>
          <View style={{ flexDirection: 'row',marginTop: 20, alignItems: 'top' }}>
            <View style={styles.subCardView}>
              <Image
                source={{url: img }} // Utilisez la source d'image passée en props
                resizeMode="contain"
                style={{
                  borderRadius: 0,
                  height: 200,
                  width: 200,
                }}
              />
            </View>
            <View style={{ marginTop: 0,marginLeft: 12 }}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#000',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>
                {Title}
              </Text>
              <Text style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: 'bold',
                  marginTop: 100,
                }}>
                {text}
              </Text>
              <Button title={"Lorem Ipsum"} style={{top: 50}}></Button>
            </View>
          </View>
        </View>
    );
  };

const styles = StyleSheet.create({
  mainCardView: {
    height: 300,
    width: 300,
    alignItems: 'left',
    justifyContent: 'left',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#807d7d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#807d7d',
    borderColor: '#807d7d',
    borderWidth: 1,
    borderStyle: 'solid',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

export default BasicCard;