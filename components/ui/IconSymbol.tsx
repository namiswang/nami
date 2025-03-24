import React from 'react'
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native'
import { SymbolWeight } from 'expo-symbols'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { IconMapping } from '@/constants/IconMapping'

export type IconSymbolName = keyof typeof IconMapping;

/**
 * 一个图标组件，在 iOS 上使用原生SF Symbols，在 Android 和 Web 上使用 MaterialIcons。这可确保跨平台外观一致，并实现最佳资源利用率。
 * 图标“name”基于 SFSymbols 并且需要手动映射到 MaterialIcons
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons
    color={color}
    size={size}
    name={IconMapping[name]}
    style={style as any}
  />
}
