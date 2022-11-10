import React from 'react';
import { Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }) => {
  const { colors, paletteName } = route.params;

  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        keyExtractor={item => item.colorName}
        data={colors}
        renderItem={({ item }) => (
          <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
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
