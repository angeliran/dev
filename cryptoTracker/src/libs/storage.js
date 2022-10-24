import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
    static instance = new Storage();

    store = async (key, value) => {

        try {

            await AsyncStorage.setItem(key, value);

            return true;

        } catch (error) {

            console.log("storage store error", error);

            return false;

        }

    };

    get = async (key) => {
        try {

            return await AsyncStorage.getItem(key);

        } catch (error) {

            console.log("storage get error", error);

            throw Error(error);
        }
    };

    multiGet = async (key) => {
        try {

            return await AsyncStorage.multiGet(key);

        } catch (error) {
            
            console.log("storage multiget error", error);

            throw Error(error);
        }
    };

    getAllKeys = async () => {
        try {

            return await AsyncStorage.getAllKeys();

        } catch (error) {

            console.log("storage error getAllKeys",  error);

            throw Error(error);
        }
    };

    remove = async (key) => {
        try {

            await AsyncStorage.removeItem(key);
            
            return true;

        } catch (error) {

            console.log("storage remove error", error);

            return false;
        }
    };
}

export default Storage;