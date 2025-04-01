import ParallaxScrollView from '@/components/ParallaxScrollView'
import LedgerShownCard from '@/app/Bill/components/LedgerShownCard'
import TransactionChart from '@/app/Bill/components/TransactionChart'
import BillList from '@/app/Bill/components/BillList'

export default function Bill() {
  return (
    <ParallaxScrollView>
      <LedgerShownCard />
      <TransactionChart />
      <BillList />
    </ParallaxScrollView>
  )
}
