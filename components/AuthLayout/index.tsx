import {
  StyleSheet,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native'
import { useState, useEffect, useRef, ReactNode, useCallback } from 'react'
import { Keyboard as RNKeyboard } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { JView } from '@/components/ui/JView'
import { JText } from '@/components/ui/JText'
import { ThemeModeTool } from '@/components/ThemeModeTool'
import { useSettingStore } from '@/store'

interface Props {
  children: ReactNode
  title: string
}

/** 登陆注册layout */
export function AuthLayout({ children, title }: Props) {
  const [logo, setLogo] = useState(require('@/assets/images/logo-light.gif'))
  const scrollY = useRef(new Animated.Value(0)).current
  const { mode } = useSettingStore()

  useEffect(() => {
    // 键盘弹出屏幕上移
    const keyboardWillShow = RNKeyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        Animated.spring(scrollY, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        }).start()
      }
    )
    // 键盘收起屏幕下移
    const keyboardWillHide = RNKeyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.spring(scrollY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        }).start()
      }
    )
    return () => {
      keyboardWillShow.remove()
      keyboardWillHide.remove()
    }
  }, [])

  // 切换页面时 隐藏键盘
  useFocusEffect(
    useCallback(() => {
      Keyboard.dismiss()
    }, [])
  )

  useEffect(() => {
    if (mode === 'dark')
      setLogo(require(`@/assets/images/logo-dark.gif`))
    else
      setLogo(require(`@/assets/images/logo-light.gif`))
  }, [mode])

  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70]
  })

  return (
    <JView themed>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <JView>
          <Animated.View style={[styles.scrollContent, { transform: [{ translateY }] }]}>
            <ThemeModeTool
              style={{
                position: 'absolute',
                top: 60,
                right: 20
              }}
            />
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <JText size={24} marginVertical={20} bold center>{title}</JText>
            {children}
          </Animated.View>
        </JView>
      </TouchableWithoutFeedback>
    </JView>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 'auto'
  }
})