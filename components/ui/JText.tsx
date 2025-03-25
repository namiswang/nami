import { Text, type TextProps } from 'react-native'

import { useThemeColors } from '@/hooks/useThemeColor'

export type ThemedTextProps = TextProps & {
  size?: number
  bold?: boolean
  center?: boolean
  marginHorizontal?: number
  marginVertical?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  margin?: number
};

export function JText({
  style,
  bold = false,
  center = false,
  size = 16,
  margin = undefined,
  marginHorizontal = undefined,
  marginVertical = undefined,
  marginTop = undefined,
  marginBottom = undefined,
  marginLeft = undefined,
  marginRight = undefined,
  ...rest
}: ThemedTextProps) {
  const [color] = useThemeColors(['text'])

  return (
    <Text
      style={[
        {
          color,
          fontSize: size,
          fontWeight: bold ? 'bold' : 'normal',
          textAlign: center ? 'center' : 'auto',
          margin: margin !== undefined ? margin : undefined,
          marginHorizontal: marginHorizontal !== undefined ? marginHorizontal : undefined,
          marginVertical: marginVertical !== undefined ? marginVertical : undefined,
          marginTop: marginTop !== undefined ? marginTop : undefined,
          marginBottom: marginBottom !== undefined ? marginBottom : undefined,
          marginLeft: marginLeft !== undefined ? marginLeft : undefined,
          marginRight: marginRight !== undefined ? marginRight : undefined
        },
        style
      ]}
      {...rest}
    />
  )
}
