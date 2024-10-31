import { View, Text } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { FlashList } from '@shopify/flash-list'

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

export default function History() {
  return (
    <ThemedView className='flex-1'>
      <FlashList
        data={DATA}
        renderItem={({ item }) => (
          <View>
            <ThemedText>{item.title}</ThemedText>
          </View>
        )}
        estimatedItemSize={200}
      />
    </ThemedView>
  )
}