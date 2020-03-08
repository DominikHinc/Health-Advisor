import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import Navigator from './navigation/Navigator';
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
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

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

