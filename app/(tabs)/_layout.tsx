import { Tabs, Link } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerRight: () => (
          <Link href='/settings' asChild>
            <Pressable>
              <Ionicons name='settings-outline' color={'white'} size={25} className='mr-2'/>
            </Pressable>
          </Link>
        ),
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ParcoPay',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name='local-parking' size={28} color={color} style={[{ marginBottom: -3 }]}/>
          ),
          headerLeft: () => (
            <MaterialIcons name='local-parking' size={28} color={colorScheme === 'dark' ? 'white' : 'blue'} className='pl-6'/>
          )
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
