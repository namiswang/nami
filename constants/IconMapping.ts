import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

// See MaterialIcons here: https://icons.expo.fyi
export const IconMapping = {
  'house.fill': 'home', // 账单tab
  'creditcard.fill': 'credit-card', // 资产tab
  'plus': 'add', // 新增账单
  'eye.fill': 'visibility', // 密码显隐-显
  'eye.slash.fill': 'visibility-off', // 密码显隐-隐
  'xmark.circle.fill': 'cancel', // 清空 & error tips icon
  'sun.max': 'light-mode', // light mode
  'moon': 'dark-mode', // dark mode
  'scribble.variable': 'arrow-right', // 切换账本
  'ellipsis': 'more-horiz', // 更多
  'text.justify': 'menu', // 菜单
  'calendar': 'calendar-month', // 日历
  'chart.line.uptrend.xyaxis': 'pie-chart-outline', // 图表
  'checkmark.circle.fill': 'check-circle', // success tips icon
  'exclamationmark.triangle.fill': 'warning', // warning tips icon
  'info.circle.fill': 'info' // info tips icon
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>