import { View, type ViewProps } from 'react-native'
import { useColor } from '@/hooks/useColor'

export type ThemedViewProps = ViewProps & {
  themed?: boolean
  flex?: number
  row?: boolean
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
  width?: number | 'full'
  height?: number | 'full'
  margin?: number
  marginHorizontal?: number
  marginVertical?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  padding?: number
  paddingHorizontal?: number
  paddingVertical?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  borderRadius?: number
  background?: string
};

export function JView({
  themed,
  flex = 0,
  row = false,
  justify = 'flex-start',
  align = 'stretch',
  width = undefined,
  height = undefined,
  margin = undefined,
  marginHorizontal = undefined,
  marginVertical = undefined,
  marginTop = undefined,
  marginBottom = undefined,
  marginLeft = undefined,
  marginRight = undefined,
  padding = undefined,
  paddingHorizontal = undefined,
  paddingVertical = undefined,
  paddingTop = undefined,
  paddingBottom = undefined,
  paddingLeft = undefined,
  paddingRight = undefined,
  borderRadius = 0,
  style,
  background = undefined,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useColor('pageBackground')

  return <View
    style={[
      {
        flex,
        flexDirection: row ? 'row' : 'column',
        justifyContent: justify,
        alignItems: align,
        width: width === 'full' ? '100%' : width,
        height: height === 'full' ? '100%' : height,
        margin: margin !== undefined ? margin : undefined,
        marginHorizontal: marginHorizontal !== undefined ? marginHorizontal : undefined,
        marginVertical: marginVertical !== undefined ? marginVertical : undefined,
        marginTop: marginTop !== undefined ? marginTop : undefined,
        marginBottom: marginBottom !== undefined ? marginBottom : undefined,
        marginLeft: marginLeft !== undefined ? marginLeft : undefined,
        marginRight: marginRight !== undefined ? marginRight : undefined,
        padding: padding !== undefined ? padding : undefined,
        paddingHorizontal: paddingHorizontal !== undefined ? paddingHorizontal : undefined,
        paddingVertical: paddingVertical !== undefined ? paddingVertical : undefined,
        paddingTop: paddingTop !== undefined ? paddingTop : undefined,
        paddingBottom: paddingBottom !== undefined ? paddingBottom : undefined,
        paddingLeft: paddingLeft !== undefined ? paddingLeft : undefined,
        paddingRight: paddingRight !== undefined ? paddingRight : undefined,
        borderRadius
      },
      themed && { backgroundColor },
      background && { backgroundColor: background },
      style
    ]}
    {...otherProps}
  />
}
