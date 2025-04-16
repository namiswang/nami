import LedgerStack, { LedgerStackParamList } from './Ledger'
import CategoryStack, { CategoryStackParamList } from './Category'
import { StackNavigationProp } from '@react-navigation/stack'

export type StackParamList = LedgerStackParamList & CategoryStackParamList
export type NavigationProp = StackNavigationProp<StackParamList>

export const routes = {
  Ledger: {
    name: 'Ledger',
    component: LedgerStack,
    options: {
      animation: 'slide_from_right'
    }
  },
  Category: {
    name: 'Category',
    component: CategoryStack,
    options: {
      animation: 'slide_from_right'
    }
  }
} as const
