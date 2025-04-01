import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols'
import { StyleProp, ViewStyle } from 'react-native'
import { useColor } from '@/hooks/useColor'

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular'
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const textColor = useColor('text')

  return (
    <SymbolView
      weight={weight}
      tintColor={color || textColor}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        { width: size, height: size },
        style
      ]}
    />
  )
}
