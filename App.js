import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from 'react-redux';
import { Image } from 'react-native';
import Gate from "./components/Gate";
import store from "./redux/store";

const cacheImages = images => 
  images.map(image => {
  
    if(typeof image ==="string"){
      return Image.prefetch(image);
    }
    else{
      return Asset.fromModule(image).downloadAsync(); 
    }
  });

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAssets = async () => {
    const images = [
      require("./assets/loginbg.jpeg"),
      "https://cdn.freebiesupply.com/logos/large/2x/airbnb-2-logo-png-transparent.png"
    ];
    const fonts = [Ionicons.font];
    const imagePromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts);
    return Promise.all([...fontPromises,...imagePromises])
  };
  return isReady ? (
    <Provider store = {store}>
      <Gate />
    </Provider>
     ) : (
    < AppLoading 
      onError={console.error} 
      onFinish={handleFinish} 
      startAsync={loadAssets}
  />
  );
}


