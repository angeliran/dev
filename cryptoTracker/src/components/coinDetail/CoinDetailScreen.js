import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Pressable, SectionList, FlatList, Alert } from 'react-native';
import Colors from 'cryptoTracker/src/resources/colors';
import Http from 'cryptoTracker/src/libs/http';
import Storage from 'cryptoTracker/src/libs/storage';

import CoinMarketItem from './CoinMarketItem';

const CoinDetailScreen = (props) => {
    const [markets, setMarkets] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [coin, setCoin] = useState(props.route.params.coin);
    const {navigation} = props;
    
    const imageUri = `https://c1.coinlore.com/img/16x16/${coin.nameid}.png`;

    const getSection = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data: [coin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data : [coin.volume24]
            },
            {
                title: "Change 24h",
                data: [coin.percent_change_24h]
            }
        ]
        return sections;
    };

    const getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const marketsRes = await Http.instance.get(url);

        setMarkets(marketsRes);
    };

    const toggleFavorite = () => {
        if(isFavorite){
            removeFavorite();
        }else{
            addFavorite();
        }
    };

    const addFavorite = async () => {
        const value = JSON.stringify(coin);
        const key = `favorite-${coin.id}`;

        const stored = await Storage.instance.store(key, value);

        if(stored){
            setIsFavorite(true)
        }
    };

    const removeFavorite = () => {
        Alert.alert("Remove favorite", "Are you sure?", [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                    const key = `favorite-${coin.id}`;

                    await Storage.instance.remove(key);
            
                    setIsFavorite(false);
                },
                style: "destructive"
            }
        ])
        
    };

    const getFavorite = async () => {
        try {
            const key = `favorite-${coin.id}`;
            const favStr = await Storage.instance.get(key);
            
            if(favStr != null){
                setIsFavorite(true);
            }
        } catch (error) {
            console.log("get favorites err", error);
        }
    };

    useEffect(() => {
        navigation.setOptions({title: coin.symbol});
        getMarkets(coin.id);
        getFavorite();
      }, [coin.symbol, navigation]);

    return(
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image
                        style={styles.imgIcon}
                        source={{uri: imageUri}}
                    />
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>
                <Pressable 
                    onPress={toggleFavorite}
                    style={[
                        styles.btnFavorite,
                        isFavorite ?
                        styles.btnRemove :
                        styles.btnAdd
                    ]}
                >
                    <Text style={styles.btnText}>
                        { isFavorite ? "Remove favorite" : "Add favorite" }
                    </Text>
                </Pressable>
            </View>
            <SectionList 
                style={styles.section}
                sections={getSection(coin)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => 
                <View style={styles.sectionItem}>
                    <Text style={styles.itemText}>{item}</Text>
                </View>
                }
                renderSectionHeader={({ section }) => 
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionText}>{section.title}</Text>
                </View>
                }
            />
            <Text style={styles.marketsTitle}>Markets</Text>
            <FlatList
            style={styles.list}
                horizontal={true}
                data={markets}
                renderItem={({ item }) => <CoinMarketItem item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    section: {
        maxHeight: 220
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16
    },
    row: {
        flexDirection: "row"
    },  
    subHeader: {
        backgroundColor: "rgba(0,0,0, 0.1)",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: "bold",
        marginLeft: 8
    },
    imgIcon: {
        width: 25,
        height: 25
    },
    sectionHeader: {
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: Colors.white,
        fontSize: 14
    },
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold"
    },
    marketsTitle: {
        color: Colors.white,
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 16,
        marginBottom: 16
    },
    btnText: {
        color: Colors.white
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnAdd: {
        backgroundColor: Colors.picton
    },
    btnRemove: {
        backgroundColor: Colors.carmine
    }
});
export default CoinDetailScreen;