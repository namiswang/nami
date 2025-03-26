import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight()
  const { bottom } = useSafeAreaInsets()
  return tabHeight - bottom
}
