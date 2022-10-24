import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Here are some boxes of different colors
        </Text>
        <View>
          <View style={[styles.cyan, styles.box]}>
            <Text style={styles.text}>Cyan: #2aa198</Text>
          </View>
          <View style={[styles.blue, styles.box]}>
            <Text style={styles.text}>Blue: #268bd2</Text>
          </View>
          <View style={[styles.magenta, styles.box]}>
            <Text style={styles.text}>Magenta: #d33682</Text>
          </View>
          <View style={[styles.orange, styles.box]}>
            <Text style={styles.text}>Orange: #cb4b16</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    alignItems: 'center',
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  text: {
    flexDirection: 'row',
  },
  cyan: {
    backgroundColor: '#2aa198',
  },
  blue: {
    backgroundColor: '#268bd2',
  },
  magenta: {
    backgroundColor: '#d33682',
  },
  orange: {
    backgroundColor: '#cb4b16',
  },
  box: {
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});
export default App;
