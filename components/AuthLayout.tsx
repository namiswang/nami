import {
  StyleSheet,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  useColorScheme
} from 'react-native'
import { useState, useEffect, useRef, ReactNode, useCallback } from 'react'
import { Keyboard as RNKeyboard } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { JView } from '@/components/ui/JView'
import { JText } from '@/components/ui/JText'

interface Props {
  children: ReactNode
  title: string
}

export function AuthLayout({ children, title }: Props) {
  const [logo, setLogo] = useState(require('@/assets/images/logo-light.gif'))

  const scrollY = useRef(new Animated.Value(0)).current

  const theme = useColorScheme() ?? 'light'

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
    if (theme === 'dark')
      setLogo(require(`@/assets/images/logo-dark.gif`))
    else
      setLogo(require(`@/assets/images/logo-light.gif`))
  }, [theme])

  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70]
  })

  return (
    <JView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <JView style={styles.container}>
          <Animated.View style={[styles.scrollContent, { transform: [{ translateY }] }]}>
            <Image
              source={logo}
              style={styles.logo}
              resizeMode="contain"
            />
            <JText style={styles.title}>{title}</JText>
            {children}
          </Animated.View>
        </JView>
      </TouchableWithoutFeedback>
    </JView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 'auto'
  },
  title: {
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})