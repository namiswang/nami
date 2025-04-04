import { StyleSheet } from 'react-native'
import { JText } from '@/components/JText'
import ParallaxScrollView from '@/components/ParallaxScrollView'

export function Wallet() {
  return (
    <ParallaxScrollView>
      {Array.from({ length: 40 }).map((_, i) => (
        <JText key={i} marginBottom={50}>资产{i}</JText>
      ))}
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({})
