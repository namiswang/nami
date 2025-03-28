import { StyleSheet } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { LedgerShownCard } from '@/components/LedgerShownCard'
import { TransactionChart } from '@/components/TransactionChart'
import { BillList } from '@/components/BillList'

export default function Bill() {
  return (
    <ParallaxScrollView>
      <LedgerShownCard />
      <TransactionChart />
      <BillList />
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({})
