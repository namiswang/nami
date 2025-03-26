import { Image, StyleSheet, Platform } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { JText } from '@/components/ui/JText'
import { JView } from '@/components/ui/JView'

export default function Bill() {
  return (
    <ParallaxScrollView>

    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stepContainer: {
    marginBottom: 8,
    gap: 8
  },
  reactLogo: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 290,
    height: 178
  }
})
