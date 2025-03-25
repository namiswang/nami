import { StyleSheet, View, type ViewProps } from 'react-native'
import { useColor } from '@/hooks/useColor'

export type ThemedViewProps = ViewProps & {
  themed?: boolean
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
};

export function JView({
  themed,
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
  style,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useColor('background')

  return <View
    style={[
      styles.default,
      {
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
        paddingRight: paddingRight !== undefined ? paddingRight : undefined
      },
      themed && { backgroundColor },
      style
    ]}
    {...otherProps}
  />
}

const styles = StyleSheet.create({
  default: {
    flex: 1
  }
})