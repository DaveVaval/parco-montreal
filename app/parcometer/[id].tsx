import {
  View, 
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import Datepicker from 'react-native-date-picker'

export default function Parcometer() {
  const [date, setDate] = useState(new Date('2024-28-03T9:00:00'));
  const [minimumDate, setMinimumDate] = useState<Date | undefined>(new Date('2024-28-03T9:00:00'));
  const [maximumDate, setMaximumDate] = useState<Date | undefined>(new Date('2024-28-03T14:00:00'));

  return (
    <ThemedView className='flex-1 justify-center'>
      <View className='flex-row w-full bg-orange-400 px-5'>
        <Image
          source={require('@/assets/images/1159425.png')}
          style={{
            height: 150,
            width: 150
          }}
        />
        <View className='flex-1 flex-row items-center justify-between bg-blue'>
          <View>
            <ThemedText>Parking Fee:</ThemedText>
            <ThemedText>Convenience Fee:</ThemedText>
            <ThemedText type='bold' className='mt-2'>Total Fee:</ThemedText>
          </View>
          <View className='bg-black'>
            <ThemedText className='text-right'>$10.35</ThemedText>
            <ThemedText className='text-right'>$0.75</ThemedText>
            <ThemedText type='bold' className='text-right mt-2'>$11</ThemedText>
          </View>
        </View>
      </View>
      <ThemedText>Durée maximum</ThemedText>
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
          // minuteInterval={5}
        />
        <View className=''>
          {/* <ThemedText>{date.toString()}</ThemedText> */}
          <ThemedText type='defaultSemiBold'>Minutes</ThemedText>
        </View>
      </View>
      <TouchableOpacity className='w-[80%] mt-2'>
        <View className='bg-[#47a3ff] h-16 items-center justify-center rounded-xl'>
          <Text style={{color: 'white', fontWeight: 500}}>Payer</Text>
        </View>
      </TouchableOpacity>
    </ThemedView>
  )
}