import { View, Text, Permission, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { 
  Camera, 
  useCameraPermission, 
  useCameraDevice,
  useFrameProcessor,
  useSkiaFrameProcessor
} from 'react-native-vision-camera';
import { useTextRecognition } from 'react-native-vision-camera-text-recognition' 

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [data, setData] = useState<any>();

  const { scanText } = useTextRecognition();

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const data = scanText(frame)
    console.log(JSON.stringify(data[0].resultText, null, 2));
  }, []);

  const skiaFrameProcessor = useSkiaFrameProcessor((frame) => {
    'worklet'
    frame.render();
  },[])

  if (!hasPermission) {
    console.log('ping')
    requestPermission()
  }

  const logText = (data: any) => {
    // console.log(data)
  }

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      frameProcessor={frameProcessor}
      device={device!}
      isActive
    />
  )
}