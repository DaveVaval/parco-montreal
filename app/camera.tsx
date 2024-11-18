import { 
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState, useRef } from 'react'
import { useRunOnJS } from 'react-native-worklets-core';
import LottieView from 'lottie-react-native';
import { 
  Camera,
  useCameraPermission, 
  useCameraDevice,
  useFrameProcessor,
  runAtTargetFps,
} from 'react-native-vision-camera';
import { useTextRecognition } from 'react-native-vision-camera-text-recognition'
import { ThemedText } from '@/components/ThemedText';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { faker } from '@faker-js/faker';

export default function CameraScreen() {
  const colorScheme = useColorScheme();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [recText, setRecText] = useState<any>();
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef<BottomSheet>(null)

  const { scanText } = useTextRecognition({
    "language": 'latin'
  });

  const updateText = useRunOnJS((result) => {
    setRecText(result)
    setIndex(0)
  },[])

  if (!hasPermission) {
    console.log('ping')
    requestPermission()
  }
  
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    runAtTargetFps(0.7, () => {
      'worklet'
      const data: any = scanText(frame)
      if (data.resultText !== undefined && data.resultText.match(/\b[A-Z]{1,2}\n?\d{3}\b/)) {
        let text = data.resultText.match(/\b[A-Z]{1,2}\n?\d{3}\b/);
        updateText(text);
        console.log(text)
      }
    })
  },[]);

  const handleSheetChanges = useCallback((index: number) => {
    setIndex(index)
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        frameProcessor={frameProcessor}
        device={device!}
        isActive
      />
      <Animated.View entering={FadeIn} exiting={FadeOut} className='flex-1 items-center justify-end'>
        {index == -1 ? (
          <View className='mb-4'>
            <LottieView
              source={require('@/assets/animations/loading-scan.json')}
              autoPlay
              loop
              style={{
                height: 150,
                width: 150
              }}
            />
          </View>
        ) : (
          <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            index={index}
            enablePanDownToClose
            backgroundStyle={{
              backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff'
            }}
            handleIndicatorStyle={{
              backgroundColor: colorScheme === 'dark' ? '#fff' : '#000'
            }}
          >
            <BottomSheetView className='flex items-center p-6'>
              <Card className='w-full max-w-sm bg-[#2b2b2b]'>
                <CardHeader>
                  <CardTitle>{recText}</CardTitle>
                </CardHeader>
                <CardContent className='items-center'>
                  <Image
                    source={require('@/assets/images/1159425.png')}
                    style={{
                      height: 150,
                      width: 150
                    }}
                  />
                  <View className='mt-4'>
                    <ThemedText>Disponible entre 7:00am et 8:00pm</ThemedText>
                  </View>
                </CardContent>
                <CardFooter className='justify-between items-center'>
                  <Link href='/parcometer/1' asChild>
                    <TouchableOpacity className='w-full mt-2'>
                      <View className='bg-[#47a3ff] h-16 items-center justify-center rounded-xl'>
                        <Text style={{color: 'white', fontWeight: 500}}>Procéder</Text>
                      </View>
                    </TouchableOpacity>
                  </Link>
                </CardFooter>
              </Card>
            </BottomSheetView>
          </BottomSheet>
        )}
      </Animated.View>
    </>
  )
}