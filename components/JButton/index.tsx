import React, { ReactNode } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
  Vibration
} from 'react-native'
import { t } from 'i18next'
import * as Haptics from 'expo-haptics'
import { useColors } from '@/hooks/useColor'
import { JText } from '@/components/JText'
import { JView } from '@/components/JView'

interface ButtonProps {
  type?: 'normal' | 'primary' | 'danger'
  variant?: 'solid' | 'outlined' | 'filled' | 'text'
  text: string | ReactNode
  width?: number
  height?: number
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
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  loading?: boolean
  loadingText?: string
  disabled?: boolean
  haptic?: boolean
}

export function JButton({
  type = 'normal',
  variant = 'solid',
  text,
  width,
  height,
  margin = undefined,
  marginHorizontal = undefined,
  marginVertical = 5,
  marginTop = undefined,
  marginBottom = undefined,
  marginLeft = undefined,
  marginRight = undefined,
  padding = 15,
  paddingHorizontal = undefined,
  paddingVertical = undefined,
  paddingTop = undefined,
  paddingBottom = undefined,
  paddingLeft = undefined,
  paddingRight = undefined,
  borderRadius = 8,
  style,
  textStyle,
  onPress,
  loading = false,
  loadingText = t('login.buttonLoadingText'),
  disabled = false,
  haptic = false
}: ButtonProps) {
  const [
    normalButtonText,
    normalButtonBackground,
    primaryButtonText,
    primaryButtonBackground,
    dangerButtonBackground,
    dangerButtonText,
    lightPrimaryColor,
    lightDangerColor,
    lightNormalColor
  ] = useColors([
    'text',
    'normalButtonBackground',
    'primaryButtonText',
    'primaryButtonBackground',
    'dangerButtonBackground',
    'dangerButtonText',
    'lightPrimaryColor',
    'lightDangerColor',
    'lightNormalColor'
  ])

  // 根据variant和type获取样式
  const getButtonStyles = () => {
    const baseColor = {
      normal: normalButtonBackground,
      primary: primaryButtonBackground,
      danger: dangerButtonBackground
    }[type]

    const baseTextColor = {
      normal: normalButtonText,
      primary: primaryButtonText,
      danger: dangerButtonText
    }[type]

    const lightColor = {
      normal: lightNormalColor,
      primary: lightPrimaryColor,
      danger: lightDangerColor
    }[type]

    switch (variant) {
      case 'solid':
        return {
          backgroundColor: baseColor,
          borderColor: baseColor,
          textColor: baseTextColor,
          borderWidth: 1
        }
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderColor: baseColor,
          textColor: baseColor,
          borderWidth: 1
        }
      case 'filled':
        return {
          backgroundColor: lightColor,
          borderColor: lightColor,
          textColor: baseColor,
          borderWidth: 1
        }
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          textColor: baseTextColor,
          borderWidth: 0
        }
      default:
        return {
          backgroundColor: baseColor,
          borderColor: baseColor,
          textColor: baseTextColor,
          borderWidth: 1
        }
    }
  }

  const { backgroundColor, borderColor, textColor, borderWidth } = getButtonStyles()

  const isDisabled = loading || disabled

  return (
    <TouchableOpacity
      style={[
        styles.button,
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
          paddingRight: paddingRight !== undefined ? paddingRight : undefined,
          borderRadius,
          borderColor, borderWidth,
          backgroundColor
        },
        variant === 'text' && styles.textButton,
        isDisabled && styles.disabledButton,
        style,
        width ? { width } : {},
        height ? { height } : {}
      ]}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.7}
      onPress={() => {
        if (isDisabled) return
        if (haptic) {
          if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          } else {
            Vibration.vibrate(10)
          }
        }
        onPress?.()
      }}
    >
      {loading ? (
        <JView style={styles.loadingButton}>
          <ActivityIndicator
            size="small"
            color={textColor}
            style={styles.loader}
          />
          <JText
            bold
            size={14}
            style={[
              { color: textColor },
              isDisabled && styles.disabledText,
              textStyle
            ]}
          >
            {loadingText}
          </JText>
        </JView>
      ) : (
        typeof text === 'string' ? (
          <JText
            bold
            size={14}
            style={[
              { lineHeight: 14 },
              { color: textColor },
              isDisabled && styles.disabledText,
              textStyle
            ]}
          >
            {text}
          </JText>
        ) : (
          text
        )
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    boxShadow: '0 1px 2px rgba(128, 128, 128, 0.2)'
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    boxShadow: 'none',
    elevation: 0
  },
  // disabled
  disabledButton: {
    opacity: 0.5
  },
  disabledText: {
    opacity: 0.8
  },
  // loading
  loadingButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  loader: {
    marginRight: 8
  }
})