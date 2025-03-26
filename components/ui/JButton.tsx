import React, { ReactNode } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
  Platform,
  Vibration
} from 'react-native'
import { t } from 'i18next'
import { useColors } from '@/hooks/useColor'
import { JText } from '@/components/ui/JText'
import * as Haptics from 'expo-haptics'

interface ButtonProps {
  type?: 'normal' | 'primary' | 'danger'
  text: string | ReactNode
  width?: number
  height?: number
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  loading?: boolean
  loadingText?: string
  disabled?: boolean
  haptic?: boolean
}

export function JButton({
  type = 'normal',
  text,
  width,
  height,
  style,
  textStyle,
  onPress,
  loading = false,
  loadingText = t('login.buttonLoadingText'),
  disabled = false,
  haptic = false
}: ButtonProps) {
  const [
    buttonBorder,
    normalButtonText,
    normalButtonBackground,
    primaryButtonText,
    primaryButtonBackground,
    dangerButtonBackground,
    dangerButtonText
  ] = useColors([
    'buttonBorder',
    'normalButtonText',
    'normalButtonBackground',
    'primaryButtonText',
    'primaryButtonBackground',
    'dangerButtonBackground',
    'dangerButtonText'
  ])

  const backgroundColor = {
    normal: normalButtonBackground,
    primary: primaryButtonBackground,
    danger: dangerButtonBackground
  }[type]

  const textColor = {
    normal: normalButtonText,
    primary: primaryButtonText,
    danger: dangerButtonText
  }[type]

  const isDisabled = loading || disabled

  return (
    <TouchableOpacity
      style={[
        { backgroundColor, borderColor: buttonBorder },
        styles.button,
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
        onPress()
      }}
    >

      {loading ? (
        <View style={styles.loadingButton}>
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
        </View>
      ) : (
        typeof text === 'string' ? (
          <JText
            bold
            size={14}
            style={[
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
    marginVertical: 5,
    padding: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
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
  },

  // normal
  normalButton: {
    borderWidth: 1
  }
})