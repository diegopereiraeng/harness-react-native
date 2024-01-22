// File: /components/Header.tsx

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Harness</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // You might want to set your brand colors here
    backgroundColor: '#0292E3', // Assuming this is a Harness brand color
  },
  text: {
    color: '#FFFFFF', // Assuming you want white text for contrast
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Header;
