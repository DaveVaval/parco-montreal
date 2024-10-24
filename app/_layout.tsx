import '../global.css'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name='index'
          options={{
            title: 'ParcoPay',
            headerShadowVisible: false,
            headerLeft: () => (
              <MaterialIcons name='local-parking' size={28} color={colorScheme === 'dark' ? 'white' : 'blue'} className=''/>
            ),
            headerRight: () => (
              <Link href='/settings' asChild>
                <Pressable>
                  <Ionicons name='settings-outline' color={'white'} size={25} className=''/>
                </Pressable>
              </Link>
            ),
          }} 
        />
        <Stack.Screen
          name='settings/index'
          options={{
            title: 'Settings',
            headerShadowVisible: false
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
