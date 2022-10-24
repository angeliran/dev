import react, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinsItem from './CoinsItem';
import Colors from 'cryptoTracker/src/resources/colors';
import CoinsSearch from './CoinsSearch';

const CoinsScreen = (props) => {
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const urlGet = "https://api.coinlore.net/api/tickers/";

  const getCrypto = async () => {

    setLoading(true);

    const res =  await Http.instance.get(urlGet);

    setCoins(res.data);
    setAllCoins(res.data);
    setLoading(false);
  };

  const handlePress = (coin) => {
    props.navigation.navigate("CoinDetail", { coin });
  };

  const handleSearch = (query) => {
    const coinsFiltered = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase());
    });

    setCoins(coinsFiltered);
  };

  useEffect(() => {
    getCrypto();
  }, []);

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      { loading ?
        <ActivityIndicator 
          style={styles.loader}
          color="red" 
          size="large"
        />
        : null
      }
      <FlatList
        data={coins}
        renderItem={( {item} ) => 
          <CoinsItem 
            item={item} 
            onPress={() => handlePress(item)} 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
  titleText: {
    color: "#fff",
    textAlign: "center"
  },
  btn: {
    padding: 8,
    backgroundColor: "blue",
    borderRadius: 8,
    margin: 16
  },
  btnText: {
    color: "#fff",
    textAlign: "center"
  },
  loader:{
    marginTop: 60
  }
});

export default CoinsScreen;