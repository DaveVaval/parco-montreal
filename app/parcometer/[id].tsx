import {
  View, 
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import React, { useState, useRef } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import Datepicker from 'react-native-date-picker'
import LottieView from 'lottie-react-native'
import Animated from 'react-native-reanimated';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from 'expo-router'

export default function Parcometer() {
  const navigaion = useNavigation<any>();
  const animation = useRef<LottieView>(null);
  const [date, setDate] = useState(new Date('2024-28-03T9:00:00'));
  const [minimumDate, setMinimumDate] = useState<Date | undefined>(new Date('2024-28-03T9:00:00'));
  const [maximumDate, setMaximumDate] = useState<Date | undefined>(new Date('2024-28-03T14:00:00'));
  const [pay, setPay] = useState(false);

  const play = () => {
    setPay(true)
  }

  const finish = () => {
    console.log('finish')
    navigaion.pop(2)
  }

  return (
    <ThemedView className='flex-1 justify-center'>
      {pay ? (
        <Animated.View className='items-center' entering={FadeIn} exiting={FadeOut}>
          <LottieView
            ref={animation}
            source={require('@/assets/animations/payment-dark.json')}
            loop={false}
            autoPlay
            style={{
              height: 300,
              width: 300
            }}
            speed={1.5}
            onAnimationFinish={finish}
          />
        </Animated.View>
      ) : (
        <>
          <View className='flex-row w-full px-5'>
            <Image
              source={require('@/assets/images/1159425.png')}
              style={{
                height: 150,
                width: 150
              }}
            />
            <View className='flex-1 flex-row items-center justify-between'>
              <View>
                <ThemedText>Parking Fee:</ThemedText>
                <ThemedText>Convenience Fee:</ThemedText>
                <ThemedText type='bold' className='mt-2'>Total Fee:</ThemedText>
              </View>
              <View className=''>
                <ThemedText className='text-right'>$10.35</ThemedText>
                <ThemedText className='text-right'>$0.75</ThemedText>
                <ThemedText type='bold' className='text-right mt-2'>$11</ThemedText>
              </View>
            </View>
          </View>
          <View className='flex-row justify-center'>
            <ThemedText className='mr-2'>Échéance Maximum</ThemedText>
            <ThemedText className='ml-2'>{maximumDate?.toLocaleTimeString('ca')}</ThemedText>
          </View>
          <View className='flex-row items-center justify-around'>
            <View className=''>
              <ThemedText type='defaultSemiBold'>Heures</ThemedText>
            </View>
            <Datepicker
              style={{
                width: 100
              }}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              date={date} 
              onDateChange={setDate}
              mode='time'
              locale='ca'
              is24hourSource='locale'
            />
            <View className=''>
              <ThemedText type='defaultSemiBold'>Minutes</ThemedText>
            </View>
          </View>
          <View className='items-center'>
            <TouchableOpacity className='w-[80%] mt-2' onPress={play}>
              <View className='bg-[#47a3ff] h-16 items-center justify-center rounded-xl'>
                <Text style={{color: 'white', fontWeight: 500}}>Payer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ThemedView>
  )
}