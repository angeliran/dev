/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CoinsStack from 'cryptoTracker/src/components/coins/CoinStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from 'cryptoTracker/src/resources/colors';
import FavoritesStack from 'cryptoTracker/src/components/favorites/FavoritesStack';
import { color } from 'react-native-reanimated';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{ 
          headerShown: false,
          tabBarActiveTintColor: Colors.nav,
          tabBarActiveBackgroundColor: Colors.blackPearl,
          tabBarInactiveTintColor: Colors.white,
          tabBarInactiveBackgroundColor: Colors.blackPearl
        }}
      >
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={ require('cryptoTracker/src/assets/bank.png') }
              />
            )
          }}
        />
        <Tabs.Screen 
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={ require('cryptoTracker/src/assets/star.png') }
              />
            )
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
