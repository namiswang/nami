import { useEffect, useState } from 'react'
import { Redirect, Stack, useNavigationContainerRef } from 'expo-router'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import { CustomToast } from '@/components/ui/JToast'
import { useColorScheme } from 'react-native'
import '../i18n'
import { useSettingStore } from '@/store'

// 防止启动画面在资产加载完成之前自动隐藏。
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { mode, setMode } = useSettingStore()
  const colorScheme = useColorScheme()
  const navigationRef = useNavigationContainerRef()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  const showHeaderBarRoutes = ['index']

  // 初始化mode
  useEffect(() => {
    setMode(colorScheme ?? 'light')
  }, [])

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  // 切换页面关闭当前页面的toast
  useEffect(() => {
    return navigationRef.addListener('state', () => Toast.hide())
  }, [navigationRef])

  if (!loaded) return null

  return (
    <ThemeProvider value={mode === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="identify" options={{ headerShown: false }} />
        <Stack.Screen name="verify" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      <Redirect href="/(tabs)" />

      {/*顶部状态栏*/}
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />

      <Toast
        config={{
          success: (props: any) => <CustomToast {...props} />
        }}
      />
    </ThemeProvider>
  )
}
