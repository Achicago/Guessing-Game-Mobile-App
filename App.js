import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useFonts } from 'expo-font';
import * as Font from "expo-font";
// import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

export default function App() {

  // const fetchFonts = async () => {
  //   const tt = await Font.loadAsync({
  //     'open-san': require('./assets/fonts/OpenSans-Bold.ttf'),
  //     'open-sans-bold': require('./assets/fonts/OpenSans-Regular.ttf'),
  //   });
  //   return tt;
  // }
  // console.log(fetchFonts);

  // const [fontsLoaded] = useFonts({
  //   'open-san': require('./assets/fonts/OpenSans-Bold.ttf'),
  //   'open-sans-bold': require('./assets/fonts/OpenSans-Regular.ttf'),
  // });

  // // const onLayoutRootView = useCallback(() => {
  // if (fontsLoaded) {
  //   SplashScreen.hideAsync();
  // }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }


  // const [fontsLoaded] = useFonts({
  //   'open-sans': require('./assets/fonts/OpenSans-Bold.ttf'),
  //   'open-sans-bold': require('./assets/fonts/OpenSans-Regular.ttf'),
  // })

  // const onLayoutRootView = useCallback(async () => {
  //   if (!fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (fontsLoaded) {
  //   return null;
  // }
  // if (!fontsLoaded) {
  //   await SplashScreen.hideAsync();
  // }

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  function gameOverHandler() {
    setGameIsOver(true);
  }

  if (userNumber) {
    screen = <GameScreen onGameOver={gameOverHandler} userNumber={userNumber} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />
  }

  return (
    <>
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>

  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
