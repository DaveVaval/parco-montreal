import { View, Text, Permission, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { 
  Camera, 
  useCameraPermission, 
  useCameraDevice,
  useFrameProcessor,
  useSkiaFrameProcessor,
  runAtTargetFps
} from 'react-native-vision-camera';
import { useTextRecognition } from 'react-native-vision-camera-text-recognition' 
import { Skia } from '@shopify/react-native-skia';

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [data, setData] = useState<any>();

  const { scanText } = useTextRecognition();

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    runAtTargetFps(1, () => {
      const data = scanText(frame);
      console.log(JSON.stringify(data, null, 2));
    })
  }, []);

  const skiaFrameProcessor = useSkiaFrameProcessor((frame) => {
    'worklet'
    // const data: any = scanText(frame)
    frame.render();
    // for (const text of data) {
    //   const paint = Skia.Paint()
    //   paint.setColor(Skia.Color('red'))
    //   frame.drawRect(text.rect, paint)
    // }
    const centerX = frame.width / 2
    const centerY = frame.height / 2
    const rect = Skia.XYWHRect(centerX, centerY, 150, 150)
    const rouned = Skia.RRectXY(rect, 10, 10)
    const paint = Skia.Paint()
    paint.setColor(Skia.Color('red'))
    frame.drawRRect(rouned, paint);
    // frame.drawRect(rouned, paint)
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
      frameProcessor={skiaFrameProcessor}
      device={device!}
      isActive
    />
  )
}