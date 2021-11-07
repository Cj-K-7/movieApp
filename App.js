import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const loadFont = (fonts) => fonts.map((font)=> Font.loadAsync(font));
const loadAsset = (assets) => assets.map((asset)=>{
  if(typeof asset === 'string'){
    return Image.prefetch(asset);
  } else {
    return Asset.loadAsync(asset);
  }
}) 

export default function App() {
  const [ loading, setLoading ] = useState(false);
  const loadingFinish = () => setLoading(true);
  const startLoading = async() => {
    const font = loadFont([Ionicons.font])
    console.log(font);
    await Promise.all([...font]);
  }

  if(!loading) {
    return (
    <AppLoading 
    startAsync={startLoading} 
    onFinish={loadingFinish} 
    onError={console.error} />)
  }
  return (
    
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
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
