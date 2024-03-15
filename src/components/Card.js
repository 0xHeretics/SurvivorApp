import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserCard = ({ img, name, surname, email }) => {
  return (
      <View style={styles.mainCardView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.subCardView}>
            <Image
              source={{ uri: img }} // Utilisez la source d'image passée en props
              resizeMode="contain"
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
              }}
            />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
                {name} {surname}
                
            </Text>
            <Text
            style={{
              fontSize: 14,
              color: '#000',
              textTransform: 'capitalize',
            }}>
            {email}
            </Text>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  mainCardView: {
    height: 90,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserCard;