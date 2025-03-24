import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator, View } from 'react-native'
import { t } from 'i18next'

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

export default function ({
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
  const isDisabled = loading || disabled

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`${type}Button`],
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
      <Text
        style={[
          styles.buttonText,
          styles[`${type}Text`],
          isDisabled && styles.disabledText,
          textStyle
        ]}
      >
        {loading ? (
          <View style={styles.loadingButton}>
            <ActivityIndicator
              size="small"
              color={styles[`${type}Text`].color}
              style={styles.loader}
            />
            <Text
              style={[
                styles.loadingText,
                { color: styles[`${type}Text`].color }
              ]}
            >
              {loadingText}
            </Text>
          </View>
        ) : text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginVertical: 5,
    padding: 15,
    borderRadius: 8,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold'
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
  loadingText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  loader: {
    marginRight: 8
  },

  // normal
  normalButton: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFFFFF'
  },
  normalText: {
    color: '#0D0D0D'
  },

  // primary
  primaryButton: {
    backgroundColor: '#171719'
  },
  primaryText: {
    color: '#fff'
  },

  // danger
  dangerButton: {
    backgroundColor: '#D41625'
  },
  dangerText: {
    color: '#fff'
  }
})