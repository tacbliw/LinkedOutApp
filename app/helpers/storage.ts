import AsyncStorage from "@react-native-community/async-storage";

// create function for saving items to storage
export const SaveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('saved');
  } catch (e) {
    console.log(e);
  }
};

// create function for saving items to storage
export const ReadItem = async key => {
  try {
    var result = await AsyncStorage.getItem(key);
    return result;
  } catch (e) {
    return e;
  }
};