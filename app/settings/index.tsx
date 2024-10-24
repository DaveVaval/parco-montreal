import { 
  View, 
  FlatList,
  TouchableOpacity 
} from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

type option = {
	title: string,
	icon: any,
	route?: string 
}
type SettingOptions = {
	categoryTitle: string,
	options: option[]
}

const DATA: SettingOptions[] = [
	{
		categoryTitle: 'Account',
		options: [
			{
				title: 'Account',
				icon: 'person',
				route: 'account'
			},
      {
				title: 'Preferences',
				icon: 'options',
				route: 'notifications'
			},
      {
				title: 'Payment Info',
				icon: 'card',
				route: 'notifications'
			},
		]
	},
	{
		categoryTitle: 'Support',
		options: [
      {
				title: 'Aide',
				icon: 'information-circle',
				route: 'bug'
			},
			{
				title: 'Report a bug',
				icon: 'bug',
				route: 'bug'
			},
      {
				title: 'FAQ',
				icon: 'help-circle',
				route: 'bug'
			},
			{
				title: 'Terms and Policies',
				icon: 'alert-circle',
				route: 'terms'
			}
		]
	},
]

export default function Settings() {
  return (
    <ThemedView className='flex-1 px-3'>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <View className='justify-center my-4'>
            <ThemedText className='font-medium mb-3' darkColor='#4f4f4f'>
              {item.categoryTitle}
            </ThemedText>
            <View className='w-full rounded-xl px-4 py-3 bg-[#2b2b2b]'>
              {item.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                >
                  <View className={`flex-row items-center justify-between ${item.options.length > 1 ? 'h-14' : 'h-12'}`}>
                    <View className='flex-row items-center'>
                      <Ionicons name={option.icon} size={20} color={'#cfcfcf'}/>
                      <ThemedText className='ml-4 text-base font-medium'>{option.title}</ThemedText>
                    </View>
                    <Ionicons name='chevron-forward' size={20} color={'#cfcfcf'}/>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
      <TouchableOpacity>
        <View className='flex-row bg-[#2b2b2b] h-20 justify-center items-center mb-5 rounded-xl'>
          <Ionicons name='exit-outline' size={20} color={'white'} className='pr-2'/>
          <ThemedText className='font-medium'>Log Out</ThemedText>
        </View>
      </TouchableOpacity>
    </ThemedView>
  )
}