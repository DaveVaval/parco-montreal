import '../global.css'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Drawer from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer
          screenOptions={{
            headerTintColor: colorScheme === 'dark' ? 'white' : 'blue'
          }}
        >
          <Drawer.Screen
            name='(tabs)'
            redirect
            options={{
              drawerItemStyle: {
                display: 'none'
              }
            }}
          />
          <Drawer.Screen
            name='+not-found'
            redirect
            options={{
              drawerItemStyle: {
                display: 'none'
              }
            }}
          />
          <Drawer.Screen
            name='index'
            options={{
              title: 'Payez une place',
              drawerIcon: () => (
                <MaterialIcons name='local-parking' size={20} color={colorScheme === 'dark' ? 'white' : 'blue'}/>
              ),
              headerRight: () => (
                <View style={{marginRight: 10}}>
                  <Ionicons name='settings-outline' size={25} color={colorScheme === 'dark' ? 'white' : 'blue'}/>
                </View>
              )
            }}
          />
        </Drawer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
