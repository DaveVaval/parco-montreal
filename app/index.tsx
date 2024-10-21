import { 
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import { useRef, useEffect } from 'react'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LottieView from 'lottie-react-native';
import { FontAwesome6 } from '@expo/vector-icons';

export default function index() {
  const animation = useRef<LottieView>(null);

  return (
    <ThemedView style={styles.container}>
      {/* <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200
        }}
        source={require('@/assets/animations/parking-animation.json')}
      /> */}
      {/* <ThemedText>home</ThemedText> */}
      <View style={{backgroundColor: 'white'}}>
        <FontAwesome6 name='square-parking' size={100} color="#47a3ff"/>
      </View>
      <TouchableOpacity style={{width: '100%'}}>
        <View style={styles.button}>
          <Text style={{color: 'white', fontWeight: 500}}>Rechercher</Text>
        </View>
      </TouchableOpacity>
    </ThemedView>
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
    alignItems: 'center'
  }
})