import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import * as SplashScreen from 'expo-splash-screen'
import { CustomToast } from '@/components/JMessage'
import { useNavigationContainerRef } from 'expo-router'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DarkTheme, DefaultTheme, ThemeProvider, useNavigation } from '@react-navigation/native'
import '../i18n/index'
import { useDrawerStore, useSettingStore } from '@/store'
import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/IconSymbol'
import { AddBillButton } from '@/components/AddBillButton'
import DynamicDrawer from '@/components/DynamicDrawer'
import Bill from '@/app/Bill'
import Wallet from '@/app/Wallet'
import BillHeader from '@/app/Bill/components/BillHeader'
import WalletHeader from '@/app/Wallet/components/WalletHeader'
import LedgerStack from '@/router/Ledger'
import { createStackNavigator } from '@react-navigation/stack'

SplashScreen.preventAutoHideAsync()

export type DrawerNavigator = {
  Tabs: undefined
}

export type BottomTabNavigator = {
  Bill: undefined
  AddBill: undefined
  Wallet: undefined
}

// 在 DrawerNavigator 和 BottomTabNavigator 类型定义后添加
export type RootStackParamList = {
  Root: undefined
  Ledger: undefined
}

const Drawer = createDrawerNavigator<DrawerNavigator>()
const Tab = createBottomTabNavigator<BottomTabNavigator>()

const RootStack = createStackNavigator<RootStackParamList>()

// 修改 RootLayout return 部分
export default function RootLayout() {
  const { mode, setMode } = useSettingStore()
  const colorScheme = useColorScheme()
  const navigationRef = useNavigationContainerRef()

  const { drawerOptions } = useDrawerStore()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    setMode(colorScheme ?? 'light')
  }, [])

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  useEffect(() => {
    return navigationRef.addListener('state', () => Toast.hide())
  }, [navigationRef])

  if (!loaded) return null

  return (
    <ThemeProvider value={mode === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: true,
            gestureDirection: 'horizontal'
          }}
        >
          <RootStack.Screen
            name="Root"
            component={DrawerNavigator}
          />

          <RootStack.Screen
            name="Ledger"
            component={LedgerStack}
            options={{
              animation: 'slide_from_right'
            }}
          />
        </RootStack.Navigator>
      </GestureHandlerRootView>

      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Toast config={{ success: (props: any) => <CustomToast {...props} /> }} />
    </ThemeProvider>
  )
}

// 将原来的 Drawer.Navigator 封装成组件
function DrawerNavigator() {
  const { drawerOptions } = useDrawerStore()

  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerContent={DynamicDrawer}
      screenOptions={drawerOptions}
    >
      <Drawer.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}

function TabsNavigator() {
  const navigation = useNavigation()
  const { drawerOptions } = useDrawerStore()

  const NullComponent = () => null

  useEffect(() => {
    navigation.setOptions(drawerOptions)
  }, [drawerOptions])

  return (
    <Tab.Navigator initialRouteName="Bill">
      <Tab.Screen
        name="Bill"
        component={Bill}
        options={{
          header: BillHeader,
          tabBarIcon: ({ color, size }) => <IconSymbol color={color} name="house.fill" size={size} />,
          tabBarButton: (props) => <HapticTab {...props} />
        }}
      />

      <Tab.Screen
        name="AddBill"
        component={NullComponent}
        options={{
          tabBarButton: (props) => <AddBillButton {...props} />
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          header: (props) => <WalletHeader />,
          tabBarIcon: ({ color, size }) => <IconSymbol color={color} name="creditcard.fill" size={24} />,
          tabBarButton: (props) => <HapticTab {...props} />
        }}
      />
    </Tab.Navigator>
  )
}
