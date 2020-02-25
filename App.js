import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { APIKEY } from './constants/APIKEY';
import Navigator from './navigation/Navigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { cardReducer } from './store/reducres';
const combinedReducers = combineReducers({
  cards: cardReducer
})

const store = createStore(combinedReducers)

const fetchFonts = () => {
  return Font.loadAsync({
    'impact': require('./assets/Fonts/impact.ttf'),
    'arial': require('./assets/Fonts/arial.ttf'),
    'calibril-light': require('./assets/Fonts/calibril.ttf')
  })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  // const fetchApi = async () => {
  //   const response = await fetch(`https://getguidelines.com/all?age=68&sex=f&cac=5conditions=dm&api_token=${APIKEY}`);
  //   const readableResponse = await response.json();
  //   console.log(readableResponse)
  // }


  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts}
      onFinish={() => {
        setFontsLoaded(true)
      }} />
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
