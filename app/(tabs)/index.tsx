import { StyleSheet } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { LedgerShownCard } from '@/components/LedgerShownCard'

export default function Bill() {
  return (
    <ParallaxScrollView>
      <LedgerShownCard />
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({})
