import { createStackNavigator } from '@react-navigation/stack'
import LedgerHeader from '../Ledger/components/LedgerHeader'
import Ledger from '@/app/Ledger'

export type LedgerStackParamList = {
  Ledger: undefined
}

const Stack = createStackNavigator<LedgerStackParamList>()

export default function LedgerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'card',
        gestureEnabled: true,
        gestureDirection: 'horizontal'
      }}
    >
      <Stack.Screen
        name="Ledger"
        component={Ledger}
        options={{
          header: () => <LedgerHeader />
        }}
      />
    </Stack.Navigator>
  )
}