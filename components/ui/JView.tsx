import { View, type ViewProps } from 'react-native'
import { useColor } from '@/hooks/useColor'

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function JView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useColor('background')

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}
