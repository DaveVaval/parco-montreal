import '../global.css'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShadowVisible: false
          }}
        >
          <Stack.Screen 
            name='index'
            options={{
              title: 'ParcoPay',
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
            }}
          />
          <Stack.Screen
            name='history'
            options={{
              title: 'Historique',
            }}
          />
          <Stack.Screen
            name='camera'
            options={{
              title: 'Camera',
              // headerShown: false
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
