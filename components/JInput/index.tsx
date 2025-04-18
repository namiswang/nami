import React, { useState, forwardRef } from 'react'
import {
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInputProps
} from 'react-native'
import { IconSymbol, IconSymbolName } from '../IconSymbol'
import { useColors } from '@/hooks/useColor'
import { JText } from '@/components/JText'
import { JView } from '@/components/JView'

interface InputProps extends Omit<TextInputProps, 'style' | 'onChange'> {
  label?: string
  error?: string
  containerStyle?: ViewStyle
  inputContainerStyle?: ViewStyle
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
  bordered?: boolean
}

export const JInput = forwardRef<TextInput, InputProps>(({
  label,
  error,
  containerStyle,
  inputContainerStyle,
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
  bordered = true,
  ...rest
}, ref) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(secure)
  const [inputValue, setInputValue] = useState(value || '')
  const [isFocused, setIsFocused] = useState(false)

  const [iconColor, text, dangerText] = useColors(['secondaryText', 'text', 'dangerText'])

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
    <JView style={[styles.container, containerStyle]}>
      {label && (
        <JText bold size={14} marginBottom={8} style={labelStyle}>
          {label}
        </JText>
      )}

      <JView style={[
        styles.inputContainer,
        bordered && {
          borderWidth: 0.5,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          borderColor: 'rgba(228, 230, 233, 0.5)',
          borderStyle: 'solid'
        },
        isFocused && { borderColor: 'rgb(228, 230, 233)' },
        error && { borderColor: dangerText },
        inputContainerStyle
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
        <JView style={styles.rightIconContainer}>
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
        </JView>
      </JView>
    </JView>
  )
})

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
    borderRadius: 8,
    paddingHorizontal: 12
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
