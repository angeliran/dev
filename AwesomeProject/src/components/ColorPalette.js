import React from 'react';
import { Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ColorBox from './ColorBox';

const ColorPalette = () => {
  return (
    <FlatList
      style={styles.container}
      keyExtractor={item => item.colorName}
      data={COLORS}
      renderItem={({ item }) => (
        <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
    color: 'black',
  },
});
export default ColorPalette;
