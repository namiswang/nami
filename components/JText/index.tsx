import { Text, type TextProps } from 'react-native'
import { useColor } from '@/hooks/useColor'

export type ThemedTextProps = TextProps & {
  size?: number
  color?: string
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
  color,
  bold = false,
  center = false,
  size = 14,
  margin = undefined,
  marginHorizontal = undefined,
  marginVertical = undefined,
  marginTop = undefined,
  marginBottom = undefined,
  marginLeft = undefined,
  marginRight = undefined,
  ...rest
}: ThemedTextProps) {
  const themeColor = useColor('text')

  return (
    <Text
      style={[
        {
          color: color ? color : themeColor,
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
