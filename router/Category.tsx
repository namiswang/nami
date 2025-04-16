import { createStackNavigator } from '@react-navigation/stack'
import Category from '@/app/Category'
import LedgerHeader from '@/app/Ledger/components/LedgerHeader'

export type CategoryStackParamList = {
  Category: undefined
}

const Stack = createStackNavigator<CategoryStackParamList>()

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
        name="Category"
        component={Category}
        options={{
          header: () => <LedgerHeader />
        }}
      />
    </Stack.Navigator>
  )
}