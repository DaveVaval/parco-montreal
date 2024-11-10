import { View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { FlashList } from '@shopify/flash-list'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons'
import { faker } from '@faker-js/faker';

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

export default function History() {
  // const date = faker.date.between({
  //   from: new Date,
  //   to: 
  // })
  return (
    <ThemedView className='flex-1'>
      <FlashList
        data={DATA}
        renderItem={({ item }) => (
          <View className='py-2 items-center'>
            <Card className='w-full max-w-md bg-[#2b2b2b]'>
              <CardHeader>
                <CardTitle>Place récente</CardTitle>
              </CardHeader>
              <CardContent className='flex-row'>
                <Image
                  source={require('@/assets/images/1159425.png')}
                  style={{
                    height: 50,
                    width: 50
                  }}
                />
                <ThemedText>Date: </ThemedText>
              </CardContent>
              <CardFooter className='justify-between items-center'>
                <ThemedText className='font-semibold'>PN697</ThemedText>
                <TouchableOpacity>
                  <Ionicons name='information-circle' color={'white'} size={25}/>
                </TouchableOpacity>
              </CardFooter>
            </Card>
          </View>
        )}
        estimatedItemSize={200}
      />
    </ThemedView>
  )
}