import type { PropsWithChildren } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { JView } from '@/components/ui/JView'
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground'

type Props = PropsWithChildren<{
  style?: ViewStyle
}>;

export default function ParallaxScrollView({
  children,
  style
}: Props) {
  const bottom = useBottomTabOverflow()

  return (
    <JView themed>
      <Animated.ScrollView
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        style={style}
      >
        <JView style={styles.content}>
          {children}
        </JView>
      </Animated.ScrollView>
    </JView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    gap: 16,
    overflow: 'hidden'
  }
})
