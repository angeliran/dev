import React, {useEffect, useState, useCallback} from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from 'cryptoTracker/src/components/coins/CoinsItem';
import Colors from 'cryptoTracker/src/resources/colors';
import Storage from 'cryptoTracker/src/libs/storage';

const FavoritesScreen = ( {navigation} ) => {

    const [favorites, setFavorites] = useState([]);

    const getFavorites = async () => {
        try {

            const allKeys = await Storage.instance.getAllKeys();
            const keys = allKeys.filter( key => key.includes('favorite-') );
            const favs = await Storage.instance.multiGet(keys);
            const favorites = favs.map( fav => JSON.parse(fav[1]));
            setFavorites(favorites);

        } catch (error) {

            console.log("get favorites error", error);

        }
    };

    const handlePress = (coin) => {
        navigation.navigate("CoinDetail", { coin });
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        getFavorites();
        });
        return unsubscribe;
    }, [navigation]);

    return(
        <View style={styles.container}>
            {
                favorites.length == 0 ?
                <FavoritesEmptyState />
                : null
            }
            {
                favorites.length > 0 ?
                <FlatList 
                    data={favorites}
                    renderItem={ ({item}) => 
                        <CoinsItem 
                            item={item} 
                            onPress={() => handlePress(item)}
                        />}
                />
                : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    }
})
export default FavoritesScreen;