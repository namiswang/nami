import { StyleSheet } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { LedgerShownCard } from '@/components/LedgerShownCard'
import { TransactionChart } from '@/components/TransactionChart'

export default function Bill() {
  return (
    <ParallaxScrollView>
      <LedgerShownCard />
      <TransactionChart />
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({})
