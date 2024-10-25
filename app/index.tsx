import { 
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  Pressable,
  Image
} from 'react-native'
import { useRef } from 'react'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LottieView from 'lottie-react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Link, useNavigation } from 'expo-router';

export default function index() {
  const animation = useRef<LottieView>(null);
  const navigation = useNavigation<any>();

  return (
    <Pressable className='flex-1' onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <View className='justify-around items-center w-full h-[90%]'>
          <Card className='w-full max-w-sm bg-[#2b2b2b]'>
            <CardHeader>
              <CardTitle>Place récente</CardTitle>
            </CardHeader>
            <CardContent className='items-center'>
              <Image
                source={require('@/assets/images/1159425.png')}
                style={{
                  height: 300,
                  width: 300
                }}
              />
            </CardContent>
            <CardFooter className='justify-between items-center'>
              <ThemedText className='font-semibold'>PN697</ThemedText>
              <TouchableOpacity>
                <Ionicons name='information-circle' color={'white'} size={25}/>
              </TouchableOpacity>
            </CardFooter>
          </Card>
          <Pressable>
          </Pressable>
            <Link href={'/history'}>
              <View className='flex-row bg-blue w-full items-center justify-between'>
                <ThemedText style={{fontSize: 12}}>Historique</ThemedText>
                <Ionicons name='chevron-forward-outline' color={'white'} size={15}/>
              </View>
            </Link>
          <Card className='w-[90%] bg-[#2b2b2b] py-6'>
            <View className='w-full'>
              <View className='flex-row w-full justify-center items-center mb-2'>
                <Input
                  className='w-[70%] mr-2 bg-[#4d4d4d] border border-zinc-600'
                  placeholder='Entrez le code'
                />
                <TouchableOpacity onPress={() => navigation.navigate('camera')}>
                  <View className='bg-blue h-14 w-14 ml-2 items-center justify-center rounded-lg'>
                    <FontAwesome6 name='camera' size={20} color="white"/>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className='w-full mt-2'>
                <View style={styles.button}>
                  <Text style={{color: 'white', fontWeight: 500}}>Rechercher</Text>
                  <View className='pl-4'>
                    <FontAwesome6 name="magnifying-glass" color="white"/>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ThemedView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 60,
    borderRadius: 20,
    marginHorizontal: 20,
    backgroundColor: '#47a3ff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})