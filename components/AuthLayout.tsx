import {
  View,
  Text,
  StyleSheet,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  Keyboard, Image
} from 'react-native'
import { useEffect, useRef, ReactNode, useCallback } from 'react'
import { Keyboard as RNKeyboard } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

interface Props {
  children: ReactNode
  title: string
}

export function AuthLayout({ children, title }: Props) {
  const scrollY = useRef(new Animated.Value(0)).current

  useEffect(() => {
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

  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70]
  })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Animated.View style={[styles.scrollContent, { transform: [{ translateY }] }]}>
          <Image
            source={require('@/assets/images/logo.gif')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>{title}</Text>
          {children}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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