import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { JText } from '@/components/JText'
import { JView } from '@/components/JView'
import { IconSymbol, IconSymbolName } from '@/components/IconSymbol'

export type ActionType = {
  label: string
  onPress: () => void
  icon?: IconSymbolName
  style?: ViewStyle
  textStyle?: TextStyle
  iconProps?: any
}

interface Props {
  children: React.ReactNode
  actions: ActionType[]
  visible?: boolean
  onChange?: (isOpen: boolean) => void
}

export function JSwipeable({
  children,
  actions,
  visible,
  onChange
}: Props) {
  const [borderRadius, setBorderRadius] = useState({
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  })
  const swipeableRef = useRef<any>(null)

  useEffect(() => {
    if (visible === undefined) return
    if (visible) {
      swipeableRef.current?.openRight()
    } else {
      swipeableRef.current?.close()
    }
  }, [visible])

  const renderRightActions = () => {
    return (
      <JView row style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, action.style]}
            onPress={() => {
              action.onPress()
              setTimeout(() => {
                swipeableRef.current?.close()
              }, 300)
            }}
          >
            {action.icon && (
              <IconSymbol
                name={action.icon}
                size={24}
                {...(action?.iconProps || {})}
              />
            )}
            <JText style={[styles.actionText, action.textStyle]}>
              {action.label}
            </JText>
          </TouchableOpacity>
        ))}
      </JView>
    )
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
      rightThreshold={40}
      onSwipeableWillOpen={() => {
        setBorderRadius({
          borderTopLeftRadius: 12,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 0
        })
        onChange?.(true)
      }}
      onSwipeableWillClose={() => {
        setBorderRadius({
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12
        })
        onChange?.(false)
      }}
    >
      <JView style={[borderRadius, { overflow: 'hidden' }]}>
        {children}
      </JView>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  actionsContainer: {
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden'
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    gap: 4
  },
  actionText: {
    fontSize: 12,
    marginTop: 4
  }
})
