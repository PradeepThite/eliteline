import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToStorage = (key, value) => {
  value = typeof value === 'object' ? JSON.stringify(value) : value;
  AsyncStorage.setItem(key, value);
};

export const getFromStorage = async key => {
  return await AsyncStorage.getItem(key);
};
