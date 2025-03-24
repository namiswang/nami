import React, { useState, forwardRef } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInputProps
} from 'react-native'
import { IconSymbol, IconSymbolName } from './IconSymbol'
import { useThemeColors } from '@/hooks/useThemeColor'

interface InputProps extends Omit<TextInputProps, 'style' | 'onChange'> {
  label?: string
  error?: string
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  labelStyle?: TextStyle
  errorStyle?: TextStyle
  prefix?: IconSymbolName
  suffix?: IconSymbolName
  onRightIconPress?: () => void
  secure?: boolean // 密码框
  clearable?: boolean
  onClear?: () => void
  onChange?: (text: string) => void
}

const JInput = forwardRef<TextInput, InputProps>(({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  placeholder,
  prefix,
  suffix,
  onRightIconPress,
  secure = false,
  clearable = true,
  onClear,
  value,
  onChange,
  ...rest
}, ref) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(secure)
  const [inputValue, setInputValue] = useState(value || '')
  const [isFocused, setIsFocused] = useState(false)

  const [iconColor, text] = useThemeColors(['icon', 'text'])

  const [dangerText] = useThemeColors(['dangerText'])

  const showClearButton = clearable && inputValue.length > 0

  const handleChangeText = (text: string) => {
    setInputValue(text)
    onChange?.(text)
  }

  const handleClear = () => {
    setInputValue('')
    onChange?.('')
    onClear?.()
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={[
        styles.inputContainer,
        isFocused && { borderColor: 'rgb(228, 230, 233)' },
        error && { borderColor: dangerText }
      ]}>
        {prefix && (
          <IconSymbol
            name={prefix}
            size={20}
            color={iconColor}
            style={styles.prefix}
          />
        )}
        <TextInput
          ref={ref}
          style={[
            { color: text },
            styles.input,
            prefix && styles.inputWithLeftIcon,
            (suffix || showClearButton || secure) && styles.inputWithRightIcon,
            inputStyle
          ]}
          placeholder={error ? error : placeholder}
          placeholderTextColor={error ? dangerText : '#999'}
          secureTextEntry={isSecureTextEntry}
          value={inputValue}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        <View style={styles.rightIconContainer}>
          {showClearButton && (
            <TouchableOpacity
              style={styles.suffix}
              onPress={handleClear}
            >
              <IconSymbol
                name="xmark.circle.fill"
                size={20}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
          {secure && (
            <TouchableOpacity
              style={styles.suffix}
              onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
            >
              <IconSymbol
                name={(isSecureTextEntry ? 'eye.fill' : 'eye.slash.fill')}
                size={20}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
          {suffix && !secure && (
            <TouchableOpacity
              style={styles.suffix}
              onPress={onRightIconPress}
            >
              <IconSymbol
                name={suffix}
                size={20}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
})

export default JInput

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    borderColor: 'rgba(228, 230, 233, 0.5)',
    borderStyle: 'solid'
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    padding: 0
  },
  inputWithLeftIcon: {
    paddingLeft: 8
  },
  inputWithRightIcon: {
    paddingRight: 8
  },
  prefix: {
    marginRight: 8
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  suffix: {
    padding: 4,
    marginLeft: 4
  }
})
