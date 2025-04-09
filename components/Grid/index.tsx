import React, { ReactNode } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { JView } from '@/components/JView'

interface GridProps {
  children: ReactNode
  columns?: number
  spacing?: number
  style?: ViewStyle
}

export function Grid({ children, columns = 2, spacing = 16, style }: GridProps) {
  const childrenArray = React.Children.toArray(children)

  return (
    <JView style={[styles.container, { margin: -spacing / 2 }, style]}>
      {childrenArray.map((child, index) => (
        <JView
          key={index}
          style={[
            styles.item,
            {
              width: `${100 / columns}%`,
              padding: spacing / 2
            }
          ]}
        >
          {child}
        </JView>
      ))}
    </JView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    flexShrink: 0
  }
})