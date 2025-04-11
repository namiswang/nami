import React, { useEffect, useRef } from 'react'
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
}

interface Props {
  children: React.ReactNode
  actions: ActionType[]
  value?: boolean
  onChange?: (isOpen: boolean) => void
}

export function JSwipeable({
  children,
  actions,
  value,
  onChange
}: Props) {
  const swipeableRef = useRef<any>(null)

  useEffect(() => {
    if (value === undefined) return
    if (value) {
      swipeableRef.current?.openRight()
    } else {
      swipeableRef.current?.close()
    }
  }, [value])

  const renderRightActions = () => {
    return (
      <JView row style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, action.style]}
            onPress={() => {
              action.onPress()
              onChange?.(false)
            }}
          >
            {action.icon && (
              <IconSymbol
                name={action.icon}
                size={24}
                color="#fff"
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
      onSwipeableWillOpen={() => onChange?.(true)}
      onSwipeableWillClose={() => onChange?.(false)}
    >
      {children}
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  actionsContainer: {
    height: '100%',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
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
