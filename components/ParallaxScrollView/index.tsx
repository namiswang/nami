import type { PropsWithChildren } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { JView } from '@/components/JView'
import { useBottomTabOverflow } from '@/components/TabBarBackground'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = PropsWithChildren<{
  style?: ViewStyle
  hasTabBar?: boolean
}>;

export default function ParallaxScrollView({ children, style, hasTabBar = false }: Props) {
  const { bottom: safeBottom } = useSafeAreaInsets()
  
  const bottom = hasTabBar ? useBottomTabOverflow() : safeBottom

  return (
    <JView themed flex={1}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        style={style}
      >
        <JView flex={1} style={styles.content}>
          {children}
        </JView>
      </Animated.ScrollView>
    </JView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    gap: 12,
    overflow: 'hidden'
  }
})
