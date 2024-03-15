import React from 'react';
import { View, Text, Button } from 'react-native';

const DrawerMenu = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer Content</Text>
      <Button title="Close Drawer" onPress={() => navigation.closeDrawer()} />
    </View>
  );
};

export default DrawerMenu;