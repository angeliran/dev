import React from 'react';
import { View } from 'react-native';

const ColorSquare = ({ hexCode }) => {
  const styles = {
    backgroundColor: hexCode,
  };
  return <View style={styles}></View>;
};

export default ColorSquare;
