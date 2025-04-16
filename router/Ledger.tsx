import { createStackNavigator } from '@react-navigation/stack'
import Ledger from '@/app/Ledger'
import LedgerHeader from '@/app/Ledger/components/LedgerHeader'
import LedgerEditor from '@/app/LedgerEditor'
import LedgerEditorHeader from '@/app/LedgerEditor/components/LedgerEditorHeader'

export type LedgerEditorRouteParams = {
  id?: string
}

export type LedgerStackParamList = {
  Ledger: undefined
  LedgerEditor?: LedgerEditorRouteParams
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

      <Stack.Screen
        name="LedgerEditor"
        component={LedgerEditor}
        options={{
          header: () => <LedgerEditorHeader />
        }}
      />
    </Stack.Navigator>
  )
}