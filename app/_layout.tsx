import { useEffect } from 'react'
import { Redirect, Stack, useNavigationContainerRef } from 'expo-router'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import { CustomToast } from '@/components/ui/Toast'
import { useColorScheme } from '@/hooks/useColorScheme'
import '../i18n'

// 防止启动画面在资产加载完成之前自动隐藏。
SplashScreen.preventAutoHideAsync()

const toastConfig = {
  success: (props: any) => <CustomToast {...props} />
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const navigationRef = useNavigationContainerRef()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  // 切换页面关闭当前页面的提示
  useEffect(() => {
    return navigationRef.addListener('state', () => {
      Toast.hide()
    })
  }, [navigationRef])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="identify" options={{ headerShown: false }} />
        <Stack.Screen name="verify" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Redirect href="/identify" />
      <Toast config={toastConfig} />
    </ThemeProvider>
  )
}
