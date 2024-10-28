import { View, Text, Permission, StyleSheet } from 'react-native'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useRunOnJS } from 'react-native-worklets-core';
import { 
  Camera,
  useCameraPermission, 
  useCameraDevice,
  useFrameProcessor,
  useSkiaFrameProcessor,
  runAtTargetFps,
} from 'react-native-vision-camera';
import { 
  useTextRecognition, 
  // Camera
} from 'react-native-vision-camera-text-recognition'
import { Skia, Canvas, Rect } from '@shopify/react-native-skia';

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [frameData, setFrameData] = useState<any>();
  const [recText, setRecText] = useState<any>();

  const { scanText } = useTextRecognition({
    "language": 'latin'
  });

  const updateText = useRunOnJS((result) => {
    setRecText(result)
  },[])
  
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

  // const skiaFrameProcessor = useSkiaFrameProcessor((frame) => {
  //   'worklet'
  //   frame.render();
  //   runAtTargetFps(1, () => {
  //     const data: any = scanText(frame);
  //     if (data.resultText !== undefined) {
  //       'worklet'
  //       setFrameData(data.blocks[0].blockFrame)
  //       console.log(data.blocks[0].blockFrame);
  //     }
  //   })
  //   // const centerX = frame.width / 3
  //   // const centerY = frame.height / 3
  //   // const rect = Skia.XYWHRect(centerX, centerY, 150, 150)
  //   // const rouned = Skia.RRectXY(rect, 10, 10)
  //   // const paint = Skia.Paint()
  //   // paint.setColor(Skia.Color('red'))
  //   // frame.drawRRect(rouned, paint);
  // },[])

  if (!hasPermission) {
    console.log('ping')
    requestPermission()
  }

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        frameProcessor={frameProcessor}
        // options={{
        //   language: 'latin'
        // }}
        device={device!}
        isActive
        // mode='recognize'
        // callback={logText}
      />
      <View style={{flex: 1}}>
        <View className='bg-red-500 justify-center items-center'>
          <Text className='font-bold'>{recText}</Text>
        </View>
      </View>
      {/* {frameData && (
        <Canvas style={{flex: 1}}>
          <Rect x={frameData?.x} y={frameData?.y} height={frameData?.height} width={frameData?.width} color={'red'}/>
        </Canvas>
      )} */}
    </>
  )
}