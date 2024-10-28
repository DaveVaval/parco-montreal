import { 
  View,
  StyleSheet,
  TouchableOpacity,
  Text
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
// import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [recText, setRecText] = useState<any>();
  const bottomSheetRef = useRef<BottomSheet>(null)

  const { scanText } = useTextRecognition({
    "language": 'latin'
  });

  const updateText = useRunOnJS((result) => {
    setRecText(result)
  },[])

  if (!hasPermission) {
    console.log('ping')
    requestPermission()
  }
  
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    runAtTargetFps(0.5, () => {
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
      <View className='flex-1 items-center justify-end'>
        {/* <LottieView
          source={require('@/assets/animations/scan.json')}
          autoPlay
          loop
          style={{
            height: 300,
            width: 300
          }}
        /> */}
        {/* <Card className='w-full max-w-sm bg-[#2b2b2b]'>
          <CardHeader>
            <CardTitle>Place récente</CardTitle>
          </CardHeader>
          <CardContent className='items-center'>
            <ThemedText>{recText}</ThemedText>
          </CardContent>
          <CardFooter className='justify-between items-center'>
            <ThemedText className='font-semibold'>PN697</ThemedText>
            <TouchableOpacity>
              <Ionicons name='information-circle' color={'white'} size={25}/>
            </TouchableOpacity>
          </CardFooter>
        </Card> */}
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          index={-1}
        >
          <BottomSheetView style={{flex: 1, padding: 36, alignItems: 'center'}}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </>
  )
}