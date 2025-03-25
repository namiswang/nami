import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

// See MaterialIcons here: https://icons.expo.fyi
export const IconMapping = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'plus.circle.fill': 'add-circle',
  'creditcard.fill': 'credit-card',
  'eye.fill': 'visibility',
  'eye.slash.fill': 'visibility-off',
  'xmark.circle.fill': 'cancel'
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>