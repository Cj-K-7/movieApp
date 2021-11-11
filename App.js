import React, { useState } from 'react';
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Root from './navigations/Root';
import { ThemeProvider } from 'styled-components/native';
import { QueryClient, QueryClientProvider } from "react-query";
import { darkTheme, lightTheme } from './styled';

const queryClient = new QueryClient();

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
    await Promise.all([...font]);
  }
  const isDark = useColorScheme() === "dark";
  if(!loading) {
    return (
    <AppLoading 
    startAsync={startLoading} 
    onFinish={loadingFinish} 
    onError={console.error} />)
  }
  return (
    <QueryClientProvider client ={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
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
