import React from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, ActivityIndicator, View } from 'react-native'
import { t } from 'i18next'
import { useThemeColors } from '@/hooks/useThemeColor'
import { JText } from '@/components/ui/JText'

interface ButtonProps {
  type?: 'normal' | 'primary' | 'danger'
  text: string
  width?: number
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  loading?: boolean
  loadingText?: string
  disabled?: boolean
}

export function JButton({
  type = 'normal',
  text,
  width,
  style,
  textStyle,
  onPress,
  loading = false,
  loadingText = t('login.buttonLoadingText'),
  disabled = false
}: ButtonProps) {
  const [
    buttonBorder,
    normalButtonText,
    normalButtonBackground,
    primaryButtonText,
    primaryButtonBackground,
    dangerButtonBackground,
    dangerButtonText
  ] = useThemeColors([
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
        width ? { width } : {}
      ]}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.7}
      onPress={() => {
        !isDisabled && onPress()
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